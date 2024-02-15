// calt() {
// createTableAny(tableName, csvData) {
//
// removeColumns(tableName, columnIndexes) {
// removeRows(tableName, rowIndexes) {
// insertColumn(tableName, columnIndex) {
// removeEmptyRows(tableName) {
// removeEmptyCols(tableName) {
// rowToHeader(tableName, rowNum = 0) {
//
// toggleDropdownMenu(tableName) {
// scientificRenderer(instance, td, row, col, prop, value, cellProperties) {
// getDataFromSelectedRange(tableName) {

function calt() {
  let tableName = 'table1';
  let colsToBeDelStr = document.getElementById('colsToBeDel').value;
  let colsToBeDel = strToArrNum(colsToBeDelStr);

  removeColumns(tableName,colsToBeDel);
  rowToHeader(tableName);
  removeRows(tableName,[0]);
  removeEmptyRows(tableName);
}

function createTableAny(tableName, csvData) {
    var tableElement = document.getElementById(tableName);
    let tableSettings = JSON.parse(JSON.stringify(tableSettingsAtStart));
    tableSettings.contextMenu = contextMenuHTable;
    tableSettings.data = csvData;
    tableContent[tableName] = new Handsontable(tableElement, tableSettings);
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


function toggleDropdownMenu(tableName) {
  let dmSwitch = tableName + 'Dm';
  dm[tableName] = !dm[tableName];
  tableContent[tableName].updateSettings({
    dropdownMenu: dm[tableName],
  });
}

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
