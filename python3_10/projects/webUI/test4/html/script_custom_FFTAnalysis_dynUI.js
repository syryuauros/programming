
class DynUI {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
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

    addButton(buttonText) {
        const button = document.createElement('button');
        button.textContent = buttonText;
        button1.style = {
            width: '200px',
            height: '50px'
        };
        button1.addEventListener('click', () => this.handleClick());
        this.container.appendChild(button);
    }

    addSelect(selectID) {
        const select = document.createElement('select');
        select.id = selectID;
        const option = document.createElement('option');
        option.value = '1';
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

const dynUI = new DynUI('dynUI');

var options1 = [];


dynUI.addTitle('Input');
dynUI.addLabel('Num of Header: ');
dynUI.addInput('input1', '40px', '37');
dynUI.addLabel(' , ');
dynUI.addLines(1);
dynUI.addLabel('column range to remove: ');
dynUI.addInput('input2', '35px', '3');
dynUI.addLabel(' ~ ');
dynUI.addInput('input3', '35px', '7');
dynUI.addLines(1);
dynUI.addFileInput('fileInput1');
dynUI.addLines(1);
dynUI.addLabel(' select csv file to show: ');
dynUI.addSelect('select1');
dynUI.addLabel(' , ');
dynUI.addLines(1);
dynUI.addTable('table1');


dynUI.fileInputList['fileInput1'].addEventListener('change', function(event) {
    var headerNum = +document.getElementById('input1').value;
    var colRanMin = +document.getElementById('input2').value;
    var colRanMax = +document.getElementById('input3').value;
    var fileNum = dynUI.fileInputList.fileInput1.files.length;

    options1 = [];
    for (i = 0; i < fileNum; i++) {
        const option = document.createElement('option');
        option.value = (i+1).toString();
        option.text = (i+1).toString();
        options1[i] = option;
    }

    loadCSVsFromFolder(dynUI, 'fileInput1', 'table1', headerNum, colRanMin, colRanMax);
    dynUI.modifySelect('select1', options1);
});

dynUI.selectList['select1'].addEventListener('change', function(event) {
    console.log('test!');
    const container = dynUI;
    const selNum = +container.selectList['select1'].value;
    console.log(selNum-1);
    container.tableSettings['table1'].data = container.tableDataList[selNum-1];
    container.modifyTable('table1', container.tableSettings['table1']);
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
