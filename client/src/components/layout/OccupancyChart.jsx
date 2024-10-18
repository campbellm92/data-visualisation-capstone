// 
//  IFQ717 Web Development Capstone
//
//  OccupancyChart.js - 
//
//

import { AgCharts } from 'ag-charts-react';
import { kGraphLineStyle } from '../../constants';


export default function OccupancyChart({ year, currentCountry, occupancy }) {

  let options = {
    title: {
      text: `Average Historical Occupancy (%)`,
    },
    // Data: Data to be displayed in the chart
    data: occupancy.map(sample => {
      return { "sample_date": sample.sample_date.substring(0,10),
               "average_historical_occupancy": parseFloat(sample.average_historical_occupancy) * 100.0,

               "noosa_sample_date": sample.lga_name == 'Noosa' ? sample.sample_date.substring(0,10) : null,
               "gold_coast_sample_date": sample.lga_name == 'Gold Coast' ? sample.sample_date.substring(0,10) : null,
               "whitsunday_sample_date": sample.lga_name == 'Whitsunday' ? sample.sample_date.substring(0,10) : null,
               "cairns_sample_date": sample.lga_name == 'Cairns' ? sample.sample_date.substring(0,10) : null,
   
               "noosa_average_historical_occupancy": sample.lga_name == 'Noosa' ? parseFloat(sample.average_historical_occupancy) : null,
               "gold_coast_average_historical_occupancy": sample.lga_name == 'Gold Coast' ? parseFloat(sample.average_historical_occupancy) : null,
               "whitsunday_average_historical_occupancy": sample.lga_name == 'Whitsunday' ? parseFloat(sample.average_historical_occupancy) : null,
               "cairns_average_historical_occupancy": sample.lga_name == 'Cairns' ? parseFloat(sample.average_historical_occupancy) : null
               
      }
    }),
    // Series: Defines which chart type and data to use
    series: [
      { type: "line", 
        xKey: "noosa_sample_date", 
        yKey: "noosa_average_historical_occupancy", 
        yName: "Noosa", 
        interpolation: { type: kGraphLineStyle },
        strokeWidth: 2,
        marker: {
          enabled: false,
        },  
      },
      { type: "line", 
      xKey: "gold_coast_sample_date", 
      yKey: "gold_coast_average_historical_occupancy", 
      yName: "Gold Coast", 
      interpolation: { type: kGraphLineStyle },
      strokeWidth: 2,
      marker: {
        enabled: false,
      },  
    },
    { type: "line", 
      xKey: "whitsunday_sample_date", 
      yKey: "whitsunday_average_historical_occupancy", 
      yName: "Whitsunday", 
      interpolation: { type: kGraphLineStyle },
      strokeWidth: 2,
      marker: {
        enabled: false,
      },  
    },
    { type: "line", 
      xKey: "cairns_sample_date", 
      yKey: "cairns_average_historical_occupancy", 
      yName: "Cairns", 
      interpolation: { type: kGraphLineStyle },
      strokeWidth: 2,
      marker: {
        enabled: false,
      },  
    },
  ],
    sort: 'Health'
  }

  return (
    <AgCharts options={options} />
  );
}