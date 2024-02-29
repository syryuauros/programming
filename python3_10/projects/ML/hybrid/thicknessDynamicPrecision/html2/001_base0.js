
//
// aoa_deepCopy(aoa) {
// aoa_transpose(aoa) {
// aoa_arrToRoa(arr) {
// aoa_arrToCoa(arr) {
// aoa_roaToArr(roaInput) {
// aoa_coaToArr(coaInput) {
//
// aoa_insertCoaToAoa(aoaInput, coa, coaIndex=aoaInput[0].length) {
// aoa_insertRoaToAoa(aoaInput, roa, roaIndex=aoaInput.length) {
// aoa_replaceCoaToAoa(aoaInput, coa, coaIndex=(aoaInput[0].length -1)) {
// aoa_replaceRoaToAoa(aoaInput, roa, roaIndex=(aoaInput.length - 1)) {
// aoa_deleteCoaToAoa(aoaInput, delIndex=(aoaInput[0].length -1)) {
// aoa_deleteRoaToAoa(aoaInput, delIndex=(aoaInput.length -1)) {
//
// function aoa_pickCoa(aoaInput, pickIndex) {
// aoa_pickRoa(aoaInput, pickIndex) {
//
// aoa_arithmetic(aoa1, aoa2, operator) {
// aoa_formatChange(aoaInput, operator) {
//
//

//
// arr_hasInvalidElement(arr) {
//
// radio(optionName) {
//
// strTest(str) {
// concatArrays(arr1, arr2) {
//
// getRange(start, end) {
// getColumn(matrix, columnIndex) {
// pickColumns(matrix, columnIndices) {
// deleteColumn(matrix, columnIndex) {
// insertColumn(matrix, columnIndex, columnData) {
// deleteColumns(matrix, columnIndices) {
// deleteRows(matrix, rowIndices) {
// deleteEmptyRows(matrix) {

// sumArray(arr1, arr2) {
// sumColumns(array1, array2) {

//
// strToArrNum(str) {
// deepCopyArray(arr) {
// deepCopy(data) {
// deepCopy(obj) {
// replaceSpecificColumn(arr, columnIndex, replacement) {
// replaceColToCol(arr, columnIndex, replacement) {
// replaceCharacter(inputString, charToReplace, replacementChar) {
// removeEmptyStringsFromArray(arr) {
//
// convertToAOA(csvData) {
// exportDataToCSV(Data0) {
//
// generateSelectBoxes(boxNum, innerHtml) {
// generateElems(container, elem, elemNum, innerHtml) {
//
// sleep(ms) {
// test1() {

let innerHtml1 = '<option value="1">Option 1</option><option value="2">Option 2</option>';

/////////////////////////////////////////////// functions ////////////////////////////////////////////////////////

function aoa_deepCopy(aoa) {
    const rowNum = aoa.length;
    const colNum = aoa[0].length;
    const deepCopy = [];

    for (let i = 0; i < rowNum; i++) {
        deepCopy.push([]);
        for (let j = 0; j < colNum; j++) {
            deepCopy[i].push(aoa[i][j]);
        }
    }
    return deepCopy;
}

function aoa_transpose(aoa) {
    const rowNum = aoa.length;
    const colNum = aoa[0].length;
    const transposedAoa = [];

    for (let j = 0; j < colNum; j++) {
        transposedAoa.push([]);
        for (let i = 0; i < rowNum; i++) {
            transposedAoa[j].push(aoa[i][j]);
        }
    }
    return transposedAoa;
}

function aoa_arrToRoa(arr) {
  return [arr]
}

function aoa_arrToCoa(arr) {
  return aoa_transpose(aoa_arrToRoa(arr));
}

function aoa_roaToArr(roaInput) {
  let roa = aoa_deepCopy(roaInput);
  return roa[0];
}

function aoa_coaToArr(coaInput) {
  let coa = aoa_deepCopy(coaInput);
  let roa = aoa_transpose(coa);
  return roa[0];
}

function aoa_insertCoaToAoa(aoaInput, coa, coaIndex=aoaInput[0].length) {
  let aoa = aoa_deepCopy(aoaInput);

  for (let i = 0; i < aoa.length; i++) {
    aoa[i].splice(coaIndex, 0, coa[i][0]);
  }
  return aoa;
}

function aoa_insertRoaToAoa(aoaInput, roa, roaIndex=aoaInput.length) {
  let aoa = aoa_deepCopy(aoaInput);
  aoa.splice(roaIndex, 0, ...roa);
  return aoa;
}

function aoa_replaceCoaToAoa(aoaInput, coa, coaIndex=(aoaInput[0].length -1)) {
  let aoa = aoa_deepCopy(aoaInput);
  for (let i = 0; i < aoa.length; i++) {
    aoa[i].splice(coaIndex, 1, coa[i][0]);
  }
  return aoa;
}

