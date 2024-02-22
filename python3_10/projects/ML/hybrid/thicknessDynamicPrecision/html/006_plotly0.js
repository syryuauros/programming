
// layoutHeatMap
// layoutScatter

// openPopUp(popUpId, top, left) {
// closePopUp(popUpId) {
// applyMinMaxColor(plotName, inputIdName) {
// applyColorScale(plotName, inputIdName) {

let dashType1 = [ 'dot', 'solid', 'solid', ];
let markerSymbol1 = [ 'circle', 'circle', 'triangle-up',  ]; //scatterPlotData
let lineWidth1 = [ '1', '0', '0', ];
let markerSize1 = [ '1', '8', '5',  ];
let plotStyle1 = [ dashType1, markerSymbol1, lineWidth1, markerSize1 ];

let dashType2 = [ 'solid', 'solid', ];
let markerSymbol2 = [ 'circle', 'triangle-up',  ]; //scatterPlotData
let lineWidth2 = [ '0', '0', ];
let markerSize2 = [ '8', '5',  ];
let plotStyle2 = [ dashType2, markerSymbol2, lineWidth2, markerSize2 ];


let popUpTarget;

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
function openPopUp(plotId, popUpId, top, left) {
  topPosition = top + 'px';
  leftPosition = left + 'px';
  popUpId.style.top = topPosition;
  popUpId.style.left = leftPosition;
  popUpId.style.display = 'block';
  popUpTarget = plotId;
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
