var graphData = [];
var graphLabels = [];

var myChart;

$( document ).ready(function() {
    // Load Currency Names
    fetch('https://api.frankfurter.app/currencies')
        .then((data) => data.json())
        .then((data) => {
            $.each(data, function(index, value) {
                var datacode = JSON.stringify(value.code);
                $("#graph-base-currency-selector").append("<option class='test' value='"+ index + "'><span id='currency-1'>" + value + "</span></option>");
                $("#graph-convert-currency-selector").append("<option class='test' value='"+ index + "'><span id='currency-1'>" + value + "</span></option>");
                $('#graph-base-currency-selector option[value="USD"]').attr("selected",true);
                $('#graph-convert-currency-selector option[value="NZD"]').attr("selected",true);
            });

            let currency1 = $('#graph-base-currency-selector option:selected').attr("value");
            let currency2 = $('#graph-convert-currency-selector option:selected').attr("value");

            getGraphData(currency1, currency2);
    });

    

    
});


function getGraphData(baseCurrency, convertCurrency){
    fetch(`https://api.frankfurter.app/2020-01-01..?from=USD`)
        .then((data) => data.json())
        .then((data) => {
            for(let i = 0; i < Object.keys(data.rates).length; i++) {
                graphData.push(Object.values(data.rates)[i][convertCurrency]);
                graphLabels.push(Object.keys(data.rates)[i]);
            }
            displayGraph(graphLabels, graphData);
    });
}


function displayGraph(graphLabels, graphData){
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: graphLabels,
            datasets: [{
                label: 'Currency Value',
                data: graphData,
                backgroundColor: [
                    'rgba(0, 174, 255, 0.69)'

                ],
                borderColor: [
                    'rgba(0, 174, 255, 0.69)'
                ],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

$('#graph-base-currency-selector').on('change', function() {  
    var newGraphData = [];
    var newGraphLabels = [];
    let currency1 = $('#graph-base-currency-selector option:selected').attr("value");
    let currency2 = $('#graph-convert-currency-selector option:selected').attr("value");
    
    fetch(`https://api.frankfurter.app/2020-01-01..?from=${currency1}`)
    .then((data) => data.json())
    .then((data) => {
        for(let i = 0; i < Object.keys(data.rates).length; i++) {
            newGraphData.push(Object.values(data.rates)[i][currency2]);
            newGraphLabels.push(Object.keys(data.rates)[i]);
        }
        myChart.destroy();
        displayGraph(newGraphLabels, newGraphData);
    });
});

$('#graph-convert-currency-selector').on('change', function() {  
    var newGraphData = [];
    var newGraphLabels = [];
    let currency1 = $('#graph-base-currency-selector option:selected').attr("value");
    let currency2 = $('#graph-convert-currency-selector option:selected').attr("value");
        
    fetch(`https://api.frankfurter.app/2020-01-01..?from=${currency1}`)
    .then((data) => data.json())
    .then((data) => {
        for(let i = 0; i < Object.keys(data.rates).length; i++) {
            newGraphData.push(Object.values(data.rates)[i][currency2]);
            newGraphLabels.push(Object.keys(data.rates)[i]);
        }
        myChart.destroy();
        displayGraph(newGraphLabels, newGraphData);
    });
});