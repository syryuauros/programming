
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
const PredictInit2 = [
  [10, 0.3, ],
  [20, 0.4, ],
  [30, 0.5, ],
  [40, 0.6, ],
  [50, 0.7, ]
];


let table1Dm = false;
let table2Dm = false;
let table3Dm = false;
let table4Dm = false;
let table5Dm = false;

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
tableSettingsAtStart2.formulas = { engine: hyperformulaInstance, sheetName: 'sheet2', };

var tableSettingsAtStart3 = JSON.parse(JSON.stringify(tableSettingsAtStart));
tableSettingsAtStart3.contextMenu = contextMenuHTable;
tableSettingsAtStart3.data = PredictInit;
tableSettingsAtStart3.dropdownMenu = table3Dm;
tableSettingsAtStart3.colHeaders = [ 'testY', 'Predict', ' '];
tableSettingsAtStart3.formulas = { engine: hyperformulaInstance, sheetName: 'sheet3', };
//tableSettingsAtStart3.colHeaders = [ 'pred/ref(%)', 'REF', 'Predict'];

var tableSettingsAtStart4 = JSON.parse(JSON.stringify(tableSettingsAtStart));
tableSettingsAtStart4.contextMenu = contextMenuHTable;
tableSettingsAtStart4.data = PredictInit2;
tableSettingsAtStart4.dropdownMenu = table4Dm;
tableSettingsAtStart4.formulas = { engine: hyperformulaInstance, sheetName: 'sheet4', };

var tableSettingsAtStart5 = JSON.parse(JSON.stringify(tableSettingsAtStart));
tableSettingsAtStart5.contextMenu = contextMenuHTable;
tableSettingsAtStart5.data = PredictInit2;
tableSettingsAtStart5.dropdownMenu = table5Dm;
tableSettingsAtStart5.formulas = { engine: hyperformulaInstance, sheetName: 'sheet5', };

tableContent.table1 = new Handsontable(document.getElementById('table1'), tableSettingsAtStart1);
tableContent.table2 = new Handsontable(document.getElementById('table2'), tableSettingsAtStart2);
tableContent.table3 = new Handsontable(document.getElementById('table3'), tableSettingsAtStart3);
tableContent.table4 = new Handsontable(document.getElementById('table4'), tableSettingsAtStart4);
tableContent.table5 = new Handsontable(document.getElementById('table5'), tableSettingsAtStart5);

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
      deviations.push((rangedThickness[j - startIndex] - avg));
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

function pickElemsFromArr(arr, colIndiciesArr) {
  return colIndiciesArr.map(index => arr[index]);
}

