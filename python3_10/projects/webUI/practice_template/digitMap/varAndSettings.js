var tableContent = {};
var columnsConfig = [];
var data;
var zValues;

const digitMap = [
  [0.1, 0.3, 0.5, 0.7, 0.9],
  [0.2, 0.4, 0.6, 0.8, 1.0],
  [0.3, 0.5, 0.7, 0.9, 0.2],
  [0.4, 0.6, 0.8, 1.0, 0.4],
  [0.5, 0.7, 0.9, 0.2, 0.6]
  // Add more rows as needed
];

const tableSettingsAtStart = {
    data: [
        [ , ],
    ],
    allowEmpty: true,
    type: 'numeric',
    // numericFormat: {
    //     pattern: '0,0.000',
    // },
    renderer: scientificRenderer,
    colHeaders: true,
    rowHeaders: true,
    customBorders: true,
    width: '100%',
    height: '63.5%',
    renderAllRows: false,
    outsideClickDeselects: false,
    selectionMode: 'multiple',
    licenseKey: 'non-commercial-and-evaluation'
};

const layout = {
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
