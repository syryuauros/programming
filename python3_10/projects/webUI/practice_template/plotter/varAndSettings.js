var tableContent = {};
var columnsConfig = [];
var data;
var zValues;
var dataSelected;

var legendOn = { showlegend: true, };
var legendOff = { showlegend: false, };
var icon1 = {
  'width': 500,
  'height': 600,
  'path': 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z'
}

const digitMap = [
  [0.1, 0.3, 0.5, 0.7, 0.9],
  [0.2, 0.4, 0.6, 0.8, 1.0],
  [0.3, 0.5, 0.7, 0.9, 0.2],
  [0.4, 0.6, 0.8, 1.0, 0.4],
  [0.5, 0.7, 0.9, 0.2, 0.6]
  // Add more rows as needed
];


///////////////////////////////////////////////  for table /////////////////////////////////////////////////////////
const tableSettingsAtStart = {
    data: [
        [ , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , ,],
        [ , , , , , , , , , , , , ,],
    ],
    allowEmpty: true,
    type: 'numeric',
    // numericFormat: {
    //     pattern: '0,0.000',
    // },
    //renderer: scientificRenderer,
    colHeaders: true,
    rowHeaders: true,
    customBorders: true,
    width: '100%',
    height: '90%',
    renderAllRows: false,
    outsideClickDeselects: false,
    selectionMode: 'multiple',
    licenseKey: 'non-commercial-and-evaluation'
};


///////////////////////////////////////////////  for plotly /////////////////////////////////////////////////////////
const layoutHeatMap = {
  width: 550,
  height: 450,
  margin: {
    l: 0,
    r: 0,
    t: 0,
    b: 0,
  },
  dragmode: 'zoom',
  xaxis: {
    showticklabels: false,
  },
  yaxis: {
    showticklabels: false,
    autorange: 'reversed',
  },
};


const layoutScatter = {
  width: 550,
  height: 450,
  margin: {
    l: 30,
    r: 10,
    t: 10,
    b: 20,
  },
  dragmode: 'zoom',
  xaxis: {
    showaline: true,
    showticklabels: true,
  },
  yaxis: {
    showline: true,
    showticklabels: true,
  },
  // showlegend: false,
  legend: {
    x: 0.20,
    y: 0.95,
    xanchor: 'right',
    yanchor: 'top',
  },
};


const configPlotCommon = {
  scrollZoom: true,
  displaylogo: false,
  modeBarButtonsToAdd: [
  {
    name: 'legend on',
    icon: icon1,
    click: function(plot1) {
      Plotly.relayout(plot1, legendOn);
    },
  },
  {
    name: 'legend off',
    icon: icon1,
    click: function(plot1) {
      Plotly.relayout(plot1, legendOff);
    },
  },
  ],
  modeBarButtonsToRemove: [
    'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian',
  ],
};