async function train() {
  let tableName = 'table1';
  var data1 = tableContent[tableName].getData();
  var header1 = tableContent[tableName].getColHeader();
  // var colIndexThk = document.getElementById('colIndexThk').value;
  let colThk = document.getElementById('colIndexThk').value.split(" ").map(Number);

  let dataYIndicies = document.getElementById('colIndexTestY').value.split(" ").map(Number);
  //  let dataYIndicies = [0];
  let dataNIndiciesOrigin = document.getElementById('colIndexTestN').value.split(" ");
  let dataNIndicies = dataNIndiciesOrigin.map(Number);
  //let dataNIndicies = document.getElementById('colIndexTestN').value.split(" ").map(Number);
  let dataXOuter = concatArrays(dataYIndicies, dataNIndicies);

  let dataX = seperateData(data1, getRange(0,data1[0].length + 1 - dataXOuter.length, dataXOuter));
  let dataY = seperateData(data1, dataYIndicies);
  let dataN = seperateData(data1, dataNIndicies);

  let headerX = pickElemsFromArr(header1, getRange(0,data1[0].length + 1 - dataXOuter.length, dataXOuter));
  let headerY = pickElemsFromArr(header1, dataYIndicies);
  let headerN = pickElemsFromArr(header1, dataNIndicies);
  //let headerY = dataNIndicies.map(index => header1[index]);

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

  // createTableAny('table2', data.tst_X);
  tableContent['table2'].updateSettings({
    data: data.tst_X,
    colHeaders: headerX,
    // colHeaders: removeElementsFromArray(header1, 2),
    // numericFormat: {
    //   pattern: '0,0.00',
    // },
    renderer: scientificRenderer,
    // formulas: {
    //   engine: HyperFormula,
    // },
  });


  // table3Data = replaceColToExpr(data.refpred, 2, '=NoTrained!a~ - TestY!a~');
  table3Data = replaceColToExpr(data.refpred, 2, '=abs(b~/a~*100 - 100)');
  //createTableAny('table3', data.refpred);
  tableContent['table3'].updateSettings({
    data: data.refpred,
    colHeaders: [ 'testY', 'Predict',  'pred_err(%)', ],
    // colHeaders: [ 'testY', 'Predict', ' '],
    // numericFormat: {
    //   pattern: '0,0.0',
    // },
    renderer: scientificRenderer,
    // formulas: {
    //   engine: hyperformulaInstance,
    //   sheetName: 'sheet3',
    // },
    autoWrapRow: true,
    autoWrapCol: true,
    licenseKey: 'non-commercial-and-evaluation',
  });

  //createTableAny('table4', data.tst_y);
  tableContent['table4'].updateSettings({
    data: data.tst_y,
    colHeaders: headerY,
    // colHeaders: removeElementsFromArray(data.header1, 2),
    // numericFormat: {
    //   pattern: '0,0.00',
    // },
    renderer: scientificRenderer,
    // formulas: {
    //   engine: hyperformulaInstance,
    //   sheetName: 'sheet4',
    // },
    autoWrapRow: true,
    autoWrapCol: true,
    licenseKey: 'non-commercial-and-evaluation',
  });

  if (dataNIndiciesOrigin[0] ==  "") {
    // createTableAny('table5', PredictInit2);
    tableContent['table5'].updateSettings({
      data: PredictInit2,
    });
  } else {
    // createTableAny('table5', data.tst_N);
    tableContent['table5'].updateSettings({
      data: data.tst_N,
      colHeaders: headerN,
      renderer: scientificRenderer,
      // formulas: {
      //   engine: HyperFormula,
      // },
    });

  }


}

async function predict(
  data2 = tableContent.table2.getData(),
  data4 = tableContent.table4.getData(),
  header2 = tableContent.table2.getColHeader(),
) {
  let resolvedData;

  await predictKernel(data2, data4, header2).then((resolvedValue) => { resolvedData = resolvedValue; });

  // table3Data = replaceColToExpr(data.refpred, 3, '=abs(b~/a~*100 - 100)');
  // table3Data = replaceColToExpr(data.refpred, 4, '=abs(c~/a~*100 - 100)');
  //table3Data = replaceSpecificColumn(data.refpred, 0, '=B1/C1*100');
  table3Data = replaceColToExpr(resolvedData.refpred, 2, '=abs(b~/a~*100 - 100)');
  // createTableAny('table3', data.refpred);
  tableContent['table3'].updateSettings({
    data: resolvedData.refpred,
    colHeaders: [ 'testY', 'Predict', 'pred_err(%)', ],
    //colHeaders: [ 'REF', 'thickness', 'Predict', 'th_err(%)', 'pred_err(%)', ],
    // numericFormat: {
    //   pattern: '0,0.0',
    // },
    renderer: scientificRenderer,
    formulas: {
      engine: HyperFormula,
      sheetName: 'Predict',
    },
  });
}

async function predictKernel(
  data2 = tableContent.table2.getData(),
  data4 = tableContent.table4.getData(),
  header2 = tableContent.table2.getColHeader(),
) {

  const response = await fetch('http://192.168.12.135:7001/DynamicPrec_predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data2: data2,
      data4: data4,
      header2: header2,
    })
  });

  const resolvedData = await response.json();
  return resolvedData;
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


