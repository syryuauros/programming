    const settingTableElement = document.getElementById('settingTable');
    const settingTableSettings = {
        data: [
            [0, 50, 0, 2],
            [500, 900, 0, 20],
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
    const settingTable = new Handsontable(settingTableElement, settingTableSettings);

    const REFTableElement = document.getElementById('table3');
    const REFTableSettings = {
        data: [
            [0, 0,],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        colHeaders: ['time', 'intensity'],
        rowHeaders: true,
        customBorders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation'
    };
    var table3Content = new Handsontable(REFTableElement, REFTableSettings);
