    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var ctx3 = document.getElementById('myChart3').getContext('2d');
    const checkKeepAxis = document.getElementById('checkKeepAxis');
    var optionsSimpleNorm = document.getElementsByName('optionsSimpleNorm');
    var table2Content;
    var dataForTable20;
    var dataForTable21;
    var dataCov;

    const tableSettingsCommon = {
        allowEmpty: true,
        type: 'numeric',
        numericFormat: {
            pattern: '0,0.00',
        },
        allowEmpty: true,
        colHeaders: true,
        rowHeaders: true,
        customBorders: true,
        dropdownMenu: false,
        width: 'auto',
        height: 'auto',
        viewportRowRenderingOffset: 10,
        licenseKey: 'non-commercial-and-evaluation'
    };

    const chartSettingsScatLine = {
        label: 'Input',
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        pointRadius: 3,
        pointHoverRadius: 3,
        //pointStyle: 'rectRot',
        showLine: true,
        fill: false,
        borderWidth: 1,
        borderColor: "rgba(75, 192, 192, 0.6)",
        borderDash: [10, 2],
        tension: 0.5,
    };

    const chartSettingsScatPoint = {
        label: 'Calculated',
        backgroundColor: "rgba(150, 100, 100, 0.6)",
        pointRadius: 0,
        pointHoverRadius: 0,
        showLine: true,
        fill: false,
        borderWidth: 3,
        borderColor: "rgba(150, 100, 100, 0.6)",
        //borderDash: [10, 3, 20, 10],
        tension:0.5
    };

    var scatterChartPropertyCommon = {
        type: 'scatter', // Set the chart type to scatter
        data: {
            datasets: [],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {

                }
            }
        }
    }

    var scatterChart1 = new Chart(ctx, {
        type: 'scatter', // Set the chart type to scatter
        data: {
            datasets: [],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {

                }
            }
        }
    });
    var scatterChart2 = new Chart(ctx2, {
        type: 'scatter', // Set the chart type to scatter
        data: {
            datasets: [],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {

                }
            }
        }
    });
    var scatterChart3 = new Chart(ctx3, {
        type: 'scatter', // Set the chart type to scatter
        data: {
            datasets: [],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {

                }
            }
        }
    });

   async function calculate() {
       var data0 = table0Content.getData();
       var data1 = table1Content.getData();

       const response = await fetch('http://192.168.12.135:6969/custom_sensitivity', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               data0: data0,
               data1: data1,
           })
       });
       data = await response.json();
       dataForTable20 = data.data0;
       dataForTable21 = data.data1;
       dataCov = data.dataCov;

       createTable2();
       drawchart1();
       drawchart2();
       drawchart3();
       createCorrelationTable();
    }

    function createTable1(csvData) {
        if (table1Content) { table1Content.destroy(); }
        var table1Settings = tableSettingsCommon;
        table1Settings.data = csvData;
        table1Settings.colHeaders = [ 'freq', 'p1_0', 'p1_1', 'p2_0', 'p2_1', 'p3_0', 'p3_1', 'sigma' ];

        table1Content = new Handsontable(table1Element, table1Settings);
    }

    function createTable2() {
        if (table2Content) { table2Content.destroy(); }
        const table2Element = document.getElementById('table2');
        const table2Settings = tableSettingsCommon;

       optionsSimpleNorm.forEach(option => {
           if (option.checked) {
               selectedOption = option.value;
           }
       });

       if (selectedOption == "simple") {
           table2Settings.data = dataForTable20;
       } else {
           table2Settings.data = dataForTable21;
       }
        table2Settings.numericFormat.pattern = '0,0.000';

        table2Content = new Handsontable(table2Element, table2Settings);
    }

    function createCorrelationTable() {
        if (correlationTableContent) { correlationTableContent.destroy(); }
        var correlationTableElement = document.getElementById('correlationTable');
        var correlationTableSettings = tableSettingsCommon;
        correlationTableSettings.data = dataCov;
        correlationTableSettings.colHeaders = [ 'p1', 'p2', 'p3', ];
        correlationTableSettings.rowHeaders = [ 'p1', 'p2', 'p3', ];

        correlationTableContent = new Handsontable(correlationTableElement, correlationTableSettings);
    }

    function modifyRange() {
        var xMin1 = settingTable.getDataAtCell(0,0);
        var xMax1 = settingTable.getDataAtCell(0,1);
        var yMin1 = settingTable.getDataAtCell(0,2);
        var yMax1 = settingTable.getDataAtCell(0,3);

        var xMin2 = settingTable.getDataAtCell(1,0);
        var xMax2 = settingTable.getDataAtCell(1,1);
        var yMin2 = settingTable.getDataAtCell(1,2);
        var yMax2 = settingTable.getDataAtCell(1,3);

        var xMin3 = settingTable.getDataAtCell(2,0);
        var xMax3 = settingTable.getDataAtCell(2,1);
        var yMin3 = settingTable.getDataAtCell(2,2);
        var yMax3 = settingTable.getDataAtCell(2,3);

        scatterChart1.options.scales = {
            x: {
                min: xMin1,
                max: xMax1,
            },
            y: {
                min: yMin1,
                max: yMax1,
            }
        };
        scatterChart2.options.scales = {
            x: {
                min: xMin2,
                max: xMax2,
            },
            y: {
                min: yMin2,
                max: yMax2,
            }
        };
        scatterChart3.options.scales = {
            x: {
                min: xMin3,
                max: xMax3,
            },
            y: {
                min: yMin3,
                max: yMax3,
            }
        };

        scatterChart1.update();
        scatterChart2.update();
        scatterChart3.update();
    }

    function drawchart1() {
        var xData1 = table2Content.getDataAtCol(0);
        var yData10 = table2Content.getDataAtCol(1);

        chartSettingsScatPoint1 = Object.assign({}, chartSettingsScatPoint);
        chartSettingsScatPoint1.data = xData1.map((value, index) => ({ x: value, y: yData10[index] }));
        scatterChart1.data.datasets = [
            chartSettingsScatPoint1,
        ];

        if (!checkKeepAxis.checked) {
            scatterChart1.options.scales = {
                x: {
                    min: xData1.min,
                    max: xData1.max
                }
            };
        } else {
        }
        scatterChart1.update();
    }

    function drawchart2() {
        var xData1 = table2Content.getDataAtCol(0);
        var yData20 = table2Content.getDataAtCol(2);

        chartSettingsScatPoint2 = Object.assign({}, chartSettingsScatPoint);
        chartSettingsScatPoint2.data = xData1.map((value, index) => ({ x: value, y: yData20[index] }));
        scatterChart2.data.datasets = [
            chartSettingsScatPoint2,
        ];

        if (!checkKeepAxis.checked) {
            scatterChart2.options.scales = {
                x: {
                    min: xData1.min,
                    max: xData1.max
                }
            };
        } else {
        }
        scatterChart2.update();
    }

    function drawchart3() {
        var xData1 = table2Content.getDataAtCol(0);
        var yData30 = table2Content.getDataAtCol(3);

        chartSettingsScatPoint3 = Object.assign({}, chartSettingsScatPoint);
        chartSettingsScatPoint3.data = xData1.map((value, index) => ({ x: value, y: yData30[index] }));
        scatterChart3.data.datasets = [
            chartSettingsScatPoint3,
        ];

        if (!checkKeepAxis.checked) {
            scatterChart3.options.scales = {
                x: {
                    min: xData1.min,
                    max: xData1.max
                }
            };
        } else {
        }
        scatterChart3.update();
    }