async function testFun(tableName) {
  const filters = tableContent['table1'].getPlugin('Filters');
  const filterColIndex = 5;
  const siteValueParams = document.getElementById('siteValue').value.split(" ");
  const siteValue = arr_range(Number(siteValueParams[0]), Number(siteValueParams[1]), siteValueParams[2]);
  console.log(siteValueParams);
  console.log(siteValue);

  var header1 = tableContent[tableName].getColHeader();
  let dataYIndicies = document.getElementById('colIndexTestY').value.split(" ").map(Number);
  let dataNIndiciesOrigin = document.getElementById('colIndexTestN').value.split(" ");
  let dataNIndicies = dataNIndiciesOrigin.map(Number);
  let dataXOuter = concatArrays(dataYIndicies, dataNIndicies);

  let resolvedData; let dataX; let dataY; let dataN; let headerX; let headerY; let headerN;
  let scores = [];

  for (let i = 0; i < siteValue.length; i++) {

    filters.clearConditions();
    filters.addCondition(filterColIndex, 'by_value', [[String(siteValue[i]), ]]); // 'eq', 'lt', 'gt', 'lte'
    filters.filter();
    // https://handsontable.com/docs/javascript-data-grid/api/filters/
    var data1 = tableContent[tableName].getData();
    let score = [];
    let result = [];

    dataX = seperateData(data1, getRange(0,data1[0].length + 1 - dataXOuter.length, dataXOuter));
    dataY = seperateData(data1, dataYIndicies);
    dataN = seperateData(data1, dataNIndicies);

    headerX = pickElemsFromArr(header1, getRange(0,data1[0].length + 1 - dataXOuter.length, dataXOuter));
    headerY = pickElemsFromArr(header1, dataYIndicies);
    headerN = pickElemsFromArr(header1, dataNIndicies);
    await predictKernel(dataX, dataY, headerX).then((resolvedValue) => { resolvedData = resolvedValue; });

    let refpred = aoa_deepCopy(resolvedData.refpred);
    let testY = aoa_pickCoa(refpred, 0);
    let pred = aoa_pickCoa(refpred, 1);

    let thAvg = aoa_pickCoa(aoa_deepCopy(dataN), 0);
    let thickness = aoa_formatChange(aoa_pickCoa(aoa_deepCopy(dataX), 4), 'num');
    let predThk = aoa_arithmetic(thickness, pred, '-');

    let errorPred = aoa_cal2(pred, testY, 'user1');
    let errorThickness = aoa_cal2(thickness, thAvg, 'user1');
    let errorPredThk = aoa_cal2(predThk, thAvg, 'user1');

    score.push(arr_Average(aoa_coaToArr(errorPred)));
    score.push(arr_Average(aoa_coaToArr(errorThickness)));
    score.push(arr_Average(aoa_coaToArr(errorPredThk)));
    score.push(errorPredThk.length);
    console.log('score: ', score);

    scores.push([]);
    scores[i].push(score);
    console.log('scores: ', scores);

    result = aoa_insertCoaToAoa(testY, pred);
    result = aoa_insertCoaToAoa(result, errorPred);
    result = aoa_insertCoaToAoa(result, thAvg);
    result = aoa_insertCoaToAoa(result, thickness);
    result = aoa_insertCoaToAoa(result, predThk);
    result = aoa_insertCoaToAoa(result, errorThickness);
    result = aoa_insertCoaToAoa(result, errorPredThk);
    console.log('result: ', result);

    let exportingPath = "batchResult" + i + ".csv";

    aoa_exportToCSV(result, exportingPath);
    // let thickness = aoa_pickCoa(aoa_deepCopy(dataX), 4).map(innerArray =>
    //   innerArray.map(str => Number(str))
    // );
    // let thAvg = pickColumns(dataN, [0]);
    // let testY = pickColumns(refpred, [0]);
    // let pred = pickColumns(refpred, [1]);
    // let thickness = pickColumns(dataX, [4]);
    // let thk = thickness.map(innerArray =>
    //   innerArray.map(str => Number(str))
    // );

    // // let thMeasured = minusColumns(thickness, testY);
    // let thPred = minusColumns(thickness, pred);

    // let result = insertColumnToMatrix(refpred, refpred.length, thAvg);
    // result = insertColumnToMatrix(result, result.length, thk);
    // result = insertColumnToMatrix(result, result.length, thPred);

    // console.log('refpred: ', refpred);
    // console.log('thAvg: ', thAvg);
    // console.log('thickness: ', thickness);
    // console.log('pred: ', pred);
    // console.log('predThk: ', predThk);
    // console.log('result: ', result);
    // console.log('thk: ', thk);
  }

  aoa_exportToCSV(scores, "scores.csv");
  updateTableAny('table2', dataX, headerX);
  updateTableAny('table4', dataY, headerY);
  updateTableAny('table5', dataN, headerN);
}


