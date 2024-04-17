// exportToCSV(tableName) {


function exportToCSV(tableName) {
    var Data0 = tableContent[tableName].getData();
    exportDataToCSV(Data0);
}

function exportToDB(tableName) {
    var Data0 = tableContent[tableName].getData();
    console.log('Data0: ', Data0);
    openPopUpDB(popupDBTree,400,300);
    dataArrayToSave = Data0;
    console.log('dataArrayToSave: ', dataArrayToSave);
}

async function importFromDB(tableName) {
  openPopUpDB(popupDBTree,400,300);
  await waitForPopupToClose('popupDBTree');
  console.log('dataArrayToLoad: ', JSON.parse(dataArrayToLoad));
  updateTableAny(tableName, JSON.parse(dataArrayToLoad));
}


function waitForButtonClick() {
  return new Promise((resolve) => {
    const button = document.getElementById('myButton');

    const buttonClickHandler = () => {
      // Perform some action when the button is clicked
      console.log('Button clicked!');
      // You can add more logic here if needed

      // Resolve the promise to indicate that the onclick behavior has completed
        resolve(dBTree1.treeF.loadDataFromDB('treeContainer'));
    };

    button.addEventListener('click', buttonClickHandler);
  });
}

function waitForPopupToClose(popUpName) {
  return new Promise((resolve) => {
    const popup = document.getElementById(popUpName); // Change 'popup' to the actual ID of your popup element

    // Create a new MutationObserver
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.attributeName === 'style') {
          const style = popup.getAttribute('style');
          if (!style || style.indexOf('display: none') !== -1) {
            // If the popup is not shown
            observer.disconnect(); // Disconnect the observer
            resolve(); // Resolve the promise
          }
        }
      }
    });

    // Start observing changes to the style attribute of the popup
    observer.observe(popup, { attributes: true });
  });
}
