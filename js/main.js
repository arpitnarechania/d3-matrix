function showLabels(element){
    labels = element.checked;
    drawChart();
}

function showHighlightCellOnHover(element){
    highlightCellOnHover = element.checked;
    drawChart();
}

function changeEndColor(element){
    endColor = element.value;
    drawChart();
}

function changeStartColor(element){
    startColor = element.value;
    drawChart();
}

function changeCellHighlightColor(element){
    highlightCellColor = element.value;
    drawChart();
}

function drawChart(){
    var chartElement = document.getElementById("Matrix");
    chartElement.innerHTML="";

    var data = {
        values: [
            [1, 0.5, 0.1],
            [0.2, 0.7, 0.4],
            [0.6, 1, 0.1]
        ],
        labels: ['Var 1', 'Var 2','Var 3']
    };

    var chart_options = {
        container: "#Matrix",
        width: chartElement.offsetWidth,
        height: chartElement.offsetWidth,
        margin: {top: 50, right: 50, bottom: 100, left: 50},
        show_labels : labels,
        start_color : startColor,
        end_color : endColor,
        highlight_cell_on_hover: highlightCellOnHover,
        highlight_cell_color: highlightCellColor
    };

    Matrix(data,chart_options);
}

var startColor = document.getElementById("startColor").value;
var endColor = document.getElementById("endColor").value;
var highlightCellColor = document.getElementById("highlightCellColor").value;
var highlightCellOnHover = document.getElementById("highlightCellOnHover").checked;
var labels = document.getElementById("labels").checked;

drawChart();