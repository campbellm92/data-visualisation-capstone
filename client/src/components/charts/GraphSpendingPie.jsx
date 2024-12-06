//
//  IFQ717 Web Development Capstone
//
//  GraphSpendPie.js - Graphs selected spend data for an single LGA by Gary Cazzulino
//
//

import { AgCharts } from "ag-charts-react";
import { kGraphLineStyle, kGraphColours, kGraphSpendColours } from "../../api/utils/constants";
import { average, convertToLabel, toTitleCase } from "../../api/utils/utils";
import {
  /*BarChart,
  Bar,
  XAxis,
  YAxis,*/
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GraphSpendingPie({
  dataSet,
  title,
  selectedCats,
  field,
  scale,
  useRechart,
  LGAs,
}) {
  
  if (useRechart) {
    const data = selectedCats.map((cat) => {return (   
      {
        "category" : cat,
        "average" : average(
          dataSet
            .filter((sample) => toTitleCase(sample.category) === cat)
            .map((sample) => {
              return parseFloat(sample[field]) * scale;
            })
        ),
      })});
    
    return (
      <div style={{ width: "100%", height: "90%" }}>
        <ResponsiveContainer>
          <h2
            className="text-primary-content font-light pb-3"
            style={{ textAlign: "center" }}
          >
            {title}
          </h2>
          <PieChart width={730} height={250}>
            {/*}
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
            <YAxis />*/}
            <Tooltip />
            {selectedCats.length <= 4 ? <Legend /> : null}
            <Pie data={data} nameKey="category" dataKey="average" >
              {data.map((entry, index) => (
                entry !== null ?
                  <Cell key={`cell-${entry.lga}`} fill={kGraphSpendColours[entry.category.toUpperCase()]} /> : null
              ))}
            </Pie>
          </PieChart>
          {/*LGAs.map((LGA) => {
              return (
                <Bar
                  type="monotone"
                  name={LGA}
                  dataKey={convertToLabel(LGA) + "_average"}
                  stroke={kGraphColours[LGA]}
                  fill={kGraphColours[LGA]}
                  dot={false}
                  isAnimationActive={false}
                />
              );
            })}
          </BarChart></div>*/}
        </ResponsiveContainer>
      </div>
    );
  } else {
    return <AgCharts options={options} />;
  }
}
