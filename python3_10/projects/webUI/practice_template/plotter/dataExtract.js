
function plotsChoose() {
  var selectedOption = radio('optT');
  heatMapPlot(selectedOption, 'plot1');
}
function plotT1HeatMap() {
  dataSelectedTemp = dataSelected;
  console.log(dataSelected);
  createNewPlot(plotSelectedName);
  heatMapPlotData(dataSelectedTemp, plotSelectedName+'1');
}
function plotT1Scatter() {
  scatterPlotData(dataSelected, 'plot1');
}

///////////////////////////////////////////////  for table /////////////////////////////////////////////////////////

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
function createNewPlot(plotName) {
  const currentPlot = document.createElement('div');
  currentPlot.className = 'panel';
  currentPlot.id = plotName;
  currentPlot.style = 'color:#EC7063; z-Index: 1';
  currentPlot.innerHTML = `
    <div class="panel-header" onmousedown="bringToFront('${plotName}')">
      <span class="panel-title">${plotName}</span>
      <div class="panel-controls">
        <button class="panel-minimize" onclick="toggleMinimize('${plotName}')">-</button>
        <button class="panel-minimize" onclick="toggleMaximize('${plotName}')">\u25A1</button>
        <button class="panel-close" onclick="closePanel('${plotName}')">×</button>
      </div>
    </div>
    <div class="panel-content" onmousedown="bringToFront('${plotName}'); handleMouseRightDown(event);">
      <div id='${plotName}1'></div>
    </div>
    <div class="panel-resize-handle" onmousedown="bringToFront('${plotName}'); handleMouseDown(event);"></div>
    <script>
    </script/>
  `;

  document.body.appendChild(currentPlot);
}



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
