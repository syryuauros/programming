
// function
// configPlotScatter

// heatMapPlot(tableName, plotName) {
// heatMapPlotData(dataPlotTemp, plotName) {
// scatterPlotData(dataPlotTemp, plotName) {
//
// scatterPlotUpdate() {
// scatterPlotUpdate2(plotId) {
//
// convertElemsLT(elemsLT) {
// convertElemsMT(elemsMT) {


let axisType = [ 'linear', 'linear' ];
let xRange = [ 0, 1.0 ];
let yRange = [ -0.2, 1.2 ];

/////////////////////////////////////////////// configs ///////////////////////////////////////////////////////
const configPlotHeatMap = {
  scrollZoom: true,
  displaylogo: false,
  modeBarButtonsToAdd: [
  {
    name: 'color scales',
    icon: iconPallete,
    click: function(plot1) {
      openPopUp(popup2, 495, 750);
    },
  },
  ],
  modeBarButtonsToRemove: [
    'toImage', 'resetScale2d', 'zoomOut2d', 'zoomIn2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian',
  ],
};

const configPlotScatter = {
  scrollZoom: true,
  displaylogo: false,
  modeBarButtonsToAdd: [
  {
    name: 'legend on/off',
    icon: icon1,
    click: function(plot1) {
      showlegendMark = ! plot1.layout.showlegend;
      Plotly.relayout(plot1, { showlegend: showlegendMark, });
    },
  },
  {
    name: 'axis setup',
    icon: icon1,
    click: function(plot1) {
      openPopUp(popupScatter1, 495, 750);
    },
  },
  {
    name: 'user setup',
    icon: icon1,
    click: function(plot1) {
      //generateSelectBoxes(plot1.data.length, innerHtml1 );
      // generateElems('selectContainer', 'input', 4, innerHtml1);
      const numElem = parseInt(plot1.data.length);

      let strLW = ""; let strLT = ""; let strMR = ""; let strMT = "";
      for (let i = 0; i < numElem; i++) {
        //   const inputs = document.createElement('input');
        //   inputs.innerHTML = innerHtml1;
        //   inputs.setAttribute('type', 'text');
        //   inputs.setAttribute('value', '1 1 1 1')
        //   //select.innerHTML = '<option value="1">Option 1</option><option value="2">Option 2</option>'; // Add options as needed
        //   elemContainer.appendChild(elems);
        strLabel = " line  type:\n mark  type:\n line width:\nmark radius:";
        strLT = strLT + 's ';
        strMT = strMT + 'o ';
        strLW = strLW + '1 ';
        strMR = strMR + '1 ';
        strAll = strLT + "\n" +strMT + "\n" + strLW + "\n" + strMR;
      }
      document.getElementById("labelScatterUserSet").value = strLabel;
      document.getElementById("scatterUserSet").value = strAll;

      openPopUp(popupScatter2, 495, 750);
    },
  },

  ],
  modeBarButtonsToRemove: [
    'select2d', 'lasso2d', 'toImage', 'resetScale2d', 'zoomOut2d', 'zoomIn2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian',
  ],
};

/////////////////////////////////////////////// function ///////////////////////////////////////////////////////
function heatMapPlot(tableName, plotName) {
  dataPlotTemp = tableContent[tableName].getData()
  zValuesTemp = dataPlotTemp.map(row => row.map(value => value));
  dataTemp = [{
    z: zValuesTemp,
    type: 'heatmap',
    colorscale: 'Viridis', // Choose your desired color scale
    zmin: 0,
    zmax: 100,
  }];
  // Plotly.newPlot(plotName, dataTemp, layoutHeatMap, {scrollZoom: true});
  Plotly.newPlot(plotName, dataTemp, layoutHeatMap, configPlotHeatMap);
}

function heatMapPlotData(dataPlotTemp, plotName) {
  zValuesTemp = dataPlotTemp.map(row => row.map(value => value));
  dataTemp = [{
    z: zValuesTemp,
    type: 'heatmap',
    colorscale: 'Viridis', // Choose your desired color scale
    zmin: 95,
    zmax: 105,
  }];
  Plotly.newPlot(plotName, dataTemp, layoutHeatMap, configPlotHeatMap);
}

