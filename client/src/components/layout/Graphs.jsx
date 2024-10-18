// 
//  IFQ717 Web Development Capstone
//
//  Graphs.jsx - Sample display of current graphing modules
//
//

import BookingWindowChart from './BookingWindowChart';
import DailyRateChart from './DailyRateChart';
import OccupancyChart from './OccupancyChart';
import LengthOfStayChart from './LengthOfStayChart';
import { useLocalisDataOccupancy } from "../../api";
import CanvasCoordinates from '../ui/CanvasCoordinates';
import { useState } from 'react';
import { NumberSliderMedium, DateSliderMedium } from '../ui/Sliders';
import { kOriginDate } from '../../constants';
import DataAverages from './DataAverages';

const kGraphWidth = 1200;

export default function Graphs() {

  const [windowDays, setWindowDays] = useState(7);
  // const [dateOffset, setDateOffset] = useState(0);

  const [startDate, setStartDate] = useState(kOriginDate);
  const { loading, occupancy, error } = useLocalisDataOccupancy(startDate, windowDays);

  return (
    <div className="" style={{ padding: 0, display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}>

      <div className="chart" style={{ width: 400 }}>Data Scroller (experimental)
        {<CanvasCoordinates startDate={startDate}
          setStartDate={setStartDate}
          windowDays={windowDays}
          setWindowDays={setWindowDays} />}
        <div className="chart">
          Start Date: {startDate}<br></br><br></br>
          {/*<DateSliderMedium originDate={kOriginDate} min={1} max={100} title="Start Date" value={startDate} setValue={setStartDate} />*/}
          <NumberSliderMedium min={1} max={365} title="Day Window" value={windowDays} setValue={setWindowDays} />
        </div>
      </div>

      {!loading && !error && occupancy ? (
        <div>
          <div className="chart" style={{ height: 400, width: kGraphWidth }}>
            <OccupancyChart occupancy={occupancy} />
          </div>
          <div className="chart" style={{ height: 400, width: kGraphWidth }}>
            <LengthOfStayChart occupancy={occupancy} />
          </div>
          <div className="chart" style={{ height: 400, width: kGraphWidth }}>
            <DailyRateChart occupancy={occupancy} />
          </div>
          <div className="chart" style={{ height: 400, width: kGraphWidth }}>
            <BookingWindowChart occupancy={occupancy} />
          </div>
          <div className="chart" style={{ height: 400, width: '40%' }}>
            <DataAverages title='Average % Occupancy' scale={100.0} field="average_historical_occupancy" occupancy={occupancy} />
          </div>
          <div className="chart" style={{ height: 400, width: '40%' }}>
            <DataAverages title='Average Daily Rate' scale={1.0} field="average_daily_rate" occupancy={occupancy} />
          </div>
        </div>)
        : !error ?
          "Spinner" : null}
    </div>
  );
}