function aoa_replaceRoaToAoa(aoaInput, roa, roaIndex=(aoaInput.length - 1)) {
  let aoa = aoa_deepCopy(aoaInput);
  aoa.splice(roaIndex, 1, ...roa);
  return aoa;
}

function aoa_deleteCoaToAoa(aoaInput, delIndex=(aoaInput[0].length -1)) {
  let aoa = aoa_deepCopy(aoaInput);
  aoa.map(row => {
    row.splice(delIndex, 1);
    return row;
  })
  return aoa;
}

function aoa_deleteRoaToAoa(aoaInput, delIndex=(aoaInput.length -1)) {
  let aoa = aoa_deepCopy(aoaInput);
  aoa.splice(delIndex, 1);
  return aoa;
}

function aoa_pickCoa(aoaInput, pickIndex) {
  let aoa = aoa_deepCopy(aoaInput);
  let pickedCoa = [];

  for (let i = 0; i < aoa.length; i++) {
    if (aoa[i].length > pickIndex) {
      pickedCoa.push(aoa[i][pickIndex]);
    } else {
      pickedCoa.push(undefined);
    }
  }
  return aoa_arrToCoa(pickedCoa);
}



function aoa_pickRoa(aoaInput, pickIndex) {
  let aoa = aoa_deepCopy(aoaInput);
  let pickedRoa = [];

  if (pickIndex < 0 || pickIndex >= aoa.length) {
    return undefined;
  }
  return [aoa[pickIndex]];
}

function aoa_arithmetic(aoa1, aoa2, operator) {
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  if (!operators[operator]) {
    throw new Error('Unsupported operator');
  } else if ( operator === '/' && arr_hasInvalidElement(aoa_coaToArr(aoa2)) ) {
    throw new Error('Division by zero, NaN, or null');
  }

  const applyOperator = operators[operator];

  const result = [];
  for (let i = 0; i < aoa1.length; i++) {
    result.push([]);
    for (let j = 0; j < aoa1[i].length; j++) {
      result[i].push(applyOperator(aoa1[i][j], aoa2[i][j]));
    }
  }
  return result;
}

function aoa_formatChange(aoaInput, operator) {
  const operators = {
    'str': a => String(a),
    'num': a => Number(a),
    'bool': a => Boolean(a),
  }
  if (!operators[operator]) {
    throw new Error('Unsupported operator');
  }

  const applyOperator = operators[operator];

  const result = [];
  for (let i = 0; i < aoaInput.length; i++) {
    result.push([]);
    for (let j = 0; j < aoaInput[i].length; j++) {
      result[i].push(applyOperator(aoaInput[i][j]));
    }
  }
  return result;
}

function aoa_cal2(aoa1, aoa2, operator) {
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    'user1': (a,b) => Math.abs((a / b * 100) - 100),
  };

  if (!operators[operator]) {
    throw new Error('Unsupported operator');
  } else if ( operator === '/' && arr_hasInvalidElement(aoa_coaToArr(aoa2)) ) {
    throw new Error('Division by zero, NaN, or null');
  }

  const applyOperator = operators[operator];

  const result = [];
  for (let i = 0; i < aoa1.length; i++) {
    result.push([]);
    for (let j = 0; j < aoa1[i].length; j++) {
      result[i].push(applyOperator(aoa1[i][j], aoa2[i][j]));
    }
  }
  return result;
}

function aoa_cal3(aoa1, aoa2, aoa3, operator) {
  const operators = {
    '+': (a, b, c) => a + b + c,
    '*': (a, b, c) => a * b * c,
  };

  if (!operators[operator]) {
    throw new Error('Unsupported operator');
  }
  const applyOperator = operators[operator];

  const result = [];
  for (let i = 0; i < aoa1.length; i++) {
    result.push([]);
    for (let j = 0; j < aoa1[i].length; j++) {
      result[i].push(applyOperator(aoa1[i][j], aoa2[i][j]));
    }
  }
  return result;
}

function aoa_exportToCSV(arrayOfArrays, fileName) {
    const csvData = arrayOfArrays.map(row => row.join(',')).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);

    a.download = fileName;
    a.click();
    // Clean up by revoking the object URL
    URL.revokeObjectURL(a.href);
}

function aoaN_saveDataToLocal(aoaN, key) {
  localStorage.setItem(key, JSON.stringify(aoaN));
}

function aoaN_loadDataFromLocal(key) {
  let loadeData = localStorage[key];
  return loadeData ? JSON.parse(loadeData) : null;
}

function aoaN_removeItemFromLocalStorage(key) {
    localStorage.removeItem(key);
}


function arr_deepCopy(array) {
    if (!Array.isArray(array)) {
        return array; // If the input is not an array, return it as is
    }
    const copiedArray = [];
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            copiedArray.push(deepCopyArray(array[i]));
        } else {
            copiedArray.push(array[i]);
        }
    }
    return copiedArray;
}

function arr_range(start, end, excludeArr=[]) {
  let result = [];
  for (let i = start; i <= end; i++) {
    if (!excludeArr.includes(i)) {
      result.push(i);
    }
  }
  return result;
}

