class MyPanel {
  constructor(name, panelHeight='210', panelWidth='320', panelYposition='22', panelXposition='22') {
    this.isMinimized = false;
    this.isMaximized = false;
    this.panel = document.createElement('div');
    this.panel.id = `${name}`;
    this.panel.className = 'panel ui-widget-content';
    this.panel.style = 'color:#EC7063; z-Index: 1';
    this.panel.style.height = panelHeight + 'px';
    this.panel.style.width = panelWidth + 'px';
    this.panel.style.top = panelYposition + 'px';
    this.panel.style.left = panelXposition + 'px';

    this.innerHTMLStart = `
      <div class="panel-header" onmousedown="">
        ${this.panel.id}
      </div>
    `;
    this.innerHTMLInnerPanel = `
      <div id="${this.panel.id}_sub" class="innerpanel ui-widget-content" style="width: 100px; height: 100px">
        <div class="panel-header" onmousedown="">
          ${this.panel.id}_sub
        </div>
      </div>
    `;

    this.innerHTMLEnd = `
      <script>
      </script/>
    `;

    this.panel.innerHTML =
      this.innerHTMLStart
      + this.innerHTMLInnerPanel;
      + this.innerHTMLEnd;

    document.body.appendChild(this.panel);

    this.initialize();

  }

  initialize() {
    $(function() {
      $(`#` + this.panel.id).resizable().draggable({
        handle: ".panel-header",
        start: function() {
          zIndexCouter++;
          $(this).css("z-index", zIndexCouter);
        }
      });
      $( ".panel" ).css("position", "absolute");
      $( ".panel" ).on("click", function() {
        zIndexCouter++;
        $(this).css("z-index", zIndexCouter);
      });
      $(`#` + this.panel.id + `_sub`).resizable().draggable({ containment: "parent", handle: ".panel-header", });
      $( ".innerPanel" ).css("position", "absolute");
    }.bind(this));
  };
}
