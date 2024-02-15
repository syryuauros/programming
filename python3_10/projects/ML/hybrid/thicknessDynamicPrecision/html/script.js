


///////////////////////////////////////////////  for table /////////////////////////////////////////////////////////

const hyperformulaInstance = HyperFormula.buildEmpty({
  licenseKey: 'internal-use-in-handsontable',
});

const contextMenuHTable = {
  //https://handsontable.com/docs/8.2.0/demo-context-menu.html
  items: {
    plot: {
      name: 'Plot selected Data',
      submenu: {
        items: [
          {
            key: 'plot:heatMap',
            name: 'heatMap',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              heatMapPlotData(getDataFromSelectedRange(tableName), 'plot1');
            },
          },
          {
            key: 'plot:scatter',
            name: 'scatter',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              scatterPlotData(getDataFromSelectedRange(tableName), 'plot1');
            },
          },
        ]
      },
    },
    dataPrcs: {
      name: 'Data Processing',
      submenu: {
        items: [
          {
            key: 'dataPrcs:rowToHeader',
            name: 'rowToHeader',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              var sel = this.getSelected();
              rowToHeader(tableName, sel[0][0]);
            },
          },
          {
            key: 'dataPrcs:trimEmpty',
            name: 'trimEmpty',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              removeEmptyRows(tableName);
              removeEmptyCols(tableName);
            },
          },
          {
            key: 'dataPrcs:exportSelectedData',
            name: 'exportSelectedData',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              exportDataToCSV(getDataFromSelectedRange(tableName));
            },
          },

        ]
      },
    },

    "sp1": '---------',
    'col_right': {
      name: 'insert column'
    },
    'remove_col': {
      name: 'remove column(s)'
    },
    'row_below': {
      name: 'insert row'
    },
    'remove_row': {
      name: 'remove row(s)'
    },
    freeze: {
      name: 'freeze(unfreeze: set A1)',
      callback: function(key, selection, event) {
        var sel = this.getSelected();
        this.updateSettings({
          fixedRowsTop: sel[0][2],
          fixedColumnsLeft: sel[0][3],
        });
      },
    },
    "sp2": '---------',

    tableInfo: {
      name: 'Table Info',
      callback: function(key, selection, event) {
        console.log("tableID:", this.view.hot.rootElement.id);
      },
    },
  },
};

function calt() {
  let tableName = 'table1';
  let colsToBeDelStr = document.getElementById('colsToBeDel').value;
  let colsToBeDel = strToArrNum(colsToBeDelStr);

  removeColumns(tableName,colsToBeDel);
  rowToHeader(tableName);
  removeRows(tableName,[0]);
  removeEmptyRows(tableName);
}

function removeColumns(tableName, columnIndexes) {
  if (!Array.isArray(columnIndexes)) {
    console.error('Invalid input. Please provide an array of column indexes.');
    return;
  }
  columnIndexes.reverse().forEach(function(col) {
    tableContent[tableName].alter('remove_col', col);
  });
}

function removeRows(tableName, rowIndexes) {
  if (!Array.isArray(rowIndexes)) {
    console.error('Invalid input. Please provide an array of row indexes.');
    return;
  }

  rowIndexes.reverse().forEach(function(row) {
    tableContent[tableName].alter('remove_row', row);
  });
}

function insertColumn(tableName, columnIndex) {
  tableContent[tableName].getSettings().data[0].splice(columnIndex, 0, null); // Insert null values in the first row
  tableContent[tableName].render(); // Force Handsontable to re-render
}

function removeEmptyRows(tableName) {
  var emptyRows = [];

  tableContent[tableName].getData().forEach(function(rowData, index) {
    if (rowData.every(cell => cell === null || cell === '')) {
      emptyRows.push(index);
    }
  });

  if (emptyRows.length > 0) {
    for (i=0; i<emptyRows.length; i++) {
      tableContent[tableName].alter('remove_row', emptyRows[i]-i);
    }
  }
}