function arr_Average(arrayInput) {
  let array = arr_deepCopy(arrayInput);
  if (array.length === 0) {
    return NaN;
  }
  const sum = array.reduce((acc, current) => acc + current, 0);
  return sum / array.length;
}

function convertToNumber(value) {
    return Number(value);
}


function arr_hasInvalidElement(arrInput) {
    let arr = arr_deepCopy(arrInput);
    return arr.some(element => element === 0 || Number.isNaN(element) || element === null);
}





function radio(optionName) {
  var options = document.getElementsByName(optionName);
  options.forEach(option => {
    if (option.checked) {
        selectedOption = option.value;
    }
  });
  return selectedOption;
}

function strTest(strs) {
  const regex = /[^ ]/;
  return regex.test(strs);  // return true, when any character except but 'space' exists
}

function concatArrays(arr1, arr2) {
  return arr1.concat(arr2);
}

function getRange(start, end, exclude) {
  let result = [];
  for (let i = start; i <= end; i++) {
    if (!exclude.includes(i)) {
      result.push(i);
    }
  }
  return result;
}

function getColumn(matrix, columnIndex) {
  return matrix.map(row => row[columnIndex]);
}

function pickColumns(matrix, columnIndices) {
    return matrix.map(row =>
        columnIndices.map(index => row[index])
    );
}

function deleteColumn(matrix, columnIndex) {
    return matrix.map(row => {
        row.splice(columnIndex, 1);
        return row;
    });
}

function deleteColumns(matrix, columnIndices) {
  // Iterate over each row in the array
  for (let i = 0; i < matrix.length; i++) {
    // Iterate over each column index to delete
    for (let j = columnIndices.length - 1; j >= 0; j--) {
      const columnIndex = columnIndices[j];
      // Remove the element at the specified column index
      matrix[i].splice(columnIndex, 1);
    }
  }
  return matrix;
}

function deleteRows(matrix, rowIndices) {
    // Sort row indices in descending order to avoid index shifting when deleting rows
    rowIndices.sort((a, b) => b - a);

    // Iterate over row indices and delete corresponding rows
    rowIndices.forEach(index => {
        matrix.splice(index, 1);
    });

    return matrix;
}

function deleteEmptyRows(arr) {
    return arr.filter(row => {
        return row.some(element => element !== null && element !== '');
    });
}

function insertColumnToMatrix(matrix, columnIndex, columnData) {
    // Loop through each row in the array
    for (let i = 0; i < matrix.length; i++) {
        // Insert the column data at the specified column index for each row
        matrix[i].splice(columnIndex, 0, columnData[i][0]);
    }
    return matrix;
}

function sumArray(arr1, arr2) {
  return arr1.map((value, index) => value + arr2[index]);
}

function sumColumns(array1, array2) {
  const result = [];
  for (let i = 0; i < array1.length; i++) {
    result.push([]);
    for (let j = 0; j < array1[i].length; j++) {
      result[i].push(array1[i][j] + array2[i][j]);
    }
  }
  return result;
}

function minusColumns(array1, array2) {
  const result = [];
  for (let i = 0; i < array1.length; i++) {
    result.push([]);
    for (let j = 0; j < array1[i].length; j++) {
      result[i].push(array1[i][j] - array2[i][j]);
    }
  }
  return result;
}

function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Create a new matrix with swapped rows and columns
    const transposedMatrix = [];
    for (let j = 0; j < cols; j++) {
        transposedMatrix.push([]);
        for (let i = 0; i < rows; i++) {
            transposedMatrix[j].push(matrix[i][j]);
        }
    }

    return transposedMatrix;
}


function strToArrNum(str) {
  let arrayOfNumbers = str.split(' ').map(Number);
  return arrayOfNumbers;
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

function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        // If obj is not an object, or is null, return it directly
        return obj;
    }
    // Create a new object or array to hold the copied properties
    var copy = Array.isArray(obj) ? [] : {};
    // Iterate over each property of the original object
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // Recursively copy each property
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
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

function replaceCharacter(inputString, charToReplace, replacementChar) {
  const regex = new RegExp(charToReplace, 'g');
  const resultString = inputString.replace(regex, replacementChar);
  return resultString;
}

function removeEmptyStringsFromArray(arr) {
    return arr.filter(function(element) {
        return element.trim() !== ''; // Remove elements that are empty strings after trimming
    });
}

function convertToAOA(csvData) {
    var rows = csvData.split("\n");
    var csvDataAOA = rows.map(row => row.split(/[\t,]/));
    return csvDataAOA;
}

function exportDataToCSV(Data0) {
    const csvFormat = Data0.map(row => row.join(',')).join('\n'); //data0 is array of array
    const blob = new Blob([csvFormat], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data0.csv';
    a.click();
    URL.revokeObjectURL(url);
}


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


function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function test1() {
  setTimeout(() => {
    dataTxt = 'a';
    console.log(dataTxt);
  },300);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
