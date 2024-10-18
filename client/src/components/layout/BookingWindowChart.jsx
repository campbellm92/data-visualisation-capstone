// 
//  IFQ715 Web Development Pratice Assignment 2 By Gary Cazzulino
//
//  RankingsChart.js - graph on Rankings page
//
//

import { AgCharts } from 'ag-charts-react';
import { kGraphLineStyle } from '../../constants';

export default function BookingWindowChart({ occupancy }) {

  let options = {
    title: {
      text: `Average Booking Window (days)`,
    },
    // Data: Data to be displayed in the chart
    data: occupancy.map(sample => {
      return { "sample_date": sample.sample_date.substring(0,10),
               "average_booking_window": parseFloat(sample.average_booking_window),

               "noosa_sample_date": sample.lga_name == 'Noosa' ? sample.sample_date.substring(0,10) : null,
               "gold_coast_sample_date": sample.lga_name == 'Gold Coast' ? sample.sample_date.substring(0,10) : null,
               "whitsunday_sample_date": sample.lga_name == 'Whitsunday' ? sample.sample_date.substring(0,10) : null,
               "cairns_sample_date": sample.lga_name == 'Cairns' ? sample.sample_date.substring(0,10) : null,
   
               "noosa_average_booking_window": sample.lga_name == 'Noosa' ? parseFloat(sample.average_booking_window) : null,
               "gold_coast_average_booking_window": sample.lga_name == 'Gold Coast' ? parseFloat(sample.average_booking_window) : null,
               "whitsunday_average_booking_window": sample.lga_name == 'Whitsunday' ? parseFloat(sample.average_booking_window) : null,
               "cairns_average_booking_window": sample.lga_name == 'Cairns' ? parseFloat(sample.average_booking_window) : null
        
      }
    }),
    // Series: Defines which chart type and data to use
    series: [

      {
        type: "line",
        xKey: "noosa_sample_date",
        yKey: "noosa_average_booking_window",
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
        yKey: "gold_coast_average_booking_window",
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
        yKey: "whitsunday_average_booking_window",
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
        yKey: "cairns_average_booking_window",
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
        type: "number",
        position: "left",
        label: {
          format: "#{.1f} Days",
        },
      },
    ],
  }

  return (
    <AgCharts options={options} />
  );
}