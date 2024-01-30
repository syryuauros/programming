var tableContent = {};
var columnsConfig = [];
var data;
var zValues;

var legendOn = { showlegend: true, };
var legendOff = { showlegend: false, };
var icon1 = {
  'width': 500,
  'height': 600,
  'path': 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z'
}

const digitMap = [
  [0.1, 0.3, 0.5, 0.7, 0.9],
  [0.2, 0.4, 0.6, 0.8, 1.0],
  [0.3, 0.5, 0.7, 0.9, 0.2],
  [0.4, 0.6, 0.8, 1.0, 0.4],
  [0.5, 0.7, 0.9, 0.2, 0.6]
  // Add more rows as needed
];
const PredictInit = [
  [0.1, 0.3,],
  [0.2, 0.4,],
  [0.3, 0.5,],
  [0.4, 0.6,],
  [0.5, 0.7,]
  // Add more rows as needed
];



///////////////////////////////////////////////  for table /////////////////////////////////////////////////////////



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
              heatMapPlotData(getDataFromSelectedRange('table1'), 'plot1');
            },
          },
          {
            key: 'plot:scatter',
            name: 'scatter',
            callback: function(key, selection, event) {
              scatterPlotData(getDataFromSelectedRange('table1'), 'plot1');
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
  width: 450,
  height: 350,
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
  width: 450,
  height: 350,
  margin: {
    l: 30,
    r: 10,
    t: 10,
    b: 20,
  },
  dragmode: 'zoom',
  xaxis: {
    showaline: true,
    showticklabels: true,
  },
  yaxis: {
    showline: true,
    showticklabels: true,
  },
  // showlegend: false,
  legend: {
    x: 0.20,
    y: 0.95,
    xanchor: 'right',
    yanchor: 'top',
  },
};


const configPlotCommon = {
  scrollZoom: true,
  displaylogo: false,
  modeBarButtonsToAdd: [
  {
    name: 'legend on',
    icon: icon1,
    click: function(plot1) {
      Plotly.relayout(plot1, legendOn);
    },
  },
  {
    name: 'legend off',
    icon: icon1,
    click: function(plot1) {
      Plotly.relayout(plot1, legendOff);
    },
  },
  ],
  modeBarButtonsToRemove: [
    'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian',
  ],
};

///////////////////////////////////////////////  table1 ititial /////////////////////////////////////////////////////////
var tableSettingsAtStart1 = JSON.parse(JSON.stringify(tableSettingsAtStart));
var tableSettingsAtStart2 = JSON.parse(JSON.stringify(tableSettingsAtStart));
var tableSettingsAtStart3 = JSON.parse(JSON.stringify(tableSettingsAtStart));
tableSettingsAtStart1.contextMenu = contextMenuHTable;
tableSettingsAtStart2.contextMenu = contextMenuHTable;
tableSettingsAtStart3.contextMenu = contextMenuHTable;
tableSettingsAtStart1.data = digitMap;
tableSettingsAtStart2.data = digitMap;
tableSettingsAtStart3.data = PredictInit;
tableSettingsAtStart3.colHeaders = ['REF', 'Pred'];
tableContent.table1 = new Handsontable(document.getElementById('table1'), tableSettingsAtStart1);
tableContent.table2 = new Handsontable(document.getElementById('table2'), tableSettingsAtStart2);
tableContent.table3 = new Handsontable(document.getElementById('table3'), tableSettingsAtStart3);

zValues = (tableContent.table1.getData()).map(row => row.map(value => value));
data = [{
    z: zValues,
    type: 'heatmap',
    colorscale: 'Viridis' // Choose your desired color scale
}];

Plotly.newPlot('plot1', data, layoutHeatMap, {scrollZoom: true});


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
      colorscale: 'Viridis' // Choose your desired color scale
  }];

  Plotly.newPlot(plotName, dataTemp, layoutHeatMap, {scrollZoom: true});
}

function heatMapPlotData(dataPlotTemp, plotName) {
  zValuesTemp = dataPlotTemp.map(row => row.map(value => value));
  dataTemp = [{
      z: zValuesTemp,
      type: 'heatmap',
      colorscale: 'Viridis' // Choose your desired color scale
  }];

  Plotly.newPlot(plotName, dataTemp, layoutHeatMap, {scrollZoom: true});
}

function scatterPlotData(dataPlotTemp, plotName) {
  var trace = {
    x: getColumn(dataPlotTemp,0),
    type: 'scatter',
    colorscale: 'Viridis' // Choose your desired color scale
  };

  dataTemp = [];

  for (i = 1; i <= dataPlotTemp[0].length-1; i++) {
    traceTemp = Object.assign({}, trace);
    traceTemp.y = getColumn(dataPlotTemp,i);
    traceTemp.z = i;
    dataTemp.push(traceTemp);
  }

  Plotly.newPlot(plotName, dataTemp, layoutScatter, configPlotCommon);
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



/////////////////////////////////////////////  server side  /////////////////////////////////////////////////////////
async function cal() {
  var data1 = tableContent.table1.getData();
  var header1 = tableContent.table1.getColHeader();

  const response = await fetch('http://192.168.12.135:7001/DynamicPrec_delCols', {
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
  });

  createTableAny('table3', data.refpred);
}
