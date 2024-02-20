
// dataPreProcess()
// train() {
// predict() {
// loadTrain() {

var zValues;
const digitMap = [
  [0.1, 0.3, 0.5, 0.7, 0.9],
  [0.2, 0.4, 0.6, 0.8, 1.0],
  [0.3, 0.5, 0.7, 0.9, 0.2],
  [0.4, 0.6, 0.8, 1.0, 0.4],
  [0.5, 0.7, 0.9, 0.2, 0.6]
];
const PredictInit = [
  [10, 0.3, 3],
  [20, 0.4, 2],
  [30, 0.5, 1.67],
  [40, 0.6, 1.5],
  [50, 0.7, 1.4]
];

let table1Dm = false;
let table2Dm = false;
let table3Dm = false;

dm['table1'] = true;
///////////////////////////////////////////////  table1 ititial /////////////////////////////////////////////////////////

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

///////////////////////////////////////////// actions (functions with void IO) /////////////////////////////////////////////////////////
function dataPreProcess() {
  let tableName = 'table1';
  let colsToBeDelStr = document.getElementById('colsToBeDel').value;
  let colsToBeDel = strToArrNum(colsToBeDelStr);

  removeColumns(tableName,colsToBeDel);
  rowToHeader(tableName);
  removeRows(tableName,[0]);
  removeEmptyRows(tableName);
}

async function train() {
  var data1 = tableContent.table1.getData();
  var header1 = tableContent.table1.getColHeader();
  var colIndexThk = document.getElementById('colIndexThk').value;

  const response = await fetch('http://192.168.12.135:7001/DynamicPrec_train', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data1: data1,
      header1: header1,
      colIndexThk: colIndexThk,
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
  table3Data = replaceColToExpr(data.refpred, 3, '=abs(b~/a~*100 - 100)');
  table3Data = replaceColToExpr(data.refpred, 4, '=abs(c~/a~*100 - 100)');
  //table3Data = replaceSpecificColumn(data.refpred, 0, '=B1/C1*100');
  createTableAny('table3', data.refpred);
  tableContent['table3'].updateSettings({
    colHeaders: [ 'REF', 'thickness', 'Predict', 'th_err(%)', 'pred_err(%)', ],
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
