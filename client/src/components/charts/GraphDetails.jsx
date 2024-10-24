//
//  IFQ717 Web Development Capstone
//
//  BookingWindowChart.jsx -
//
//

import { AgCharts } from "ag-charts-react";
import { kGraphLineStyle } from "../../api/utils/constants";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function denormalizeDataSet(dataSet, field, scale) {
  let prevSampleDate = "";
  let retArray = new Array();
  let daySummary;

  dataSet.forEach((sample) => {
    let currValue = parseFloat(sample[field]) * scale;

    if (sample.sample_date.substring(0, 10) != prevSampleDate) {
      prevSampleDate = sample.sample_date.substring(0, 10);
      daySummary = {
        sample_date: sample.sample_date.substring(0, 10),
      };
      retArray.push(daySummary);
    }

    daySummary[sample.lga_name] = currValue;
  });

  return retArray;
}

export default function GraphDetails({
  dataSet,
  title,
  field,
  scale,
  useRechart,
}) {
  if (useRechart) {
    const data = denormalizeDataSet(dataSet, field, scale);
    // dataSet/*.filter(sample => sample.lga_name === 'Gold Coast')*/.map(sample => {
    //     return {
    //       "sample_date": sample.sample_date.substring(0, 10),
    //       "Noosa": sample.lga_name == 'Noosa' ? parseFloat(sample[field]) * scale : null,
    //       "Gold Coast": sample.lga_name == 'Gold Coast' ? parseFloat(sample[field]) * scale : null,
    //       "Whitsunday": sample.lga_name == 'Whitsunday' ? parseFloat(sample[field]) * scale : null,
    //       "Cairns": sample.lga_name == 'Cairns' ? parseFloat(sample[field]) * scale : null
    //     }
    //   });

    return (
      <div style={{ width: "100%", height: "90%" }}>
        <ResponsiveContainer>
          <h2 style={{ textAlign: "center" }}>{title}</h2>

          <LineChart
            data={data}
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
            <Line
              type="monotone"
              name="Cairns"
              dataKey="Cairns"
              stroke="#ff0000"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              name="Gold Coast"
              dataKey="Gold Coast"
              stroke="#00ff00"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              name="Noosa"
              dataKey="Noosa"
              stroke="#0000ff"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              name="Whitsunday"
              dataKey="Whitsunday"
              stroke="#9B870C"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    let options = {
      title: {
        text: title,
      },
      // Data: Data to be displayed in the chart
      data: dataSet.map((sample) => {
        return {
          sample_date: sample.sample_date.substring(0, 10),
          average_booking_window: parseFloat(sample[field]),

          noosa_sample_date:
            sample.lga_name == "Noosa"
              ? sample.sample_date.substring(0, 10)
              : null,
          gold_coast_sample_date:
            sample.lga_name == "Gold Coast"
              ? sample.sample_date.substring(0, 10)
              : null,
          whitsunday_sample_date:
            sample.lga_name == "Whitsunday"
              ? sample.sample_date.substring(0, 10)
              : null,
          cairns_sample_date:
            sample.lga_name == "Cairns"
              ? sample.sample_date.substring(0, 10)
              : null,

          noosa_value:
            sample.lga_name == "Noosa"
              ? parseFloat(sample[field]) * scale
              : null,
          gold_coast_value:
            sample.lga_name == "Gold Coast"
              ? parseFloat(sample[field]) * scale
              : null,
          whitsunday_value:
            sample.lga_name == "Whitsunday"
              ? parseFloat(sample[field]) * scale
              : null,
          cairns_value:
            sample.lga_name == "Cairns"
              ? parseFloat(sample[field]) * scale
              : null,
        };
      }),
      // Series: Defines which chart type and data to use
      series: [
        {
          type: "line",
          xKey: "noosa_sample_date",
          yKey: "noosa_value",
          yName: "Noosa",
          interpolation: { type: kGraphLineStyle },
          strokeWidth: 1,
          marker: {
            enabled: false,
          },
        },
        {
          type: "line",
          xKey: "gold_coast_sample_date",
          yKey: "gold_coast_value",
          yName: "Gold Coast",
          interpolation: { type: kGraphLineStyle },
          strokeWidth: 1,
          marker: {
            enabled: false,
          },
        },
        {
          type: "line",
          xKey: "whitsunday_sample_date",
          yKey: "whitsunday_value",
          yName: "Whitsunday",
          interpolation: { type: kGraphLineStyle },
          strokeWidth: 1,
          marker: {
            enabled: false,
          },
        },
        {
          type: "line",
          xKey: "cairns_sample_date",
          yKey: "cairns_value",
          yName: "Cairns",
          interpolation: { type: kGraphLineStyle },
          strokeWidth: 1,
          marker: {
            enabled: false,
          },
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
    };

    return <AgCharts options={options} />;
  }
}
