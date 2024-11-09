//
//  IFQ717 Web Development Capstone
//
//  GraphSet.jsx - Container for a comb ined detail and average graph by Gary Cazzulino
//
//

import GraphDetails from "../charts/GraphDetails";
import GraphAverages from "../charts/GraphAverages";
const kGraphWidth = "100%";
const kGraphHeight = 350;

export default function GraphSet({
  useRechart,
  title,
  avgTitle,
  field,
  dataSet,
  LGAs,
  scale,
}) {
  return (
    <div className="grid grid-cols-5 gap-4 mb-4 rounded-md p-4 bg-base-300 shadow-md">
      <div className="col-span-4">
        <div className="" style={{ height: kGraphHeight, width: kGraphWidth }}>
          <GraphDetails
            useRechart={useRechart}
            title={title /*"Average Historical Occupancy (%)"*/}
            field={field /*"average_historical_occupancy"*/}
            scale={scale}
            dataSet={dataSet}
            LGAs={LGAs}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="" style={{ height: kGraphHeight, width: kGraphWidth }}>
          <GraphAverages
            useRechart={useRechart}
            title={avgTitle /*"Average % Occupancy"*/}
            scale={scale}
            field={field /*"average_historical_occupancy"*/}
            dataSet={dataSet}
            LGAs={LGAs}
          />
        </div>
      </div>
    </div>
  );
}
