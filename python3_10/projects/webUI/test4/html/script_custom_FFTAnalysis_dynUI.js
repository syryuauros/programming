
class DynUI {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        this.tableList = {};
        this.tableSettings = {};
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

    addInput(inputID) {
        const input = document.createElement('input');
        input.type = 'file';
        input.id = inputID;
        input.accept = '.csv';
        input.multiple = true;
        this.container.appendChild(input);
    }

    addTable(tableID) {
        const table = document.createElement('div');
        table.id = tableID;
        this.container.appendChild(table);
        this.tableSettings[tableID] = Object.assign({}, dynUI.tableSettingsAtStart);
        this.tableList[tableID]= new Handsontable(table, this.tableSettings[tableID]);
    }

    modifyTable(tableID, tableSettings) {
        const table = document.getElementById(tableID);
        this.tableList[tableID]= new Handsontable(table, tableSettings);
    }
}

const dynUI = new DynUI('dynUI');
dynUI.addTitle('Input');
dynUI.addInput('input1');
dynUI.addLines(1);
dynUI.addTable('table1');

dynUI.tableSettings['table1'].data = [
    [200, 1000, -12, 12],
    [200, 1000, -7, 7],
    [200, 1000, -1, 3.5],
];
dynUI.modifyTable('table1', dynUI.tableSettings['table1']);
