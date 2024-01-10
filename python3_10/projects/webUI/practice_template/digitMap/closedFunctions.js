
///////////////////////////////////////////////  UI level /////////////////////////////////////////////////////////
function selectedDataToT2(tableName) {
  var dataT2 = getDataFromSelectedRange(tableName);
  tableSettingsAtStart2 = Object.assign({}, tableSettingsAtStart1);
  tableSettingsAtStart2.data = dataT2;
  if (tableContent.table2) { tableContent.table2.destroy() };
  tableContent.table2 = new Handsontable(document.getElementById('table2'), tableSettingsAtStart2);
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
function plot1(tableName) {
  dataPlotTemp = tableContent[tableName].getData()
  zValuesTemp = dataPlotTemp.map(row => row.map(value => value));
  dataTemp = [{
      z: zValuesTemp,
      type: 'heatmap',
      colorscale: 'Viridis' // Choose your desired color scale
  }];

  Plotly.newPlot('plot', dataTemp, layout);
}
