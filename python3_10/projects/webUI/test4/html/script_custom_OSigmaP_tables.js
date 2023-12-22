    var settingTableElement = document.getElementById('table5');
    var settingTableSettings = {
        data: [
            [200, 1000, -12, 12],
            [200, 1000, -7, 7],
            [200, 1000, -1, 3.5],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0',
        },
        colHeaders: ['xMin', 'xMax', 'yMin', 'yMax' ],
        rowHeaders: true,
        customBorders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
    };
    var settingTable = new Handsontable(settingTableElement, settingTableSettings);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var tableSettingsAtStart = {
        data: [
            [, , , , , , , ],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        colHeaders: true,
        rowHeaders: true,
        customBorders: true,
        width: '100%',
        height: '63.5%',
        renderAllRows: false,
        licenseKey: 'non-commercial-and-evaluation'
    };

    var table1Element = document.getElementById('table1');
    tableSettingsAtStart1 = Object.assign({}, tableSettingsAtStart);
    var table1Content = new Handsontable(table1Element, tableSettingsAtStart1);

    var table2Element = document.getElementById('table2');
    tableSettingsAtStart2 = Object.assign({}, tableSettingsAtStart);
    var table2Content = new Handsontable(table2Element, tableSettingsAtStart2);

    var table3Element = document.getElementById('table3');
    tableSettingsAtStart3 = Object.assign({}, tableSettingsAtStart);
    var table3Content = new Handsontable(table3Element, tableSettingsAtStart3);

    var table4Element = document.getElementById('table4');
    tableSettingsAtStart4 = Object.assign({}, tableSettingsAtStart);
    var table4Content = new Handsontable(table4Element, tableSettingsAtStart4);

    var correlationTableElement = document.getElementById('correlationTable');
    tableSettingsAtStartC = Object.assign({}, tableSettingsAtStart);
    tableSettingsAtStartC.data = [ [0, 0, 0,], [0, 0, 0,], [0, 0, 0,],];
    tableSettingsAtStartC.colHeaders = [ 'p1', 'p2', 'p3', ];
    var correlationTableContent = new Handsontable(correlationTableElement, tableSettingsAtStartC);

    // tableSettingsAtStart4.colHeaders = [ 'freq', 'p1_0', 'p1_1', 'p2_0', 'p2_1', 'p3_0', 'p3_1', 'sigma' ];
