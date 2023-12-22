///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var tableSettingsAtStart = {
        data: [
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
            [, , , , , , , ,],
        ],
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        colHeaders: true,
        rowHeaders: true,
        customBorders: true,
        height: 'auto',
        renderAllRows: false,
        licenseKey: 'non-commercial-and-evaluation'
    };

    var table1Element = document.getElementById('table1');
    tableSettingsAtStart1 = Object.assign({}, tableSettingsAtStart);
    tableSettingsAtStart1.colHeaders = [ 'freq', 'p1_0', 'p1_1', 'p2_0', 'p2_1', 'p3_0', 'p3_1', 'sigma' ];
    var table1Content = new Handsontable(table1Element, tableSettingsAtStart1);

    var table2Element = document.getElementById('table2');
    tableSettingsAtStart2 = Object.assign({}, tableSettingsAtStart);
    tableSettingsAtStart2.colHeaders = [ 'freq', 'p1_0', 'p1_1', 'p2_0', 'p2_1', 'p3_0', 'p3_1', 'sigma' ];
    var table2Content = new Handsontable(table2Element, tableSettingsAtStart2);

    var table3Element = document.getElementById('table3');
    tableSettingsAtStart3 = Object.assign({}, tableSettingsAtStart);
    tableSettingsAtStart3.colHeaders = [ 'freq', 'p1_0', 'p1_1', 'p2_0', 'p2_1', 'p3_0', 'p3_1', 'sigma' ];
    var table3Content = new Handsontable(table3Element, tableSettingsAtStart3);

    var table4Element = document.getElementById('table4');
    tableSettingsAtStart4 = Object.assign({}, tableSettingsAtStart);
    tableSettingsAtStart4.colHeaders = [ 'freq', 'p1_0', 'p1_1', 'p2_0', 'p2_1', 'p3_0', 'p3_1', 'sigma' ];
    var table4Content = new Handsontable(table4Element, tableSettingsAtStart4);
