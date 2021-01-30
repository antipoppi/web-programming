var fordCount = 0;
var opelCount = 0;
var toyotaCount = 0;
var chart;


function drawchart() {
    //console.log("ford: "+fordCount);
    //console.log("opel: "+opelCount);
    //console.log("toyota: "+toyotaCount);
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');
    // clear the canvas
    // tällä poistetaan päivitettäessä vanha kaavio
    if (chart != undefined || chart != null) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        // The type of chart we want to create
        //    type: 'horizontalBar',
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ["Ford", "Opel", "Toyota"],
            datasets: [{
                barThickness: 78,
                fill: true,
                label: "Lukumäärä (kpl)",
                data: [fordCount, opelCount, toyotaCount],
                backgroundColor: [
                'rgba(0, 143, 217, 1)',
                'rgba(144, 94, 154, 1)',
                'rgba(0, 184, 157, 1)',
            ],
                borderColor: [
                'rgba(0, 143, 217, 1)',
                'rgba(144, 94, 154, 1)',
                'rgba(0, 184, 157, 1)',
            ],
                borderWidth: 1
        }]
        },

        // Configuration options go here
        options: {
            // animaatio pois
            animation: {
                duration: 0
            },
            // skaalaa koko sivulle selaimen koon mukaan
            responsive: false,
            // datasetin otsikko piiloon
            legend: {
                position: 'top',
                display: false
            },
            // oma otsikko
            title: {
                display: true,
                text: 'Autojen lukumäärät'
            },
            // pylväiden paksuus (y-akseli ei käytössä koska pylväät määritelty x-akselille)
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        beginAtZero: true,
                        stepSize: 1
                    }
            }],
            //    xAxes: [{
            //        barThickness: 78
            //}]
            }
        }
    });
}

// autojen lisääminen ja kaavion päivitys
function addcar(carnumber) {
    if (carnumber == 1) fordCount++;
    if (carnumber == 2) opelCount++;
    if (carnumber == 3) toyotaCount++;
    drawchart();
}

// autojen määrän nollaus ja kaavion päivitys
function nollaa() {
    fordCount = 0;
    opelCount = 0;
    toyotaCount = 0;
    drawchart();
}
