//
//  IFQ717 Web Development Capstone
//
//  GraphSet.jsx - Container for a comb ined detail and average graph by Gary Cazzulino
//
//

import GraphDetails from "../charts/GraphDetails";
import GraphAverages from "../charts/GraphAverages";
import GraphAreaUnderCurve from "../charts/GraphAreaUnderCurve";
import { useWindowWidthResize } from "../../api/hooks/useWindowWidthResize";
const kGraphWidth = "100%";
const kGraphHeight = 350;

export default function GraphSet({
  id,
  useRechart,
  title,
  avgTitle,
  field,
  dataSet,
  startDate,
  setStartDate,
  windowDays,
  setWindowDays,
  totalDateRange,
  LGAs,
  scale,
}) {

  const { width } = useWindowWidthResize();

  return (
    <div id={id} className="grid sm:grid-cols-1 md:grid-cols-5 gap-4 mb-4 rounded-md p-4 bg-base-300 shadow-md">
      <div className="sm:col-span-1 md:col-span-4">
        <div className="" style={{ height: kGraphHeight, width: kGraphWidth }}>
          <GraphDetails
            useRechart={useRechart}
            title={title /*"Average Historical Occupancy (%)"*/}
            field={field /*"average_historical_occupancy"*/}
            scale={scale}
            dataSet={dataSet}
            startDate={startDate}
            setStartDate={setStartDate}
            windowDays={windowDays}
            setWindowDays={setWindowDays}
            totalDateRange={totalDateRange}
            LGAs={LGAs}
          />
        </div>
        { width <= 768 ?
        <div className="" style={{ height: kGraphHeight, width: kGraphWidth }}>
          <br></br>
          {/*GraphAreaUnderCurve*/}
          <GraphAverages
            useRechart={useRechart}
            title={avgTitle /*"Average % Occupancy"*/}
            scale={scale}
            field={field /*"average_historical_occupancy"*/}
            dataSet={dataSet}
            LGAs={LGAs}
          />
        </div> : null }
      </div>
      <div className="sm:col-span-1 md:col-span-1">
        { width > 768 ?
        <div className="" style={{ height: kGraphHeight, width: kGraphWidth }}>
          {/*GraphAreaUnderCurve*/}
          <GraphAverages
            useRechart={useRechart}
            title={avgTitle /*"Average % Occupancy"*/}
            scale={scale}
            field={field /*"average_historical_occupancy"*/}
            dataSet={dataSet}
            LGAs={LGAs}
          />
        </div> : null }
      </div>
    </div>
  );
}
