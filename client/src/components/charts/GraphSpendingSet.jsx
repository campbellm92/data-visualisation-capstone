//
//  IFQ717 Web Development Capstone
//
//  GraphSet.jsx - Container for a comb ined detail and average graph by Gary Cazzulino
//
//

import GraphDetails from "./GraphDetails";
import GraphAverages from "./GraphAverages";
import GraphSpendingPie from "./GraphSpendingPie";
import GraphSpendingBar from "./GraphSpendingBar";
import GraphAreaUnderCurve from "./GraphAreaUnderCurve";
import { useWindowWidthResize } from "../../api/hooks/useWindowWidthResize";
const kGraphWidth = "100%";
const kGraphHeight = 350;

export default function GraphSpendingSet({
  id,
  useRechart,
  title,
  selectedCats,
  avgTitle,
  field,
  dataSet,
  LGAs,
  scale,
}) {

  const { width } = useWindowWidthResize();

  return (
    <div key={id} id={id} className="grid sm:grid-cols-1 md:grid-cols-4 gap-4 mb-4 rounded-md p-4 bg-base-300 shadow-md">
      {LGAs.includes('Gold Coast') ?
        <div key={"Gold Coast"} className="sm:col-span-1">
          <div className="" style={{ height: kGraphHeight, width: kGraphWidth }}>
            <GraphSpendingPie
              useRechart={useRechart}
              title={`${title} Gold Coast`}
              selectedCats={selectedCats}
              field={field}
              scale={scale}
              dataSet={dataSet.filter(sample => sample.lga_name === 'Gold Coast')}
              LGAs={['Gold Coast']}
            />
          </div>
        </div> : null}
      {LGAs.includes('Noosa') ?
        <div key={"Noosa"} className="sm:col-span-1">
          <div className="" style={{ height: kGraphHeight, width: kGraphWidth }}>
            <GraphSpendingPie
              useRechart={useRechart}
              title={`${title} Noosa`}
              selectedCats={selectedCats}
              field={field /*"average_historical_occupancy"*/}
              scale={scale}
              dataSet={dataSet.filter(sample => sample.lga_name === 'Noosa')}
              LGAs={['Noosa']}
            />
          </div>
        </div> : null
      }
      {LGAs.includes('Whitsunday') ?
        <div key={"Whitsunday"} className="sm:col-span-1">
          <div className="" style={{ height: kGraphHeight, width: kGraphWidth }}>
            <GraphSpendingPie
              useRechart={useRechart}
              title={`${title} Whitsunday`}
              selectedCats={selectedCats}
              field={field /*"average_historical_occupancy"*/}
              scale={scale}
              dataSet={dataSet.filter(sample => sample.lga_name === 'Whitsundays')}
              LGAs={['Whitsunday']}
            />
          </div>
        </div> : null}
      {LGAs.includes('Cairns') ?
        <div key={"Cairns"} className="sm:col-span-1">
          <div className="" style={{ height: kGraphHeight, width: kGraphWidth }}>
            <GraphSpendingPie
              useRechart={useRechart}
              title={`${title} Cairns`}
              selectedCats={selectedCats}
              field={field /*"average_historical_occupancy"*/}
              scale={scale}
              dataSet={dataSet.filter(sample => sample.lga_name === 'Cairns')}
              LGAs={['Cairns']}
            />
          </div>
        </div> : null}
    </div>
  );
}