function removeEmptyCols(tableName) {
  var emptyCols = [];

  tableContent[tableName].getData()[0].forEach(function(cell, col) {
    if (tableContent[tableName].getData().every(row => row[col] === null || row[col] === '')) {
      emptyCols.push(col);
    }
  });

  emptyCols.reverse().forEach(function(col) {
    tableContent[tableName].alter('remove_col', col);
  });
}

function rowToHeader(tableName, rowNum = 0) {
  var selectedRow = tableContent[tableName].getDataAtRow(rowNum);
  tableContent[tableName].updateSettings({
    colHeaders: selectedRow,
  });
}


const tableSettingsAtStart = {
  data: [
    [ , ],
  ],
  filters: true,
  allowEmpty: true,
  type: 'numeric',
  // numericFormat: {
  //     pattern: '0,0.000',
  // },
  //renderer: scientificRenderer,
  //contextMenu: contextMenuTest,
  manualColumnFreeze: true,
  colHeaders: true,
  rowHeaders: true,
  manualColumnResize: true,
  manualRowResize: true,
  customBorders: true,
  width: '100%',
  height: '95.5%',
  renderAllRows: false,
  outsideClickDeselects: false,
  selectionMode: 'multiple',
  licenseKey: 'non-commercial-and-evaluation',
};

///////////////////////////////////////////////  for plotly /////////////////////////////////////////////////////////
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
};


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
  showlegend: false,
  legend: {
    x: 0.20,
    y: 0.95,
    xanchor: 'right',
    yanchor: 'top',
  },
};

const configPlotHeatMap = {
  scrollZoom: true,
  displaylogo: false,
  modeBarButtonsToAdd: [
  {
    name: 'color scales',
    // icon: { symbol: icons.legend, x: 0, y: 0 },
    icon: iconPallete,
    click: function(plot1) {
      openPopUp2();
    },
  },
  ],
  modeBarButtonsToRemove: [
    'toImage', 'resetScale2d', 'zoomOut2d', 'zoomIn2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian',
  ],
};

function openPopUp2() {
  popup2.style.left = `800px`;
  popup2.style.display = 'block';
}

function closePopUp2() {
  popup2.style.display = 'none';
}

function openPopUp(popUpId) {
  popUpId.style.left = `950px`;
  popUpId.style.display = 'block';
}

function closePopUp(popUpId) {
  popUpId.style.display = 'none';
}

function applyMinMaxColor() {
  let zMin = document.getElementById('zMin').value;
  let zMax = document.getElementById('zMax').value;
  Plotly.update('plot1', {zmin: zMin, zmax: zMax,});
  closePopUp2();
}

function updateColorScale() {
  var selectBox = document.getElementById("color-scale-select");
  var selectedValue = selectBox.value;
  Plotly.update('plot1', {colorscale: selectedValue,});
  closePopUp2();
}