function scatterPlotData(dataPlotTemp, plotName) {
  var trace = {
    x: getColumn(dataPlotTemp,0),
    mode: 'markers+lines',
    marker: {
      symbol: 'circle', // Set the marker type here ('circle', 'square', 'diamond', 'cross', 'x', 'triangle-up', 'triangle-down', 'triangle-left', 'triangle-right', 'pentagon', 'hexagon', 'hexagram', 'star', etc.)
      size: 7,
    },
    line: {
      dash: 'dash', // Set the dash type here ('solid', 'dot', 'dash', 'longdash', 'dashdot', 'longdashdot')
      width: 0,
    },
    type: 'scatter',
    colorscale: 'Hot' // Choose your desired color scale
  };
  dataTemp = [];
  for (i = 1; i <= dataPlotTemp[0].length-1; i++) {
    traceTemp = Object.assign({}, trace);
    traceTemp.y = getColumn(dataPlotTemp,i);
    traceTemp.z = i;
    traceTemp.marker = { symbol: markerSymbol[i-1], size: markerSize[i-1], }
    traceTemp.line = { dash: dashType[i-1], width: lineWidth[i-1], };
    dataTemp.push(traceTemp);
  }
  Plotly.newPlot(plotName, dataTemp, layoutScatter, configPlotScatter);
}

function scatterPlotUpdate() {
  axisType[0] = document.getElementById("xScale-select").value;
  axisType[1] = document.getElementById("yScale-select").value;
  xRange[0] = document.getElementById("xMin").value;
  xRange[1] = document.getElementById("xMax").value;
  yRange[0] = document.getElementById("yMin").value;
  yRange[1] = document.getElementById("yMax").value;

  Plotly.relayout(plot1, {
    xaxis: {
      type: axisType[0],
      showaline: true,
      showticklabels: true,
      range: xRange,
    },
    yaxis: {
      type: axisType[1],
      showaline: true,
      showticklabels: true,
      range: yRange,
    },
  });
}

function scatterPlotUpdate2(plotId) {
  lines = document.getElementById("scatterUserSet").value.split("\n");
  elemsLT = lines[0].split(" ");
  elemsMT = lines[1].split(" ");
  elemsLW = lines[2].split(" ");
  elemsMR = lines[3].split(" ");
  elemsLT.pop();
  elemsMT.pop();
  elemsLW.pop();
  elemsMR.pop();
  elemNum = elemsLT.length;

  let updatedTraceData = Object.assign({}, plotId);

  for (i = 0; i < elemNum; i++) {
    updatedTraceData.data[i].line.dash = convertElemsLT(elemsLT[i]);
    updatedTraceData.data[i].marker.symbol = convertElemsMT(elemsMT[i]);
    updatedTraceData.data[i].line.width = parseInt(elemsLW[i]);
    updatedTraceData.data[i].marker.size = parseInt(elemsMR[i]);
    console.log(convertElemsMT(elemsMT[i]));
  }
  Plotly.react('plot1', updatedTraceData.data, updatedTraceData.layout);
}

function convertElemsLT(elemsLT) {
  if (elemsLT == 's') { return 'solid' }
  else if (elemsLT == 't') { return 'dot' }
  else if (elemsLT == 'h') { return 'dash' }
  else if (elemsLT == 'l') { return 'longdash' }
  else if (elemsLT == 'd') { return 'dashdot' }
  else if (elemsLT == 'w') { return 'longdashdot' }
  else {  }
}

function convertElemsMT(elemsMT) {
  if (elemsMT == 'o') { return 'circle' }
  else if (elemsMT == 's') { return 'square' }
  else if (elemsMT == 'd') { return 'diamond' }
  else if (elemsMT == '+') { return 'cross' }
  else if (elemsMT == 'x') { return 'x' }
  else if (elemsMT == 'u') { return 'triangle-up' }
  else if (elemsMT == 'd') { return 'triangle-down' }
  else if (elemsMT == 'l') { return 'triangle-left' }
  else if (elemsMT == 'r') { return 'triangle-right' }
  else if (elemsMT == 'p') { return 'pentagon' }
  else if (elemsMT == 'h') { return 'hexagon' }
  else if (elemsMT == 'g') { return 'hexagram' }
  else if (elemsMT == 'r') { return 'star' }
  else {  }
}
