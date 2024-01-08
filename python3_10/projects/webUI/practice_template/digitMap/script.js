const trace = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

const digitMap = [
  [0.1, 0.3, 0.5, 0.7, 0.9],
  [0.2, 0.4, 0.6, 0.8, 1.0],
  [0.3, 0.5, 0.7, 0.9, 0.2],
  [0.4, 0.6, 0.8, 1.0, 0.4],
  [0.5, 0.7, 0.9, 0.2, 0.6]
  // Add more rows as needed
];

const zValues = digitMap.map(row => row.map(value => value));

const data = [{
    z: zValues,
    type: 'heatmap',
    colorscale: 'Viridis' // Choose your desired color scale
}];

const layout = {
  width: 500,
  height: 500,
  dragmode: 'zoom',
};

Plotly.newPlot('plot', data, layout);
