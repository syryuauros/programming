
// layoutHeatMap
// layoutScatter

// openPopUp(popUpId, top, left) {
// closePopUp(popUpId) {
// applyMinMaxColor(plotName, inputIdName) {
// applyColorScale(plotName, inputIdName) {

let markerSymbol = [ 'circle', 'square', 'diamond', 'cross' ]; //scatterPlotData
let markerSize = [ '7', '1', '2', '5' ];
let dashType = [ 'solid', 'dot', 'dash', 'longdash' ];
let lineWidth = [ '0', '0', '0', '1' ];

// var legendOn = { showlegend: true, };
// var legendOff = { showlegend: false, };

////////////////////////////////////////////// configs ////////////////////////////////////////////////////////

const layoutHeatMap = {
  width: 550,
  height: 420,
  margin: {
    l: 0,
    r: 0,
    t: 0,
    b: 0,
  },
  dragmode: 'zoom',
  xaxis: {
    showticklabels: false,
  },
  yaxis: {
    showticklabels: false,
    autorange: 'reversed',
  },
}


const layoutScatter = {
  width: 550,
  height: 420,
  margin: {
    l: 30,
    r: 10,
    t: 10,
    b: 20,
  },
  dragmode: 'zoom',
  xaxis: {
    type: 'log',
    showaline: true,
    showticklabels: true,
  },
  yaxis: {
    type: 'log',
    showline: true,
    showticklabels: true,
  },
  showlegend: true,
  legend: {
    x: 0.20,
    y: 0.95,
    xanchor: 'right',
    yanchor: 'top',
  },
}

////////////////////////////////////////////// function //////////////////////////////////////////////////////
function openPopUp(popUpId, top, left) {
  topPosition = top + 'px';
  leftPosition = left + 'px';
  popUpId.style.top = topPosition;
  popUpId.style.left = leftPosition;
  popUpId.style.display = 'block';
}

function closePopUp(popUpId) {
  popUpId.style.display = 'none';
}

function applyMinMaxColor(plotName, inputIdName) {
  let zRange = document.getElementById(inputIdName).value.split(" ");
  let zMin = zRange[0];
  let zMax = zRange[1];
  Plotly.update(plotName, {zmin: zMin, zmax: zMax,});
}

function applyColorScale(plotName, inputIdName) {
  var selectBox = document.getElementById(inputIdName);
  var selectedValue = selectBox.value;
  Plotly.update(plotName, {colorscale: selectedValue,});
}
