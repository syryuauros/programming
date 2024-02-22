
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
let table4Dm = false;

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
  let data = tableContent[tableName].getData();
  let colsToBeDelStr = document.getElementById('colsToBeDel').value;
  let colsToBeDel = strToArrNum(colsToBeDelStr);
  let colThk = document.getElementById('colIndexThk').value.split(" ").map(Number);

  let dataSelected = deleteColumns(data, colsToBeDel);
  let dataTrimed = deleteEmptyRows(dataSelected);
  let header = dataTrimed[0];
  let data_mod = deleteRows(dataTrimed, [0]);

  data_mod1 = calTemp(data_mod, header, colThk);
  data_mod2 = convertToFloatWithAsciiSum(data_mod1);

  header.unshift('Th_avg');
  header.unshift('deviation');

  createTableAny('table1', data_mod2);
  tableContent['table1'].updateSettings({
    colHeaders: header,
    renderer: scientificRenderer,
  });

  // removeColumns(tableName,colsToBeDel);
  // removeEmptyRows(tableName);
  // rowToHeader(tableName);
  // removeRows(tableName,[0]);
  // calTemp(tableName,4);
}

function convertToFloatWithAsciiSum(a) {
    // Create a copy of the input array to avoid modifying the original array
    let aModified = a.map(row => row.slice());
    // Iterate through each element of 'a' and convert non-float elements to sum of ASCII values
    for (let i = 0; i < aModified.length; i++) {
        for (let j = 0; j < aModified[i].length; j++) {
            if (isNaN(parseFloat(aModified[i][j]))) {
                // Convert non-float elements to sum of ASCII values
                let sumAscii = 0;
                for (let k = 0; k < aModified[i][j].length; k++) {
                    sumAscii += aModified[i][j].charCodeAt(k);
                }
                aModified[i][j] = sumAscii;
            }
        }
    }
    return aModified;
}

function seperateData(dataAll, Indicies) {
  // let dataAll = tableContent[tableName].getData();
  let dataSeperated = pickColumns(dataAll, Indicies);
  return dataSeperated;
}

function calTemp(data1, header1, thk_index ) {
  var thickness = getColumn(data1,4);
  var cuttingRatio = 0.1;
  var cuttingIndices = [-1];
  var avgs = []; var nominalThickness = []; var deviations = [];
  var thicknessNum = thickness.length;

  for (let i = 0; i < thicknessNum; i++) {
    if (thickness[i+1] > thickness[i]*(1+cuttingRatio) ||  thickness[i+1] < thickness[i]*(1-cuttingRatio)) {
      cuttingIndices.push(i);
    }
  }
  cuttingIndices.push(thicknessNum-1);

  for (let i = 0; i < cuttingIndices.length - 1; i++) {
    startIndex = cuttingIndices[i] + 1;
    endIndex = cuttingIndices[i+1]+1;
    rangedThickness = thickness.slice(startIndex, endIndex);
    avg = sumArray(rangedThickness)/rangedThickness.length;
    avgs.push(avg);

    for (let j = startIndex; j < endIndex; j++) {
      nominalThickness.push(avg);
      deviations.push(rangedThickness[j - startIndex] - avg);
    }
  }

  data1_mod1 = addColumnDataHead(data1, nominalThickness);
  data1_mod2 = addColumnDataHead(data1_mod1, deviations);

  return data1_mod2;
}

function sumArray(array) {
  return array.reduce((acc, curr) => acc + parseFloat(curr), 0);
}

function addColumnDataHead(arr, a) {
    return arr.map((row, index) => {
        return [a[index], ...row];
    });
}

async function train() {
  let tableName = 'table1';
  var data1 = tableContent[tableName].getData();
  var header1 = tableContent[tableName].getColHeader();
  // var colIndexThk = document.getElementById('colIndexThk').value;
  let colThk = document.getElementById('colIndexThk').value.split(" ").map(Number);

  let dataYIndicies = document.getElementById('colIndexTestY').value.split(" ").map(Number);
  //  let dataYIndicies = [0];
  let dataNeutral = [1];
  let dataXOuter = concatArrays(dataYIndicies, dataNeutral);

  let dataX = seperateData(data1, getRange(0,data1[0].length + 1 - dataXOuter.length, dataXOuter));
  let dataY = seperateData(data1, dataYIndicies);
  let dataN = seperateData(data1, dataNeutral);

  const response = await fetch('http://192.168.12.135:7001/DynamicPrec_train', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dataX: dataX,
      dataY: dataY,
      dataN: dataN,
      header1: header1,
      colIndexThk: colThk - dataXOuter.length,
    })
  });

  const data = await response.json();

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
