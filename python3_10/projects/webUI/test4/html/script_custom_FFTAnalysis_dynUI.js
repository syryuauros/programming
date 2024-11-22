
class DynUI {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        this.buttonList = {};
        this.inputList = {};
        this.fileInputList = {};
        this.selectList = {};
        this.tableList = {};
        this.tableSettings = {};
        this.tableDataList = {};
        this.tableSettingsAtStart = {
            data: [
                [ , ],
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
        }
    }

    handleClick() {
        alert('button clicked!');
    }

    addTitle(titleText) {
        const title = document.createElement('h1');
        title.textContent = titleText;
        this.container.appendChild(title);
    }

    addLabel(labelText) {
        const label = document.createElement('label');
        label.textContent = labelText;
        this.container.appendChild(label);
    }

    addLines(lineNum) {
        for (let i = 0; i <= lineNum; i++) {
            const line = document.createElement('br');
            this.container.appendChild(line);
        }
    }

    addButton(buttonID, buttonText) {
        const button = document.createElement('button');
        button.id = buttonID;
        button.textContent = buttonText;
        button.style = {
            width: '200px',
            height: '50px'
        };
        this.container.appendChild(button);
        this.buttonList[buttonID] = button;
    }

    addSelect(selectID) {
        const select = document.createElement('select');
        select.id = selectID;
        const option = document.createElement('option');
        option.value = 'no data';
        option.text = 'no data';
        select.appendChild(option);
        this.container.appendChild(select);
        this.selectList[selectID] = select;
    }

    modifySelect(selectID, options) {
        const select = document.getElementById(selectID);
        select.innerHTML ="";
        for (var option of options) {
            select.appendChild(option);
        }
    }

    addInput(inputID, width, defaultValue) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = inputID;
        input.style.width = width;
        input.style.textAlign = 'center';
        input.value = defaultValue;
        this.container.appendChild(input);
        this.inputList[inputID] = input;
    }

    addFileInput(inputID) {
        const input = document.createElement('input');
        input.type = 'file';
        input.id = inputID;
        input.accept = '.csv';
        input.multiple = true;
        this.container.appendChild(input);
        this.fileInputList[inputID] = input;
    }

    addTable(tableID) {
        const table = document.createElement('div');
        table.id = tableID;
        this.container.appendChild(table);
        this.tableSettings[tableID] = Object.assign({}, this.tableSettingsAtStart);
        this.tableList[tableID]= new Handsontable(table, this.tableSettings[tableID]);
    }

    modifyTable(tableID, tableSettings) {
        const table = document.getElementById(tableID);
        this.tableList[tableID]= new Handsontable(table, tableSettings);
    }
}


var options1 = [];

const dynUI1 = new DynUI('dynUI1');
dynUI1.addTitle('Input');
dynUI1.addLabel('Num of Header: ');
dynUI1.addInput('input1', '40px', '37');
dynUI1.addLabel(' , ');
dynUI1.addLines(1);
dynUI1.addLabel('column range to remove: ');
dynUI1.addInput('input2', '35px', '3');
dynUI1.addLabel(' ~ ');
dynUI1.addInput('input3', '35px', '7');
dynUI1.addLines(1);
dynUI1.addFileInput('fileInput1');
dynUI1.addLines(1);
dynUI1.addLabel(' select csv file to show: ');
dynUI1.addSelect('select1');
dynUI1.addLabel(' , ');
dynUI1.addLines(1);
dynUI1.addTable('table1');

const dynUI2 = new DynUI('dynUI2');
dynUI2.addTitle('Output');
dynUI2.addButton('button2_1', 'calculate');
dynUI2.addLines(1);
dynUI2.addTable('table2_1');





dynUI1.fileInputList['fileInput1'].addEventListener('change', async function(event) {
    var headerNum = +document.getElementById('input1').value;
    var colRanMin = +document.getElementById('input2').value;
    var colRanMax = +document.getElementById('input3').value;
    var fileNum = dynUI1.fileInputList.fileInput1.files.length;

    options1 = [];
    for (i = 0; i < fileNum; i++) {
        const option = document.createElement('option');
        option.value = (i+1).toString();
        option.text = (i+1).toString();
        options1[i] = option;
    }

    loadCSVsFromFolder(dynUI1, 'fileInput1', 'table1', headerNum, colRanMin, colRanMax);
    dynUI1.modifySelect('select1', options1);
    dynUI1.selectList['select1'].value = fileNum.toString();
    dynUI1.selectList['select1'].text = fileNum.toString();
});

dynUI1.selectList['select1'].addEventListener('change', function(event) {
    const container = dynUI1;
    const selNum = +container.selectList['select1'].value;
    dynUI1.tableSettings['table1'].data = dynUI1.tableDataList[selNum-1];
    dynUI1.modifyTable('table1', dynUI1.tableSettings['table1']);
    dynUI2.tableSettings['table2_1'].data = dynUI2.tableDataList[selNum-1].amp_result;
    dynUI2.modifyTable('table2_1', dynUI2.tableSettings['table2_1']);
})

dynUI2.buttonList['button2_1'].addEventListener('click',async function(event) {

    var fileNum = dynUI1.fileInputList.fileInput1.files.length;

    for (i = 0; i < fileNum; i++) {
        var dataTemp = dynUI1.tableDataList[i];
        const trRatio = 0;

        const response = await fetch('http://192.168.12.135:6969/FFTMulti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                check: false,
                data: dataTemp,
                truncateRatio: trRatio
            })
        });

        data = await response.json();

        dynUI2.tableDataList[i] = Object.assign({}, data);
    }

    const selNum = +dynUI1.selectList['select1'].value;
    dynUI2.tableSettings['table2_1'].data = dynUI2.tableDataList[selNum-1].amp_result;
    dynUI2.modifyTable('table2_1', dynUI2.tableSettings['table2_1']);
})









function loadCSVsFromFolder(container, inputName, tableName, headerNum, colRanMin, colRanMax) {
    var files = container.fileInputList[inputName].files;
    let i = 0;

    for (const file of files) {
        if (file.type === 'text/csv') {
            const reader = new FileReader();
            reader.onload = function(e) {
                var csvDataOrigin = e.target.result;
                container.tableDataList[i] = formattingData(csvDataOrigin, headerNum, colRanMin, colRanMax);
                container.tableSettings[tableName].data = container.tableDataList[i];
                container.modifyTable(tableName, container.tableSettings[tableName]);
                i++;
            };
            reader.readAsText(file);
        } else {
            console.log(`${file.name} is not a CSV file.`);
        }
    }
}

function formattingData(csvData, headerNum, colNumRangeMin, colNumRangeMax) {
    var rows = csvData.split("\n");
    var trimedRows = rows.slice(headerNum);
    var csvDataAOA = trimedRows.map(row => {
        let columns = row.split(/[\t,]/);
        let updatedColumns = columns.slice(0, colNumRangeMin).concat(columns.slice(colNumRangeMax));
        return updatedColumns;
    });
    return csvDataAOA;
}
