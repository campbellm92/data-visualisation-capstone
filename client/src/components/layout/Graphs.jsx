//
//  IFQ717 Web Development Capstone
//
//  Graphs.jsx - Sample display of current graphing modules by Gary Cazzulino
//
//

import GraphDetails from "../charts/GraphDetails";
import GraphAverages from "../charts/GraphAverages";
import GraphSet from "../charts/GraphSet";
import { useLocalisData } from "../../api/hooks/useLocalisData";
import DateScroller from "../ui/DateScroller";
import { useState } from "react";
import { NumberSliderMedium } from "../ui/Sliders";
import Checkbox from "../ui/Checkbox";
import { kOriginDate } from "../../api/utils/constants";
import LoadingSpinner from "../ui/LoadingSpinner";
import { ButtonOutlineFullWide } from "../ui/Buttons";
import AnalyseModal from "./AnalyseModal";
import Map from "../ui/Map";

const kGraphWidth = "100%";
const kGraphHeight = 350;

export default function Graphs() {
  const useRechart = true;
  const [windowDays, setWindowDays] = useState(365);
  // const [dateOffset, setDateOffset] = useState(0);

  const [startDate, setStartDate] = useState(kOriginDate);
  const { loading, dataSet, error } = useLocalisData(startDate, windowDays);

  const [goldCoastSelected, setGoldCoastSelected] = useState(true);
  const [noosaSelected, setNoosaSelected] = useState(true);
  const [whitsundaySelected, setWhitsundaySelected] = useState(true);
  const [cairnsSelected, setCairnsSelected] = useState(true);

  const [dailyRateSelected, setDailyRateSelected] = useState(true);
  const [lengthOfStaySelected, setLengthOfStaySelected] = useState(false);
  const [occupancySelected, setOccupancySelected] = useState(false);
  const [bookingWindowSelected, setBookingWindowSelected] = useState(false);

  const LGAs = new Array();

  if (goldCoastSelected) LGAs.push("Gold Coast");
  if (noosaSelected) LGAs.push("Noosa");
  if (whitsundaySelected) LGAs.push("Whitsunday");
  if (cairnsSelected) LGAs.push("Cairns");


  return (
          <div className="mx-auto p-4">
            {/*     <div className="container mx-auto p-4 drop-shadow"> */}

      <div className="grid md:grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        <div className="p-4 col-span-2">
          <div className="drop-shadow" >
            <div className="text-primary-content">
              Date Scroller: {startDate}
              <NumberSliderMedium
                min={1}
                max={365}
                title="Day Window"
                value={windowDays}
                setValue={setWindowDays}
              />
              {
                <DateScroller
                  startDate={startDate}
                  setStartDate={setStartDate}
                  windowDays={windowDays}
                  setWindowDays={setWindowDays}
                />
              }
              {/*<br></br>
            Start Date: {startDate}
            <br></br>
            <br></br>
            {/*<DateSliderMedium originDate={kOriginDate} min={1} max={100} title="Start Date" value={startDate} setValue={setStartDate} />* /}
            <NumberSliderMedium
              min={1}
              max={365}
              title="Day Window"
              value={windowDays}
              setValue={setWindowDays}
            />*/}
            </div>
            {/*<div className="p-4">
            <Map location="Noosa" />
            {/*<Map location="Cairns"/>
        <Map location="Gold Coast"/>
        <Map location="Whitsundays"/>* /}
          </div>*/}
            <div>
              <br></br>
              <Checkbox label="Gold Coast" value={goldCoastSelected} setValue={setGoldCoastSelected} />
              <Checkbox label="Noosa" value={noosaSelected} setValue={setNoosaSelected} />
              <Checkbox label="Whitsunday" value={whitsundaySelected} setValue={setWhitsundaySelected} />
              <Checkbox label="Cairns" value={cairnsSelected} setValue={setCairnsSelected} />
            </div>
          </div>
          {!loading && !error && dataSet ? (
            <div>
              <AnalyseModal dataSet={dataSet.filter(sample => LGAs.includes(sample.lga_name))
                .map(sample => {

                  const retSample = {
                    sample_date: sample.sample_date,
                    lga_name: sample.lga_name
                  }

                  if (dailyRateSelected) retSample.average_daily_rate = sample.average_daily_rate;
                  if (occupancySelected) retSample.average_historical_occupancy = sample.average_historical_occupancy;
                  if (lengthOfStaySelected) retSample.average_length_of_stay = sample.average_length_of_stay;
                  if (bookingWindowSelected) retSample.average_booking_window = sample.average_booking_window;

                  return retSample;
                })} />
              <ButtonOutlineFullWide children="Analyse" onClick={() => {
                document.getElementById("analyse_modal").showModal();
              }} /> 
              </div>) : null }
        </div>
        <div className="p-4 col-span-10">
          <div className="grid grid-cols-5 gap-4 mb-4 drop-shadow">
            <div className="p-1">
              <Checkbox label="Daily Rate" value={dailyRateSelected} setValue={setDailyRateSelected} />
            </div>
            <div className="p-1">
              <Checkbox label="Occupancy" value={occupancySelected} setValue={setOccupancySelected} />
            </div>
            <div className="p-1">
              <Checkbox label="Length of Stay" value={lengthOfStaySelected} setValue={setLengthOfStaySelected} />
            </div>
            <div className="p-1">
              <Checkbox label="Booking Window" value={bookingWindowSelected} setValue={setBookingWindowSelected} />
            </div>

          </div>

          {!loading && !error && dataSet ? (
            <div className="h-[80vh] overflow-scroll pr-3">
              {dailyRateSelected ? <GraphSet useRechart={useRechart} title="Average Daily Rate ($)" avgTitle="LGA Comparison" field={"average_daily_rate"} dataSet={dataSet} LGAs={LGAs} scale={1.0} />
                : null}
              {lengthOfStaySelected ? <GraphSet useRechart={useRechart} title="Average Length of Stay (days)" avgTitle="LGA Comparison" field={"average_length_of_stay"} dataSet={dataSet} LGAs={LGAs} scale={1.0} />
                : null}
              {occupancySelected ? <GraphSet useRechart={useRechart} title="Average Historical Occupancy (%)" avgTitle="LGA Comparison" field={"average_historical_occupancy"} dataSet={dataSet} LGAs={LGAs} scale={100.0} />
                : null}
              {bookingWindowSelected ? <GraphSet useRechart={useRechart} title="Average Booking Window (days)" avgTitle="LGA Comparison" field={"average_booking_window"} dataSet={dataSet} LGAs={LGAs} scale={1.0} />
                : null}
            </div>
          ) : !error ? (
            <div>
              <div className="drop-shadow" style={{ height: 400, width: kGraphWidth }}>
                <LoadingSpinner />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
