// removeElementsFromArray(arr, n) {
// replaceColToExpr(arr, columnIndex, expr) {

function removeElementsFromArray(arr, n) {
  arrCopy = deepCopyArray(arr);
  // Check if the array is not empty and n is a valid number
  if (arrCopy.length > 0 && Number.isInteger(n) && n >= 0) {
    // Remove the first n elements
    arrCopy.splice(0, n);
  }
  return arrCopy;
}


function replaceColToExpr(arr, columnIndex, expr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > columnIndex) {
      arr[i][columnIndex] = replaceCharacter(expr, '~', i+1);
    } else {
      console.error(`Column index ${columnIndex} is out of bounds for row ${i}.`);
    }
  }
}
