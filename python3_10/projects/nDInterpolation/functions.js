
let panelCounter = 0;
var panels = [];
var sheets = [];

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
