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

// google.charts.load('current', {'packages':['gantt']});
// google.charts.setOnLoadCallback(drawChart);

function init() {
    const chart = new Chart();

    chart.addRow('Preparing/discussing requirements', '20.02.2022', '23.02.2022', 100);
    chart.addRow('Approving requirements', '23.02.2022', '26.02.2022', 100);
    chart.addRow('Onboarding/discussing design', '26.02.2022', '28.02.2022', 100);
    chart.addRow('Design phase', '01.03.2022', '16.03.2022', 100);
    chart.addRow('Development/Testing phase (SCRUM)', '17.03.2022', '26.05.2022', 69);
    chart.addRow('Pre release testing', '01.06.2022', '15.06.2022');
    chart.addRow('Preparing for release/Product polishing', '16.06.2022', '28.07.2022');
    chart.addRow('Release phase', '2.07.2022', '29.08.2022');

    google.charts.load('current', {'packages':['gantt']});
    google.charts.setOnLoadCallback(() => chart.render('chart_div'));
}

init();