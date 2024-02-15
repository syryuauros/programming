


///////////////////////////////////////////////  for table /////////////////////////////////////////////////////////

///////////////////////////////////////////////  for plotly /////////////////////////////////////////////////////////

///////////////////////////////////////////////  table1 ititial /////////////////////////////////////////////////////////
let table1Dm = false;
let table2Dm = false;
let table3Dm = false;

dm['table1'] = true;

var tableSettingsAtStart1 = JSON.parse(JSON.stringify(tableSettingsAtStart));
tableSettingsAtStart1.contextMenu = contextMenuHTable;
tableSettingsAtStart1.data = digitMap;
tableSettingsAtStart1.dropdownMenu = table1Dm;

var tableSettingsAtStart2 = JSON.parse(JSON.stringify(tableSettingsAtStart));
tableSettingsAtStart2.contextMenu = contextMenuHTable;
tableSettingsAtStart2.data = digitMap;
tableSettingsAtStart2.dropdownMenu = table2Dm;

var tableSettingsAtStart3 = JSON.parse(JSON.stringify(tableSettingsAtStart));
tableSettingsAtStart3.contextMenu = contextMenuHTable;
tableSettingsAtStart3.data = PredictInit;
tableSettingsAtStart3.dropdownMenu = table3Dm;
tableSettingsAtStart3.colHeaders = [ 'pred/ref(%)', 'REF', 'Predict'];

tableContent.table1 = new Handsontable(document.getElementById('table1'), tableSettingsAtStart1);
tableContent.table2 = new Handsontable(document.getElementById('table2'), tableSettingsAtStart2);
tableContent.table3 = new Handsontable(document.getElementById('table3'), tableSettingsAtStart3);

zValues = (tableContent.table1.getData()).map(row => row.map(value => value));
data = [{
    z: zValues,
    type: 'heatmap',
    colorscale: 'Viridis' // Choose your desired color scale
}];

Plotly.newPlot('plot1', data, layoutHeatMap, configPlotHeatMap);


///////////////////////////////////////////////  functions for IO /////////////////////////////////////////////////////////

///////////////////////////////////////////////  for table /////////////////////////////////////////////////////////

/////////////////////////////////////////////  for plot  /////////////////////////////////////////////////////////
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

  // Plotly.newPlot(plotName, dataTemp, layoutHeatMap, {scrollZoom: true});
  Plotly.newPlot(plotName, dataTemp, layoutHeatMap, configPlotHeatMap);
}

let markerSymbol = [ 'circle', 'square', 'diamond', 'cross' ];
let markerSize = [ '7', '1', '2', '5' ];
let dashType = [ 'solid', 'dot', 'dash', 'longdash' ];
let lineWidth = [ '0', '0', '0', '1' ];
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


let axisType = [ 'linear', 'linear' ];
let xRange = [ 0, 1.0 ];
let yRange = [ -0.2, 1.2 ];
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


/////////////////////////////////////////////  general utils (001_base0.js, 002_base1.js)  /////////////////////////////////////////////////////////


/////////////////////////////////////////////  server side  /////////////////////////////////////////////////////////
async function train() {
  var data1 = tableContent.table1.getData();
  var header1 = tableContent.table1.getColHeader();

  const response = await fetch('http://192.168.12.135:7001/DynamicPrec_train', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data1: data1,
      header1: header1,
    })
  });

  const data = await response.json();
  createTableAny('table1', data.data1);
  tableContent['table1'].updateSettings({
    colHeaders: data.header1,
    renderer: scientificRenderer,
  });

  createTableAny('table2', data.tst_X);
  tableContent['table2'].updateSettings({
    colHeaders: removeElementsFromArray(data.header1, 2),
    // numericFormat: {
    //   pattern: '0,0.00',
    // },
    renderer: scientificRenderer,
  });

  createTableAny('table3', data.refpred);
  tableContent['table3'].updateSettings({
    colHeaders: [ 'pred/ref(%)', 'REF', 'Predict'],
    numericFormat: {
      pattern: '0,0.0',
    },
  });
}

async function predict() {
  var data2 = tableContent.table2.getData();
  var header2 = tableContent.table2.getColHeader();

  const response = await fetch('http://192.168.12.135:7001/DynamicPrec_predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data2: data2,
      header2: header2,
    })
  });

  const data = await response.json();
  table3Data = replaceColToExpr(data.refpred, 0, '=d~/c~*100');
  table3Data = replaceColToExpr(data.refpred, 1, '=e~/c~*100');
  //table3Data = replaceSpecificColumn(data.refpred, 0, '=B1/C1*100');
  createTableAny('table3', data.refpred);
  tableContent['table3'].updateSettings({
    colHeaders: [ 'th/ref(%)', 'pred/ref(%)', 'REF', 'thickness', 'Predict'],
    numericFormat: {
      pattern: '0,0.0',
    },
    formulas: {
      engine: HyperFormula,
    },
  });
}

async function loadTrain() {
  await readAndParseTextFile();
  console.log(dataTxt);

  const response = await fetch('http://192.168.12.135:7001/DynamicPrec_loadTrain', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      trainData: dataTxt,
    })
  });

}
