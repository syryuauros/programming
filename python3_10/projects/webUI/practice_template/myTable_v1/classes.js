const hyperformulaInstance = HyperFormula.buildEmpty({
  licenseKey: 'internal-use-in-handsontable',
});

const tableSettingsAtStart = {
  data: [
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
    [ , , , , , ],
  ],
  dropdownMenu: false,
  filters: false,
  allowEmpty: true,
  type: 'numeric',
  // numericFormat: {
  //     pattern: '0,0.000',
  // },
  // renderer: scientificRenderer,
  //contextMenu: contextMenuTest,
  manualColumnFreeze: true,
  colHeaders: true,
  rowHeaders: true,
  manualColumnResize: true,
  manualRowResize: true,
  customBorders: true,
  width: '100%',
  height: '90%',
  renderAllRows: false,
  outsideClickDeselects: false,
  selectionMode: 'multiple',
  licenseKey: 'non-commercial-and-evaluation',
  // formulas: { engine: hyperformulaInstance },
};

const contextMenuHTable = {
  //https://handsontable.com/docs/8.2.0/demo-context-menu.html
  items: {
    plot: {
      name: 'Plot selected Data',
      submenu: {
        items: [
          {
            key: 'plot:heatMap',
            name: 'heatMap',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              heatMapPlotData(getDataFromSelectedRange(tableName), 'plot1');
            },
          },
          {
            key: 'plot:scatter',
            name: 'scatter',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              scatterPlotData(getDataFromSelectedRange(tableName), getHeaderFromSelectedRange(tableName), 'plot1');
            },
          },
        ]
      },
    },
    dataPrcs: {
      name: 'Data Processing',
      submenu: {
        items: [
          {
            key: 'dataPrcs:rowToHeader',
            name: 'rowToHeader',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              var sel = this.getSelected();
              rowToHeader(tableName, sel[0][0]);
            },
          },
          {
            key: 'dataPrcs:trimEmpty',
            name: 'trimEmpty',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              removeEmptyRows(tableName);
              removeEmptyCols(tableName);
            },
          },
          {
            key: 'dataPrcs:exportSelectedData',
            name: 'exportSelectedData',
            callback: function(key, selection, event) {
              let tableName = this.view.hot.rootElement.id;
              exportDataToCSV(getDataFromSelectedRange(tableName));
            },
          },

        ]
      },
    },

    "sp1": '---------',
    'col_right': {
      name: 'insert column'
    },
    'remove_col': {
      name: 'remove column(s)'
    },
    'row_below': {
      name: 'insert row'
    },
    'remove_row': {
      name: 'remove row(s)'
    },
    freeze: {
      name: 'freeze(unfreeze: set A1)',
      callback: function(key, selection, event) {
        var sel = this.getSelected();
        this.updateSettings({
          fixedRowsTop: sel[0][2],
          fixedColumnsLeft: sel[0][3],
        });
      },
    },
    "sp2": '---------',

    tableInfo: {
      name: 'Table Info',
      callback: function(key, selection, event) {
        console.log("tableID:", this.view.hot.rootElement.id);
      },
    },
  },
};




class MySheet {
  constructor(name, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
    this.name = name;
    this.panelCurrent = new MyPanel(this.name, panelHeight, panelWidth, panelYposition, panelXposition);
    this.tableCurrent = new MyTable(this.name);
  }

  identify() {
    console.log(`the sheet name is ${this.name}`);
  }
}

class MyTable {
  constructor(sheetName) {
    this.id = `${sheetName}_table`;
    this.tableElement = document.getElementById(`${this.id}`);
    this.tableSettings = JSON.parse(JSON.stringify(tableSettingsAtStart));
    // this.tableSettings.contextMenu = contextMenuHTable;
    // this.tableSettings.dropdownMenu = true;
    // this.tableSettings.filters = true;
    // this.tableSettings.formulas = { engine: hyperformulaInstance, };
    this.tableContent = new Handsontable(this.tableElement, this.tableSettings);
  }
}


class MyPanel {
  constructor(sheetName, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
    this.isMinimized = false;
    this.isMaximized = false;
    this.panel = document.createElement('div');
    this.panel.className = 'panel';
    this.panel.id = `${sheetName}_panel`;
    this.panel.style = 'color:#EC7063; z-Index: 1';
    this.panel.style.height = panelHeight + 'px';
    this.panel.style.width = panelWidth + 'px';
    this.panel.style.top = panelYposition + 'px';
    this.panel.style.left = panelXposition + 'px';
    this.panel.innerHTML = `
    <div class="panel-header" onmousedown="bringToFront('${this.panel.id}')">
      <span contenteditable="true" spellcheck="false" class="panel-title">${sheetName}</span>
      <div class="panel-controls">
        <button class="panel-minimize">\u2193</button>
        <button class="panel-minimize">\u2191</button>
        <button class="panel-minimize" onclick="${sheetName}.panelCurrent.toggleMinimize()">-</button>
        <button class="panel-minimize" onclick="${sheetName}.panelCurrent.toggleMaximize()">\u25A1</button>
        <button class="panel-close" onclick="${sheetName}.panelCurrent.closePanel()" >×</button>
      </div>
    </div>
    <div class="panel-content" onmousedown="bringToFront('${this.panel.id}')">
      <div id="${sheetName}_table"></div>
    </div>
    <div class="panel-resize-handle" onmousedown="bringToFront('${this.panel.id}')"></div>
    <script>
    </script/>
  `;
    document.body.appendChild(this.panel);
  }

  closePanel() {
    this.panel.style.display = 'none';
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;

    if (this.isMinimized) {
      this.panel.style.height = '40px';
      this.panel.style.width = '80px';
      this.panel.style.overflow = 'hidden';
    } else {
      this.panel.style.height = '210px';
      this.panel.style.width = '320px';
      this.panel.style.overflow = 'hidden';
    }
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;

    if (this.isMaximized) {
      this.panel.style.left = '2px';
      this.panel.style.top = '22px';
      this.panel.style.width = '99.5%';
      this.panel.style.height = '97.5%';
      this.panel.style.overflow = 'hidden';
    } else {
      this.panel.style.width = '320px';
      this.panel.style.height = '290px';
      this.panel.style.overflow = 'hidden';
    }
  }
}
