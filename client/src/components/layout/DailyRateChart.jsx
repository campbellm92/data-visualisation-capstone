// 
//  IFQ717 Web Development Capstone
//
//  DailyRateChart.jsx - 
//
//

import { AgCharts } from 'ag-charts-react';
import { kGraphLineStyle } from '../../constants';

export default function DailyRateChart({ year, currentCountry, occupancy }) {

  let options = {
    title: {
      text: `Average Daily Rate ($)`,
    },
    // Data: Data to be displayed in the chart
    data: occupancy.map(sample => {
      return {
        "lga_name": sample.lga_name,
        "sample_date": sample.sample_date.substring(0, 10),
        "average_average_daily_rate": parseFloat(sample.average_daily_rate),

        "noosa_sample_date": sample.lga_name == 'Noosa' ? sample.sample_date.substring(0, 10) : null,
        "gold_coast_sample_date": sample.lga_name == 'Gold Coast' ? sample.sample_date.substring(0, 10) : null,
        "whitsunday_sample_date": sample.lga_name == 'Whitsunday' ? sample.sample_date.substring(0, 10) : null,
        "cairns_sample_date": sample.lga_name == 'Cairns' ? sample.sample_date.substring(0, 10) : null,

        "noosa_average_daily_rate": sample.lga_name == 'Noosa' ? parseFloat(sample.average_daily_rate) : null,
        "gold_coast_average_daily_rate": sample.lga_name == 'Gold Coast' ? parseFloat(sample.average_daily_rate) : null,
        "whitsunday_average_daily_rate": sample.lga_name == 'Whitsunday' ? parseFloat(sample.average_daily_rate) : null,
        "cairns_average_daily_rate": sample.lga_name == 'Cairns' ? parseFloat(sample.average_daily_rate) : null

      }
    }),
    // Series: Defines which chart type and data to use
    series: [
      {
        type: "line",
        xKey: "noosa_sample_date",
        yKey: "noosa_average_daily_rate",
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
        yKey: "gold_coast_average_daily_rate",
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
        yKey: "whitsunday_average_daily_rate",
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
        yKey: "cairns_average_daily_rate",
        yName: "Cairns",
        interpolation: { type: kGraphLineStyle },
        strokeWidth: 2,
        marker: {
          enabled: false,
        }
      },
    ],
    axes: [
      {
        type: "date",
        position: "bottom",
      },
      {
        type: "currency",
        position: "left",
        label: {
          format: "$#{.2f}",
        },
      },
    ]
  }

  return (
    <AgCharts options={options} />
  );
}