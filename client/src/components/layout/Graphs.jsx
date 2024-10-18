// 
//  IFQ715 Web Development Pratice Assignment 2 By Gary Cazzulino
//
//  RankingsChart.js - graph on Rankings page
//
//

import BookingWindowChart from './BookingWindowChart';
import DailyRateChart from './DailyRateChart';
import OccupancyChart from './OccupancyChart';
import LengthOfStayChart from './LengthOfStayChart';
import { useLocalisDataOccupancy } from "../../api";
//import CanvasCoordinates from '../ui/CanvasCoordinates';
import { useState } from 'react';
import { NumberSliderMedium, DateSliderMedium } from '../ui/Sliders';
import { kOriginDate } from '../../constants';

const kGraphWidth = 1500;

function daySliderChange(e) {
  console.log("hello");
}

function daySliderChange2(e) {
  console.log("hello2");
}

export default function Graphs() {

  const [windowDays, setWindowDays] = useState(7);
 // const [dateOffset, setDateOffset] = useState(0);

  const [startDate, setStartDate] = useState(kOriginDate);

  const { loading, occupancy, error } = useLocalisDataOccupancy(startDate, windowDays);

  return (
    <div className="chart" style={{ padding: 50, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div className="chart" style={{ width: "80%" }}>
      { /* <CanvasCoordinates startDate={startDate}
          setStartDate={setStartDate}
          windowDays={windowDays}
          setWindowDays={setWindowDays} />}
        <div> 
          {/*<DateSliderMedium originDate={kOriginDate} min={1} max={100} title="Start Date" value={startDate} setValue={setStartDate} />
        </div>*/}
        <div> 
          <NumberSliderMedium min={1} max={365} title="Day Window" value={windowDays} setValue={setWindowDays} />
        </div>
      </div>

      <div style={{ width: kGraphWidth }}>
        {!loading && !error && occupancy ? (
          <span>

            <div
              className="chart"
              style={{ height: 400 }}
            >
              {
                <OccupancyChart occupancy={occupancy} />
              }
            </div>
          </span>) : !error ?
          "Spinner" : null
        }
      </div>
      <div style={{ width: kGraphWidth }}>
        {!loading && !error && occupancy ? (
          <span>

            <div
              className="chart"
              style={{ height: 400 }}
            >
              {
                <DailyRateChart occupancy={occupancy} />
              }
            </div>
          </span>) : !error ?
          "Spinner" : null
        }
      </div>
      <div style={{ width: kGraphWidth }}>
        {!loading && !error && occupancy ? (
          <span>
            <div
              className="chart"
              style={{ height: 400 }}
            >
              {
                <BookingWindowChart occupancy={occupancy} />
              }
            </div>
          </span>) : !error ?
          "Spinner" : null
        }
      </div>
      <div style={{ width: kGraphWidth }}>
        {!loading && !error && occupancy ? (
          <span>

            <div
              className="chart"
              style={{ height: 400 }}
            >
              {
                <LengthOfStayChart occupancy={occupancy} />
              }
            </div>
          </span>) : !error ?
          "Spinner" : null
        }
      </div>
    </div>
  );
}