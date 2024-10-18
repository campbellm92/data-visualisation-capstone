// 
//  IFQ717 Web Development Capstone
//
//  LengthOfStayChart.jsx -
//
//

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

//const ChartComponent = ( {occupancy}) => (
export default function LengthOfStayChart({ year, currentCountry, occupancy }) {

  const data = occupancy.filter(sample => sample.lga_name === 'Gold Coast').map(sample => {
    return {
      "sample_date": sample.sample_date.substring(0, 10),
      "value": parseFloat(sample.average_length_of_stay),

      "noosa_sample_date": sample.lga_name == 'Noosa' ? sample.sample_date.substring(0, 10) : null,
      "gold_coast_sample_date": sample.lga_name == 'Gold Coast' ? sample.sample_date.substring(0, 10) : null,
      "whitsunday_sample_date": sample.lga_name == 'Whitsunday' ? sample.sample_date.substring(0, 10) : null,
      "cairns_sample_date": sample.lga_name == 'Cairns' ? sample.sample_date.substring(0, 10) : null,

      "noosa_average_length_of_stay": sample.lga_name == 'Noosa' ? parseFloat(sample.average_length_of_stay) : null,
      "gold_coast_average_length_of_stay": sample.lga_name == 'Gold Coast' ? parseFloat(sample.average_length_of_stay) : null,
      "whitsunday_average_length_of_stay": sample.lga_name == 'Whitsunday' ? parseFloat(sample.average_length_of_stay) : null,
      "cairns_average_length_of_stay": sample.lga_name == 'Cairns' ? parseFloat(sample.average_length_of_stay) : null

    }
  });

  /*[
    { date: '2023-01-01', value: 400 },
    { date: '2023-01-02', value: 300 },
    { date: '2023-01-03', value: 200 },
    { date: '2023-01-04', value: 278 },
    { date: '2023-01-05', value: 189 },
    { date: '2023-01-06', value: 239 },
    { date: '2023-01-07', value: 349 },
  ];*/

  return (<div style={{ width: '100%', height: 400 }}>
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sample_date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
  )
}

// export default ChartComponent;


/*
import { AgCharts } from 'ag-charts-react';
import { kGraphLineStyle } from '../../constants';

export default function LengthOfStayChart({ year, currentCountry, occupancy }) {

  let options = {
    title: {
      text: `Average Length of Stay (days)`,
    },
    // Data: Data to be displayed in the chart
    data: occupancy.map(sample => {
      return {
        "sample_date": sample.sample_date.substring(0, 10),
        "average_length_of_stay": parseFloat(sample.average_length_of_stay),

        "noosa_sample_date": sample.lga_name == 'Noosa' ? sample.sample_date.substring(0, 10) : null,
        "gold_coast_sample_date": sample.lga_name == 'Gold Coast' ? sample.sample_date.substring(0, 10) : null,
        "whitsunday_sample_date": sample.lga_name == 'Whitsunday' ? sample.sample_date.substring(0, 10) : null,
        "cairns_sample_date": sample.lga_name == 'Cairns' ? sample.sample_date.substring(0, 10) : null,

        "noosa_average_length_of_stay": sample.lga_name == 'Noosa' ? parseFloat(sample.average_length_of_stay) : null,
        "gold_coast_average_length_of_stay": sample.lga_name == 'Gold Coast' ? parseFloat(sample.average_length_of_stay) : null,
        "whitsunday_average_length_of_stay": sample.lga_name == 'Whitsunday' ? parseFloat(sample.average_length_of_stay) : null,
        "cairns_average_length_of_stay": sample.lga_name == 'Cairns' ? parseFloat(sample.average_length_of_stay) : null

      }
    }),
    // Series: Defines which chart type and data to use
    series: [

      {
        type: "line",
        xKey: "noosa_sample_date",
        yKey: "noosa_average_length_of_stay",
        yName: "Noosa",
        interpolation: { type: kGraphLineStyle },
        strokeWidth: 2,
        marker: {
          enabled: false,
        }
      },
      {
        type: "line",
        xKey: "gold_coast_sample_date",
        yKey: "gold_coast_average_length_of_stay",
        yName: "Gold Coast",
        interpolation: { type: kGraphLineStyle },
        strokeWidth: 2,
        marker: {
          enabled: false,
        }
      },
      {
        type: "line",
        xKey: "whitsunday_sample_date",
        yKey: "whitsunday_average_length_of_stay",
        yName: "Whitsunday",
        interpolation: { type: kGraphLineStyle },
        strokeWidth: 2,
        marker: {
          enabled: false,
        }
      },
      {
        type: "line",
        xKey: "cairns_sample_date",
        yKey: "cairns_average_length_of_stay",
        yName: "Cairns",
        interpolation: { type: kGraphLineStyle },
        strokeWidth: 2,
        marker: {
          enabled: false,
        }
      },
    ],
  }

  return (
    <AgCharts options={options} />
  );
}*/