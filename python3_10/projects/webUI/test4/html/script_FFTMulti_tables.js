    var settingTableElement = document.getElementById('settingTable');
    var settingTableSettings = {
        data: [
            [500, 900, 0, 20],
            [0, 50, 0, 2],
            [0, 50, 0, 2],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
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
            [0, 0, 0,],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        colHeaders: ['A', 'B', 'C' ],
        rowHeaders: true,
        customBorders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
    };

    var table1Element = document.getElementById('table1');
    var table1Content = new Handsontable(table1Element, tableSettingsAtStart);

    var table2Element = document.getElementById('table2');
    var table2Content = new Handsontable(table2Element, tableSettingsAtStart);

    var table3Element = document.getElementById('table3');
    var table3Content = new Handsontable(table3Element, tableSettingsAtStart);

    var table4Element = document.getElementById('table4');
    var table4Content = new Handsontable(table4Element, tableSettingsAtStart);
