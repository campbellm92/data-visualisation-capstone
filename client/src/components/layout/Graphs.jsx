// 
//  IFQ717 Web Development Capstone
//
//  Graphs.jsx - Sample display of current graphing modules
//
//

//import GraphDetailsRechart from './GraphDetailsRechart';

import GraphDetails from '../charts/GraphDetails';
import GraphAverages from '../charts/GraphAverages';
import { useLocalisData } from "../../api/hooks/useLocalisData";
import CanvasCoordinates from '../ui/CanvasCoordinates';
import { useState } from 'react';
import { NumberSliderMedium } from '../ui/Sliders';
import { kOriginDate } from '../../utils/constants';
import LoadingSpinner from '../ui/LoadingSpinner';
import Map from '../ui/Map';

const kGraphWidth = '100%';

export default function Graphs() {

  const useRechart = false;
  const [windowDays, setWindowDays] = useState(28);
  // const [dateOffset, setDateOffset] = useState(0);

  const [startDate, setStartDate] = useState(kOriginDate);
  const { loading, dataSet, error } = useLocalisData(startDate, windowDays);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4">
          <div className="chart" style={{ width: 400 }}>Data Scroller
            {<CanvasCoordinates startDate={startDate}
              setStartDate={setStartDate}
              windowDays={windowDays}
              setWindowDays={setWindowDays} />}
            <br></br>
            Start Date: {startDate}<br></br><br></br>
            {/*<DateSliderMedium originDate={kOriginDate} min={1} max={100} title="Start Date" value={startDate} setValue={setStartDate} />*/}
            <NumberSliderMedium min={1} max={365} title="Day Window" value={windowDays} setValue={setWindowDays} />
          </div>
          <div className="p-4">

            <Map location="Noosa" />
            {/*<Map location="Cairns"/>
        <Map location="Gold Coast"/>
        <Map location="Whitsundays"/>*/}
          </div>
        </div>

        {!loading && !error && dataSet ? (
          <div className="p-4">
            <div className="chart" style={{ height: 400, width: kGraphWidth }}>
              <GraphDetails useRechart={useRechart} title='Average Daily Rate ($)' field='average_daily_rate' scale={1.0} dataSet={dataSet} />
            </div>
            <div className="chart" style={{ height: 400, width: kGraphWidth }}>
              <GraphDetails useRechart={useRechart} title='Average Length of Stay (days)' field='average_length_of_stay' scale={1.0} dataSet={dataSet} />
            </div>
            <div className="chart" style={{ height: 400, width: kGraphWidth }}>
              <GraphDetails useRechart={useRechart} title='Average Historical Occupancy (%)' field='average_historical_occupancy' scale={100.0} dataSet={dataSet} />
            </div>
            <div className="chart" style={{ height: 400, width: kGraphWidth }}>
              <GraphDetails useRechart={useRechart} title='Average Booking Window (days)' field='average_booking_window' scale={1.0} dataSet={dataSet} />
            </div>
            <div className="chart" style={{ height: 400, width: kGraphWidth }}>
              <GraphAverages useRechart={useRechart} title='Average % Occupancy' scale={100.0} field="average_historical_occupancy" dataSet={dataSet} />
            </div>
            <div className="chart" style={{ height: 400, width: kGraphWidth }}>
              <GraphAverages useRechart={useRechart} title='Average Daily Rate' scale={1.0} field="average_daily_rate" dataSet={dataSet} />
            </div>
          </div>)
          : !error ?
            <div><div className="chart" style={{ height: 400, width: kGraphWidth }}><LoadingSpinner /></div></div> : null}
      </div>
    </div>
  );
}