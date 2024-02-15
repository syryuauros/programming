function openPopUp(popUpId, top, left) {
  topPosition = top + 'px';
  leftPosition = left + 'px';
  popUpId.style.top = topPosition;
  popUpId.style.left = leftPosition;
  popUpId.style.display = 'block';
}

function closePopUp(popUpId) {
  popUpId.style.display = 'none';
}

function applyMinMaxColor(plotName, inputIdName) {
  let zRange = document.getElementById(inputIdName).value.split(" ");
  console.log(zRange);
  let zMin = zRange[0];
  let zMax = zRange[1];
  Plotly.update(plotName, {zmin: zMin, zmax: zMax,});
}

function applyColorScale(plotName, inputIdName) {
  var selectBox = document.getElementById(inputIdName);
  var selectedValue = selectBox.value;
  Plotly.update(plotName, {colorscale: selectedValue,});
}
