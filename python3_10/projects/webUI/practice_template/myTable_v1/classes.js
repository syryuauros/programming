class MyTable {
  constructor(name) {
    this.name = name;
    this.panel = new MyPanel(this.name);
  }

  identify() {
    console.log(`the table name is ${this.name}`);
  }
}


class MyPanel {
  constructor(tableName) {
    this.isMinimized = false;
    this.isMaximized = false;
    this.panel = document.createElement('div');
    this.panel.className = 'panel';
    this.panel.style = 'color:#EC7063; z-Index: 1';
    this.panel.innerHTML = `
    <div class="panel-header">
      <span contenteditable="true" spellcheck="false" class="panel-title">${tableName}</span>
      <div class="panel-controls">
        <button class="panel-minimize">\u2193</button>
        <button class="panel-minimize">\u2191</button>
        <button class="panel-minimize" onclick="${tableName}.panel.toggleMinimize()">-</button>
        <button class="panel-minimize" onclick="${tableName}.panel.toggleMaximize()">\u25A1</button>
        <button class="panel-close" onclick="${tableName}.panel.closePanel()" >×</button>
      </div>
    </div>
    <div class="panel-content">
      <div id='aaa'></div>
      <button >new</button>
    </div>
    <div class="panel-resize-handle"></div>
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
