
// radio(optionName) {
//
// getColumn(matrix, columnIndex) {
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
