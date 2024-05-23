// class MyBasicPanel {
//   constructor(name, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
//     this.name = name;
//     this.panelCurrent = new MyPanel(this.name, panelHeight, panelWidth, panelYposition, panelXposition);
//   }
// }


// class MyTablePanel extends MyBasicPanel {
//   constructor(name, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
//     super(name);
//     this.itemCurrent = new MyTable(this.name);
//   }
// }

class MyTablePanel {
  constructor(name, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
    this.name = name;
    this.panelCurrent = new MyPanel(this.name, panelHeight, panelWidth, panelYposition, panelXposition);
    this.itemCurrent = new MyTable(this.name);
  }
}


class MyPlotPanel {
  constructor(name, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
    this.name = name;
    this.panelCurrent = new MyPanel(this.name, panelHeight, panelWidth, panelYposition, panelXposition);
    this.itemCurrent = new MyPlot(this.name);
  }
}

class MyPlot {
  constructor(name) {
    this.id = `${name}_plot`;
    this.trace = {
      x: [],
      y: [],
      z: 1,
      mode: 'lines',
      line: {
        dash: 'line',
        size: 5,
      },
      type: 'scatter',
      colorscale: 'Hot'
    };
    Plotly.newPlot(this.id, [this.trace], layoutScatter, {scrollZoom: true, responsive: true});
  }
}

class MyTable {
  constructor(name) {
    this.id = `${name}_table`;
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
  constructor(name, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
    this.isMinimized = false;
    this.isMaximized = false;
    this.panel = document.createElement('div');
    this.panel.className = 'panel';
    this.panel.id = `${name}_panel`;
    this.panel.style = 'color:#EC7063; z-Index: 1';
    this.panel.style.height = panelHeight + 'px';
    this.panel.style.width = panelWidth + 'px';
    this.panel.style.top = panelYposition + 'px';
    this.panel.style.left = panelXposition + 'px';
    var innerHTMLStart = `
      <div class="panel-header" onmousedown="bringToFront('${this.panel.id}')">
        <span contenteditable="true" spellcheck="false" class="panel-title">${name}</span>
        <div class="panel-controls">
    `;
    var innerHTMLContents1DB = `
          <button class="panel-minimize">\u2193</button>
          <button class="panel-minimize">\u2191</button>
    `;
    var innerHTMLContents1Toggle = `
          <button class="panel-minimize" onclick="${name}.panelCurrent.toggleMinimize()">-</button>
          <button class="panel-minimize" onclick="${name}.panelCurrent.toggleMaximize()">\u25A1</button>
    `;
    var innerHTMLContents1Close = `
          <button class="panel-close" onclick="${name}.panelCurrent.closePanel()" >×</button>
    `;

    var innerHTMLLinker1 = `
        </div>
      </div>
      <div class="panel-content" onmousedown="bringToFront('${this.panel.id}')">
    `;
    var innerHTMLContents2Table = `
        <div id="${name}_table"></div>
    `;
    var innerHTMLContents2Plot = `
        <div id="${name}_plot"></div>
    `;
    var innerHTMLEnd = `
      </div>
      <div class="panel-resize-handle" onmousedown="bringToFront('${this.panel.id}')"></div>
      <script>
      </script/>
    `;

    this.panel.innerHTML =
      innerHTMLStart
      + innerHTMLContents1DB
      + innerHTMLContents1Toggle
      + innerHTMLContents1Close
      + innerHTMLLinker1
      + innerHTMLContents2Table
      + innerHTMLContents2Plot
      + innerHTMLEnd;

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
