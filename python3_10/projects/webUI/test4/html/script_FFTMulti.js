    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var ctx3 = document.getElementById('myChart3').getContext('2d');
    const options = document.getElementsByName('options');
    const optionsChart = document.getElementsByName('optionsChart');
    const optionsInput = document.getElementsByName('optionsInput');
    const optionsAmpPhs = document.getElementsByName('optionsAmpPhs');
    const optionsRealImag = document.getElementsByName('optionsRealImag');

    var data;
    var iFFT_result;
    var amp_result;
    var phs_result;
    var real_result;
    var imag_result;


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
        licenseKey: 'non-commercial-and-evaluation'
    };

    var scatterChart = new Chart(ctx, {
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
    var stemChart = new Chart(ctx2, {
        type: 'scatter', // Set the chart type to scatter
        data: {
            datasets: [],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {

                }
            }
        }
    });
    var stemChart2 = new Chart(ctx3, {
        type: 'scatter', // Set the chart type to scatter
        data: {
            datasets: [],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {

                }
            }
        }
    });



    async function calculate() {
        var data0 = table1Content.getData()
        optionsInput.forEach(option => {
            if (option.checked) {
                selectedOption = option.value;
            }
        });

        const response = await fetch('http://192.168.12.135:6969/FFTMulti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: data0,
            })
        });

        data = await response.json();
        iFFT_result = data.iFFT_result;
        amp_result = data.amp_result;
        phs_result = data.phs_result;
        real_result = data.real_result;
        imag_result = data.imag_result;

        createTable2();
        drawchart1();
        createTable3();
        drawchart2();
        createTable4();
        drawchart3();
    }

    function createTable1(csvData) {
        const table1Element = document.getElementById('table1');
        const table1Settings = tableSettingsCommon;
        table1Settings.data = csvData;

        table1Content = new Handsontable(table1Element, table1Settings);
    }

    function createTable2() {
        const table2Element = document.getElementById('table2');
        const table2Settings = tableSettingsCommon;
        table2Settings.data = iFFT_result;

        table2Content = new Handsontable(table2Element, table2Settings);
    }

    function createTable3() {
        const table3Element = document.getElementById('table3');
        const table3Settings = tableSettingsCommon;

        optionsAmpPhs.forEach(option => {
            if (option.checked) {
                selectedOption = option.value;
            }
        });

        if (selectedOption == "amp") {
            table3Settings.data = amp_result;
        } else {
            table3Settings.data = phs_result;
        }

        table3Content = new Handsontable(table3Element, table3Settings);
    }

    function createTable4() {
        const table4Element = document.getElementById('table4');
        const table4Settings = tableSettingsCommon;

        optionsRealImag.forEach(option => {
            if (option.checked) {
                selectedOption = option.value;
            }
        });

        if (selectedOption == "real") {
            table4Settings.data = real_result;
        } else {
            table4Settings.data = imag_result;
        }

        table4Content = new Handsontable(table4Element, table4Settings);
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

        // console.log({ xMin1, xMax1, yMin1, yMax1 })
        // console.log({ xMin2, xMax2, yMin2, yMax2 })

        var xData0 = table1Content.getDataAtCol(0);
        var yData00 = table1Content.getDataAtCol(1);
        var xData1 = table2Content.getDataAtCol(0);
        var yData10 = table2Content.getDataAtCol(1);
        var xData2 = table3Content.getDataAtCol(0);
        var yData20 = table3Content.getDataAtCol(1);



        scatterChart.options.scales = {
            x: {
                min: xMin1,
                max: xMax1,
            },
            y: {
                min: yMin1,
                max: yMax1,
            }
        };
        stemChart.options.scales = {
            x: {
                min: xMin2,
                max: xMax2,
            },
            y: {
                min: yMin2,
                max: yMax2,
            }
        };
        stemChart2.options.scales = {
            x: {
                min: xMin2,
                max: xMax2,
            },
            y: {
                min: yMin2,
                max: yMax2,
            }
        };


        scatterChart.update();
        stemChart.update();
        stemChart2.update();
    }

    function drawchart3() {
        var xData0 = table4Content.getDataAtCol(0);

        optionsRealImag.forEach(option => {
            if (option.checked) {
                selectedOption = option.value;
            }
        });

        if (selectedOption == "real") {
            yData00 = table4Content.getDataAtCol(1);
        } else {
            yData00 = table4Content.getDataAtCol(2);
        }


        stemChart.options.scales = {
            x: {
                min: xData0.min,
                max: xData0.max
            }
        };

        stemChart2.data.datasets = [
            {
                label: 'FFT amplitude',
                type: 'bar',
                data: xData0.map((value, index) => ({ x: value, y: yData00[index] })),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                barThickness: 3,
                borderColor: "rgba(75, 192, 192, 0.6)",
                borderWidth: 1,
            },
            {
                label: '',
                type: 'scatter',
                data: xData0.map((value, index) => ({ x: value, y: yData00[index] })),
                backgroundColor: "rgba(150, 100, 100, 0.6)",
                pointRadius: 2,
                pointHoverRadius: 2,
                showLine: false,
                fill: false,
                borderWidth: 1,
                borderColor: "rgba(150, 100, 100, 0.6)",
                borderDash: [10, 3, 20, 10],
            }
        ];

        stemChart2.update();
    }

    function drawchart2() {
        var xData0 = table3Content.getDataAtCol(0);

        optionsAmpPhs.forEach(option => {
            if (option.checked) {
                selectedOption = option.value;
            }
        });

        if (selectedOption == "amp") {
            yData00 = table3Content.getDataAtCol(1);
        } else {
            yData00 = table3Content.getDataAtCol(2);
        }


        stemChart.options.scales = {
            x: {
                min: xData0.min,
                max: xData0.max
            }
        };

        stemChart.data.datasets = [
            {
                label: 'FFT amplitude',
                type: 'bar',
                data: xData0.map((value, index) => ({ x: value, y: yData00[index] })),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                barThickness: 3,
                borderColor: "rgba(75, 192, 192, 0.6)",
                borderWidth: 1,
            },
            {
                label: '',
                type: 'scatter',
                data: xData0.map((value, index) => ({ x: value, y: yData00[index] })),
                backgroundColor: "rgba(150, 100, 100, 0.6)",
                pointRadius: 2,
                pointHoverRadius: 2,
                showLine: false,
                fill: false,
                borderWidth: 1,
                borderColor: "rgba(150, 100, 100, 0.6)",
                borderDash: [10, 3, 20, 10],
            }
        ];

        stemChart.update();
    }


    function drawchart1() {
        var xData1 = table1Content.getDataAtCol(0);
        var yData10 = table1Content.getDataAtCol(1);
        var xData2 = table2Content.getDataAtCol(0);
        var yData20 = table2Content.getDataAtCol(1);


        scatterChart.options.scales = {
            x: {
                min: xData1.min,
                max: xData1.max
            }
        };

        scatterChart.data.datasets = [
            {
                label: 'Input',
                data: xData1.map((value, index) => ({ x: value, y: yData10[index] })),
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
            },
            {
                label: 'Calculated',
                data: xData2.map((value, index) => ({ x: value, y: yData20[index] })),
                backgroundColor: "rgba(150, 100, 100, 0.6)",
                pointRadius: 0,
                pointHoverRadius: 0,
                showLine: true,
                fill: false,
                borderWidth: 3,
                borderColor: "rgba(150, 100, 100, 0.6)",
                //borderDash: [10, 3, 20, 10],
                tension:0.5
            }
        ];
        scatterChart.update();
    }
