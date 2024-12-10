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
  setSelectedDateRange,
  LGAs,
  scale,
}) {

  const { width } = useWindowWidthResize();

  let graphWidth = (width > 1024 ? /*"100%"*/ width * 0.6 : width * (width > 640 ? 0.65 : 0.65));
  let averagesWidth = (width > 900 ? width * 0.15 /*"100%"*/ : width * 0.8);
  const kGraphHeight = 350;
  const kGraphBreakPoint = 900;

  return (
    <div key={field} id={id} className="grid sm:grid-cols-1 md:grid-cols-5 md:gap-4 mb-4 rounded-md md:p-4 bg-base-300 shadow-md">
      <div className="sm:col-span-1 md:col-span-4">
        <div className="" style={{ height: kGraphHeight, width: graphWidth }}>
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
            setSelectedDateRange={setSelectedDateRange}
            LGAs={LGAs}
          />
        </div>
        { width <= kGraphBreakPoint ?
        <div className="mb-10" style={{ height: kGraphHeight, width: averagesWidth }}>
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
        { width > kGraphBreakPoint ?
        <div className="mb-10" style={{ height: kGraphHeight, width: averagesWidth }}>
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
