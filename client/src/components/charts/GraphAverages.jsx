// 
//  IFQ717 Web Development Capstone
//
//  DataAverages.js -
//
//

import { AgCharts } from 'ag-charts-react';
import { kGraphLineStyle } from '../../utils/constants';
import { average } from '../../utils/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function GraphAverages({ dataSet, title, field, scale, useRechart }) {

  let options = {
    title: {
      text: title,
    },
    // Data: Data to be displayed in the chart
    data: [{
      'noosa_lga': 'Noosa',
      'noosa_average': average(dataSet
        .filter(sample => sample.lga_name === 'Noosa')
        .map(sample => { return parseFloat(sample[field]) * scale })),
      'gold_coast_lga': 'Gold Coast',
      'gold_coast_average': average(dataSet
        .filter(sample => sample.lga_name === 'Gold Coast')
        .map(sample => { return parseFloat(sample[field]) * scale })),
      'whitsunday_lga': 'Whitsunday',
      'whitsunday_average': average(dataSet
        .filter(sample => sample.lga_name === 'Whitsunday')
        .map(sample => { return parseFloat(sample[field]) * scale })),
      'cairns_lga': 'Cairns',
      'cairns_average': average(dataSet
        .filter(sample => sample.lga_name === 'Cairns')
        .map(sample => { return parseFloat(sample[field]) * scale }))
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

  if (useRechart) {

    return (<div style={{ width: '100%', height: '90%' }}>
      <ResponsiveContainer>
        <h2 style={{ textAlign: 'center' }}>{title}</h2>

        <BarChart
          data={options.data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="sample_date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar type="monotone" name="Cairns" dataKey="cairns_average" stroke="#ff0000" fill="#ff0000" dot={false} isAnimationActive={false} />
          <Bar type="monotone" name="Gold Coast" dataKey="gold_coast_average" stroke="#00ff00" fill="#00ff00" dot={false} isAnimationActive={false} />
          <Bar type="monotone" name="Noosa" dataKey="noosa_average" stroke="#0000ff" fill="#0000ff" dot={false} isAnimationActive={false} />
          <Bar type="monotone" name="Whitsunday" dataKey="whitsunday_average" stroke="#9B870C" fill="#9B870C" dot={false} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    );

  } else {

    return (
      <AgCharts options={options} />
    );
  }
}