const configPlotScatter = {
  scrollZoom: true,
  displaylogo: false,
  modeBarButtonsToAdd: [
  {
    name: 'legend on/off',
    icon: icon1,
    click: function(plot1) {
      // Plotly.relayout(plot1, legendOn);
      showlegendMark = ! plot1.layout.showlegend;
      Plotly.relayout(plot1, { showlegend: showlegendMark, });
    },
  },
  {
    name: 'axis setup',
    icon: icon1,
    click: function(plot1) {
      openPopUp(popupScatter1);
    },
  },
  {
    name: 'user setup',
    icon: icon1,
    click: function(plot1) {
      //generateSelectBoxes(plot1.data.length, innerHtml1 );
      // generateElems('selectContainer', 'input', 4, innerHtml1);
      const numElem = parseInt(plot1.data.length);
      // const elemContainer = document.getElementById('selectContainer');
      // elemContainer.innerHTML = ''; // Clear previous select boxes

      let strLW = ""; let strLT = ""; let strMR = ""; let strMT = "";
      //let strLW = "line width : "; let strLT = "line Type  : "; let strMR = "mark radius: "; let strMT = "mark type  : ";
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
      // document.getElementById("LW").value = strLW;
      // document.getElementById("LT").value = strLT;
      // document.getElementById("MR").value = strMR;
      // document.getElementById("MT").value = strMT;
      document.getElementById("labelScatterUserSet").value = strLabel;
      document.getElementById("scatterUserSet").value = strAll;

      openPopUp(popupScatter2);
    },
  },

  ],
  modeBarButtonsToRemove: [
    'select2d', 'lasso2d', 'toImage', 'resetScale2d', 'zoomOut2d', 'zoomIn2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian',
  ],
};

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
function loadCSVFile(tableName) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.csv';
  fileInput.addEventListener('change', handleFileSelection);
  fileInput.click();

  function handleFileSelection() {
    const output = document.getElementById('output');

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const csvData = e.target.result;
        var csvDataAOA = convertToAOA(csvData);
        createTableAny(tableName,csvDataAOA);
      };
      reader.readAsText(file);
    } else {
      output.textContent = 'Please select a CSV file.';
    }
  }
}

var dataTxt;
function readAndParseTextFile() {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', handleFileSelection);
    fileInput.click();

    function handleFileSelection() {
      if (fileInput.files.length > 0) {
        const reader = new FileReader();

        reader.onload = function (event) {
          try {
            const txtData = event.target.result;
            dataTxt = deepCopy(txtData);
            resolve(txtData);
          } catch (error) {
            reject(error);
          }
        };
        reader.readAsText(fileInput.files[0]);
      } else {
        reject('No file selected.');
      }
    }
  });
}

function exportToCSV(tableName) {
    var Data0 = tableContent[tableName].getData();
    const csvFormat = Data0.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvFormat], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data0.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function exportDataToCSV(Data0) {
    const csvFormat = Data0.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvFormat], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data0.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function convertToAOA(csvData) {
    var rows = csvData.split("\n");
    var csvDataAOA = rows.map(row => row.split(/[\t,]/));
    return csvDataAOA;
}

function createTableAny(tableName, csvData) {
    var tableElement = document.getElementById(tableName);
    let tableSettings = JSON.parse(JSON.stringify(tableSettingsAtStart));
    tableSettings.contextMenu = contextMenuHTable;
    tableSettings.data = csvData;
    tableContent[tableName] = new Handsontable(tableElement, tableSettings);
}

function toggleDropdownMenu(tableName) {
  let dmSwitch = tableName + 'Dm';
  dm[tableName] = !dm[tableName];
  tableContent[tableName].updateSettings({
    dropdownMenu: dm[tableName],
  });
}

function dataInsideOut(innerData, ouputData) {
  outputData = deepCopy(innerData);
  return outputData;
}

///////////////////////////////////////////////  for table /////////////////////////////////////////////////////////
function scientificRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  if (typeof value === 'number') {
    // Convert number to scientific notation
    td.textContent = value.toExponential(2); // 2 represents the number of digits after the decimal point
  }
}

function getDataFromSelectedRange(tableName) {
  var selected = tableContent[tableName].getSelected(); // Get the selected range coordinates [startRow, startCol, endRow, endCol]
  var selectedData = [];

  for (var row = selected[0][0]; row <= selected[0][2]; row++) {
    var rowData = [];
    for (var i = 0; i <= selected.length-1; i++) {
      for (var col = selected[i][1]; col <= selected[i][3]; col++) {
        rowData.push(tableContent[tableName].getDataAtCell(row, col));
      }
    }
    selectedData.push(rowData);
  }

  return selectedData;
}

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
    zmin: 0,
    zmax: 100,
  }];

  // Plotly.newPlot(plotName, dataTemp, layoutHeatMap, {scrollZoom: true});
  Plotly.newPlot(plotName, dataTemp, layoutHeatMap, configPlotHeatMap);
}

