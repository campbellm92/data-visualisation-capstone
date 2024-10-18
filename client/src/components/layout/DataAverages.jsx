// 
//  IFQ717 Web Development Capstone
//
//  DataAverages.js -
//
//

import { AgCharts } from 'ag-charts-react';
import { kGraphLineStyle } from '../../constants';
import { average } from '../../api';

export default function DataAverages({ occupancy, title, field, scale }) {

  let options = {
    title: {
      text: title,
    },
    // Data: Data to be displayed in the chart
    data: [{
      'noosa_lga': 'Noosa',
      'noosa_average': average(occupancy
        .filter(sample => sample.lga_name === 'Noosa')
        .map(sample => { return parseFloat(sample[field]) * scale})),
      'gold_coast_lga': 'Gold Coast',
      'gold_coast_average': average(occupancy
        .filter(sample => sample.lga_name === 'Gold Coast')
        .map(sample => { return parseFloat(sample[field]) * scale})),
      'whitsunday_lga': 'Whitsunday',
      'whitsunday_average': average(occupancy
        .filter(sample => sample.lga_name === 'Whitsunday')
        .map(sample => { return parseFloat(sample[field]) * scale})),
      'cairns_lga': 'Cairns',
      'cairns_average': average(occupancy
        .filter(sample => sample.lga_name === 'Cairns')
        .map(sample => { return parseFloat(sample[field]) * scale}))
    },
  ],
    // Series: Defines which chart type and data to use
    series: [
      {
        type: "bar",
        xKey: "noosa_lga",
        yKey: "noosa_average",
        yName: "Noosa",
        interpolation: { type: kGraphLineStyle },
        strokeWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        type: "bar",
        xKey: "gold_coast_lga",
        yKey: "gold_coast_average",
        yName: "Gold Coast",
        interpolation: { type: kGraphLineStyle },
        strokeWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        type: "bar",
        xKey: "whitsunday_lga",
        yKey: "whitsunday_average",
        yName: "Whitsunday",
        interpolation: { type: kGraphLineStyle },
        strokeWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        type: "bar",
        xKey: "cairns_lga",
        yKey: "cairns_average",
        yName: "Cairns",
        interpolation: { type: kGraphLineStyle },
        strokeWidth: 2,
        marker: {
          enabled: false,
        },
      },
    ],
  }

  return (
    <AgCharts options={options} />
  );
}