async function testFun2() {
  arr1 = [1,2,3,4,5];
  arr2 = [6,7,8,9,10];
  arr3 = [11,12,0,14,0];

  roa1 = aoa_arrToRoa(arr1);
  coa1 = aoa_arrToCoa(arr1);
  coa2 = aoa_arrToCoa(arr2);
  coa3 = aoa_arrToCoa(arr3);

  // roa1C = aoa_deepCopy(roa1);
  // roa1T = aoa_transpose(roa1);
  // roa1TT = aoa_transpose(roa1T);
  testCTA1 = aoa_insertCoaToAoa(coa1, coa1);
  console.log('testCTA1: ', testCTA1);
  testCTA1 = aoa_insertCoaToAoa(testCTA1, coa1);
  console.log('testCTA1: ', testCTA1);
  testCTA1 = aoa_insertCoaToAoa(testCTA1, coa2, 1);
  console.log('testCTA1: ', testCTA1);
  testCTA1 = aoa_insertCoaToAoa(testCTA1, coa2 );
  console.log('testCTA1: ', testCTA1);
  testCTA1 = aoa_replaceCoaToAoa(testCTA1, coa1 );
  console.log('testCTA1: ', testCTA1);
  testCTA1 = aoa_replaceRoaToAoa(testCTA1, roa1 );
  console.log('testCTA1: ', testCTA1);
  testCTA1 = aoa_insertCoaToAoa(testCTA1, coa2 );
  console.log('testCTA1: ', testCTA1);
  testCTA1 = aoa_deleteCoaToAoa(testCTA1, 1 );
  console.log('testCTA1: ', testCTA1);
  testCTA1 = aoa_insertRoaToAoa(testCTA1, roa1);
  testCTA1 = aoa_deleteRoaToAoa(testCTA1, 1);
  console.log('testCTA1: ', testCTA1);

  arrReturn = aoa_coaToArr(coa1);
  console.log('arrReturn: ', arrReturn);
  arrReturn.push([1]);
  console.log('coa1: ', coa1);
  console.log('arrReturn: ', arrReturn);

  testCTA2 = aoa_arithmetic(coa1, coa1, '/');
  console.log('testCTA2: ', testCTA2);
  console.log('testCTA1: ', testCTA1);

  coa1CTA1 = aoa_pickCoa(testCTA1, 3);
  console.log('coa1CTA1: ', coa1CTA1);

  roa1CTA1 = aoa_pickRoa(testCTA1, 3);
  console.log('roa1CTA1: ', roa1CTA1);
  console.log(localStorage);

  // aoa_removeItemFromLocalStorage('testCTA1Save');
  const key = 'myData';
  aoaN_saveDataToLocal(testCTA1, key);
  const loadedData = aoaN_loadDataFromLocal('myData');
  console.log('loadedData: ', loadedData);

  // let aoa3Test = [];
  // aoa3Test.push(testCTA1);
  // aoa3Test.push(testCTA1);
  // aoa3Test.push(testCTA1);
  // aoa3Test.push(testCTA1);
  // aoa3Test.push(testCTA1);
  // aoaN_saveDataToLocal()
  // console.log('aoa3Test2: ', aoa3Test);
  // aoaN_saveDataToLocal(aoa3Test, 'aoa3Test2');
  const loadedDataAoa3 = aoaN_loadDataFromLocal('aoa3Test');
  console.log(localStorage);
  console.log('loadedDataAoa3: ', loadedDataAoa3);



  // console.log('roa1: ', roa1);
  // console.log('roa1C: ', roa1C);
  // console.log('roa1T: ', roa1T);
  // console.log('testCTA1: ', testCTA1);
  // console.log('testCTA2: ', testCTA2);
  // console.log('testCTA3: ', testCTA3);
  // console.log('testCTA4: ', testCTA4);
  // console.log('testCTA5: ', testCTA5);
  // console.log('testCTA6: ', testCTA6);
  // console.log('testCTA7: ', testCTA7);
  // console.log('testCTA8: ', testCTA8);
  // console.log('testCTA9: ', testCTA9);
  // console.log('testCTA8: ', testCTA8);
}