let markerSymbol = [ 'circle', 'square', 'diamond', 'cross' ];
let markerSize = [ '7', '1', '2',  ];
let dashType = [ 'solid', 'dot', 'dash',  ];
let lineWidth = [ '0', '0', '0', ];
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


/////////////////////////////////////////////  general utils  /////////////////////////////////////////////////////////
function radio(optionName) {
  var options = document.getElementsByName(optionName);
  options.forEach(option => {
    if (option.checked) {
        selectedOption = option.value;
    }
  });
  return selectedOption;
}

function getColumn(matrix, columnIndex) {
  return matrix.map(row => row[columnIndex]);
}

function strToArrNum(str) {
  let arrayOfNumbers = str.split(' ').map(Number);
  return arrayOfNumbers;
}

function removeElementsFromArray(arr, n) {
  arrCopy = deepCopyArray(arr);
  // Check if the array is not empty and n is a valid number
  if (arrCopy.length > 0 && Number.isInteger(n) && n >= 0) {
    // Remove the first n elements
    arrCopy.splice(0, n);
  }
  return arrCopy;
}

function deepCopyArray(arr) {
  return [...arr];
}

function deepCopy(data) {
  try {
    // Convert the data to JSON format using JSON.stringify
    const jsonString = JSON.stringify(data);

    // Parse the JSON string to create a deep copy
    const deepCopy = JSON.parse(jsonString);

    return deepCopy;
  } catch (error) {
    console.error('Error deep copying data:', error);
    return null;
  }
}

function replaceSpecificColumn(arr, columnIndex, replacement) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > columnIndex) {
      arr[i][columnIndex] = replacement;
    } else {
      console.error(`Column index ${columnIndex} is out of bounds for row ${i}.`);
    }
  }
}

function replaceColToCol(arr, columnIndex, replacement) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > columnIndex) {
      arr[i][columnIndex] = replacement[columnIndex];
    } else {
      console.error(`Column index ${columnIndex} is out of bounds for row ${i}.`);
    }
  }
}

function replaceColToExpr(arr, columnIndex, expr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > columnIndex) {
      arr[i][columnIndex] = replaceCharacter(expr, '~', i+1);
    } else {
      console.error(`Column index ${columnIndex} is out of bounds for row ${i}.`);
    }
  }
}

function replaceCharacter(inputString, charToReplace, replacementChar) {
  const regex = new RegExp(charToReplace, 'g');
  const resultString = inputString.replace(regex, replacementChar);
  return resultString;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

let innerHtml1 = '<option value="1">Option 1</option><option value="2">Option 2</option>';
function generateSelectBoxes(boxNum, innerHtml) {
  const numSelects = parseInt(boxNum);
  //const numSelects = parseInt(document.getElementById('numSelects').value, 10);
  const selectContainer = document.getElementById('selectContainer');
  selectContainer.innerHTML = ''; // Clear previous select boxes

  for (let i = 0; i < numSelects; i++) {
    const select = document.createElement('select');
    select.innerHTML = innerHtml;
    //select.innerHTML = '<option value="1">Option 1</option><option value="2">Option 2</option>'; // Add options as needed
    selectContainer.appendChild(select);
  }
}

function generateElems(container, elem, elemNum, innerHtml) {
  const numElem = parseInt(elemNum);
  const elemContainer = document.getElementById(container);
  elemContainer.innerHTML = ''; // Clear previous select boxes

  for (let i = 0; i < numElem; i++) {
    const elems = document.createElement(elem);
    elems.innerHTML = innerHtml;
    //select.innerHTML = '<option value="1">Option 1</option><option value="2">Option 2</option>'; // Add options as needed
    elemContainer.appendChild(elems);
  }
}


function test1() {
  setTimeout(() => {
    dataTxt = 'a';
    console.log(dataTxt);
  },300);
}

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
