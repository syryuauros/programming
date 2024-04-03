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
}
