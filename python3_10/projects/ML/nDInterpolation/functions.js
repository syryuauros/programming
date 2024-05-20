
let panelCounter = 0;
var panels = [];
var sheets = [];
let aoa = new AoaFunctions();

function createNewSheet(panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22', name=`sheets[${panelCounter}]`) {
  const panelName = `panels[${panelCounter}]`;
  // const sheetName = `sheets[${panelCounter}]`;
  sheets[panelCounter] = new MySheet(name, panelHeight, panelWidth, panelYposition, panelXposition);
  panelCounter++;
}

function bringToFront(panelID) {
  const panels = document.querySelectorAll('.panel');
  const panel = document.getElementById(panelID);

  // Set the clicked panel to the highest z-index
  let maxZIndex = 0;
  let minZIndex = 0;
  let count = 0;
  panels.forEach(p => {
    const zIndex = parseInt(window.getComputedStyle(p).zIndex, 10);
    maxZIndex = Math.max(maxZIndex, zIndex);
    minZIndex = Math.min(minZIndex, zIndex);
    count++;
    p.style.zIndex = p.style.zIndex - 1;
  });

  panel.style.zIndex = maxZIndex;
}

async function calculate() {
  var inputData = aoa.deleteCoaToAoa(sheets[0].tableCurrent.tableSettings.data,0);
  var paramData = aoa.deleteCoaToAoa(sheets[1].tableCurrent.tableSettings.data,0);
  var pointsData = aoa.deleteCoaToAoa(sheets[2].tableCurrent.tableSettings.data,0);

  // console.log(inputData);
  // console.log(paramData);
  // console.log(pointsData);

  const response = await fetch('http:192.168.12.135:7003/nD_interpolation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputData: inputData,
      paramData: paramData,
      pointsData: pointsData,
    })
  });

  // const data = await response.json();

  // // createTableAny('table2', data.tst_X);
  // tableContent['table2'].updateSettings({
  //   data: data.tst_X,
  //   colHeaders: headerX,
  //   // colHeaders: removeElementsFromArray(header1, 2),
  //   // numericFormat: {
  //   //   pattern: '0,0.00',
  //   // },
  //   renderer: scientificRenderer,
  //   // formulas: {
  //   //   engine: HyperFormula,
  //   // },
  // });
}
