// $("#inputfile").on('change', () => {
//     $("#inputfile").parse({
//         config: {
//             header: true,
//             encoding: 'utf-8',
//             complete: function (...args) {
//                 console.log(args);
//             }
//         },
//         before: function(file, inputElem)
//         {
//             // executed before parsing each file begins;
//             // what you return here controls the flow
//             console.log(file);
//         },
//         error: function(err, file, inputElem, reason)
//         {
//             console.log("ERROR");
//             console.log(err);
//             // executed if an error occurs while loading the file,
//             // or if before callback aborted for some reason
//         },
//         complete: function()
//         {
//             console.log("DONE");
//             // executed after all files are complete
//         }
//     });
// });

google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

function strToDate(date) {
    if (date instanceof Date) return date;
    const s = date.split('.').map(i => parseFloat(i));
    return new Date(s[2], s[1] + 1, s[0])
}

// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

/**
 *
 * @param {Date | string} start
 * @param {Date | string} end
 */
function getDuration(start, end, toMs = false) {
    start = strToDate(start);
    end = strToDate(end);
    const b = start.getDate()*(start.getMonth() + 1);
    const f = end.getDate()*(end.getMonth() + 1);
    return (f - b);
}

/**
 *
 * @param {string} id
 * @param {string} name
 * @param {string} start - in DD.MM.YYYY form
 * @param {string} end - in DD.MM.YYYY form
 * @param {number} percentage - from 0 to 100
 * @param {number} duration - in days
 * @param {string} deps
 */
function makeRow(name, start, end, percentage = 0, duration = null, deps = null) {
    if (!duration) duration = getDuration(start, end);
    const id = generateUUID();
    return {raw: [
            id,
            name,
            strToDate(start),
            strToDate(end),
            daysToMilliseconds(duration),
            percentage,
            deps,
        ], id};
}

function drawChart() {
}

class Chart {
    _rows = [];

    constructor() {
        this.render = this.render.bind(this);
    }

    addRow(name, start, end, percentage) {
        this._rows.push(this.makeRow(name, start, end, percentage));
    }

    render(elementID, options = { height: 500 }) {
        const chart = new google.visualization.Gantt(document.getElementById(elementID));

        const data = new google.visualization.DataTable();

        data.addColumn('string', 'Task ID');
        data.addColumn('string', 'Task Name');
        data.addColumn('date', 'Start Date');
        data.addColumn('date', 'End Date');
        data.addColumn('number', 'Duration');
        data.addColumn('number', 'Percent Complete');
        data.addColumn('string', 'Dependencies');

        data.addRows(this._rows.map((i, idx, arr) => {
            if (!idx) return i.raw;
            i.raw[i.raw.length - 1] = arr[idx - 1].id;
            return i.raw;
        }));

        chart.draw(data, options);
    }

    renderTable(elementID) {
        const c = document.getElementById(elementID);
        let interpolate = `
        <table border="1">
            <tr>
            <td>Task ID</td>
            <td>Task Name</td>
            <td>Start date</td>
            <td>End date</td>
            <td>Duration (ms)</td>
            <td>Percentage</td>
            </tr>
                `;
        rows.forEach((r) => {
            interpolate += `
            <tr>
            <td>${r[0].slice(0, 5)}</td>
            <td>${r[1]}</td>
            <td>${r[2].toLocaleDateString()}</td>
            <td>${r[3].toLocaleDateString()}</td>
            <td>${r[4]}</td>
            <td>${r[5]}</td>
            </tr>
        `;
        });
        interpolate += '</table>';

        c.innerHTML = interpolate;
    }

    makeRow(name, start, end, percentage = 0, duration = null, deps = null) {
        if (!duration) duration = getDuration(start, end);
        const id = generateUUID();
        return {
            raw: [
                id,
                name,
                strToDate(start),
                strToDate(end),
                daysToMilliseconds(duration),
                percentage,
                deps,
            ], id
        };
    }
}