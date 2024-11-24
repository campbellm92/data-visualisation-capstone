//
//  IFQ717 Web Development Capstone
//
//  Graphs.jsx - Sample display of current graphing modules by Gary Cazzulino
//
//

import GraphSet from "../charts/GraphSet";
import { useLocalisData } from "../../api/hooks/useLocalisData";
import DateScroller from "../ui/DateScroller";
import { useState } from "react";
import Checkbox from "../ui/Checkbox";
import { kOriginDate, kDefaultResponse } from "../../api/utils/constants";
import LoadingSpinner from "../ui/LoadingSpinner";
import { ButtonMediumFullWide } from "../ui/Buttons";
import AIAnalysis from "./AIAnalysis";
import LLMResponse from "./LLMResponse";
import { generatePDFFrom } from "../../api/utils/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const kGraphWidth = "100%";

export default function Graphs() {
  const useRechart = true;
  const [windowDays, setWindowDays] = useState(365);
  // const [dateOffset, setDateOffset] = useState(0);

  const [startDate, setStartDate] = useState(kOriginDate);
  const { loading, dataSet, error } = useLocalisData(startDate, windowDays);

  const [llmResponse, setllmResponse] = useState('');

  const [goldCoastSelected, setGoldCoastSelected] = useState(true);
  const [noosaSelected, setNoosaSelected] = useState(true);
  const [whitsundaySelected, setWhitsundaySelected] = useState(true);
  const [cairnsSelected, setCairnsSelected] = useState(true);

  const [dailyRateSelected, setDailyRateSelected] = useState(true);
  const [lengthOfStaySelected, setLengthOfStaySelected] = useState(false);
  const [occupancySelected, setOccupancySelected] = useState(false);
  const [bookingWindowSelected, setBookingWindowSelected] = useState(false);
  const [aiAnalysisSelected, setAiAnalysisSelected] = useState(false);

  const LGAs = new Array();

  if (goldCoastSelected) LGAs.push("Gold Coast");
  if (noosaSelected) LGAs.push("Noosa");
  if (whitsundaySelected) LGAs.push("Whitsunday");
  if (cairnsSelected) LGAs.push("Cairns");

  return (
    <div className="mx-auto p-4">
      {/*     <div className="container mx-auto p-4 box-drop-shadow"> */}

      <div className="grid md:grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        <div className="p-4 lg:col-span-5 xl:col-span-2 max-w-96 md:min-w-52">
          <div className="shadow-md text-primary-content font-light bg-base-300 mb-4 border-1 rounded p-1">
            <div className="label">
              <span className="font-bold text-primary-content">Date Scroller</span>
            </div>
            <div className="drop-shadow mt-2">
              <div className="p-1">
                <DateScroller
                  startDate={startDate}
                  setStartDate={setStartDate}
                  windowDays={windowDays}
                  setWindowDays={setWindowDays}
                />
              </div>
            </div>
          </div>
          <div className="shadow-md border-1 rounded bg-base-300 mb-3 p-3 md:min-w-44">
            <div className="label">
              <span className="font-bold text-primary-content">Select LGAs</span>
            </div>
            <Checkbox
              label="Gold Coast"
              value={goldCoastSelected}
              setValue={setGoldCoastSelected}
            />
            <Checkbox
              label="Noosa"
              value={noosaSelected}
              setValue={setNoosaSelected}
            />
            <Checkbox
              label="Whitsunday"
              value={whitsundaySelected}
              setValue={setWhitsundaySelected}
            />
            <Checkbox
              label="Cairns"
              value={cairnsSelected}
              setValue={setCairnsSelected}
            />
          </div>

          {!loading && !error && dataSet ? (
            <div>
              <AIAnalysis
                dataSet={dataSet
                  .filter((sample) => LGAs.includes(sample.lga_name))
                  .map((sample) => {
                    const retSample = {
                      sample_date: sample.sample_date,
                      lga_name: sample.lga_name,
                    };

                    if (dailyRateSelected)
                      retSample.average_daily_rate = sample.average_daily_rate;
                    if (occupancySelected)
                      retSample.average_historical_occupancy =
                        sample.average_historical_occupancy;
                    if (lengthOfStaySelected)
                      retSample.average_length_of_stay =
                        sample.average_length_of_stay;
                    if (bookingWindowSelected)
                      retSample.average_booking_window =
                        sample.average_booking_window;

                    return retSample;
                  })}
                llmResponse={llmResponse}
                setllmResponse={setllmResponse}
                setAiAnalysisSelected={setAiAnalysisSelected}
              />
              <div className="mb-6"></div>
              <ButtonMediumFullWide
                id="report-button"
                onClick={(e) => {
                  generatePDFFrom(['llm-response', 'daily-rate', 'length-of-stay', 'average-occupancy', 'average-booking-window'],
                    'LocalisDataAnalysisReport.pdf',
                    true);
                  return false;
                }}
                disabled={false}
                textColor={"text-secondary-content"}
              >
                Download Report
              </ButtonMediumFullWide>
            </div>
          ) : null}
        </div>
        <div className="p-4 lg:col-span-7 xl:col-span-10 sm:ml-0 md:ml-4">
          <div className="label">
            <span className="font-bold text-primary-content">Select Metrics</span>
          </div>
          <div className="grid grid-cols-5 gap-4 mb-4 shadow-md border-1 rounded bg-base-300">
            <div className="p-1">
              <Checkbox
                label="Daily Rate"
                value={dailyRateSelected}
                setValue={setDailyRateSelected}
              />
            </div>
            <div className="p-1">
              <Checkbox
                label="Occupancy"
                value={occupancySelected}
                setValue={setOccupancySelected}
              />
            </div>
            <div className="p-1">
              <Checkbox
                label="Length of Stay"
                value={lengthOfStaySelected}
                setValue={setLengthOfStaySelected}
              />
            </div>
            <div className="p-1">
              <Checkbox
                label="Booking Window"
                value={bookingWindowSelected}
                setValue={setBookingWindowSelected}
              />
            </div>
            { llmResponse !== '' ? 
            <div className="p-1">
              <Checkbox
                label="AI Analysis"
                value={aiAnalysisSelected}
                setValue={setAiAnalysisSelected}
              />
            </div> : null }
          </div>

          {!loading && !error && dataSet ? (
            <div id="report-container" className="h-[80vh] pr-3">
              {llmResponse !== '' && aiAnalysisSelected ?
                <div>
                  {/*<div className="h-[325px] shadow-md border-1 rounded mb-3 p-1 bg-base-300">
                    <LLMResponse content={llmResponse} ></LLMResponse>
                  </div>*/}
                  <div id="llm-response" className="shadow-md border-1 rounded mb-3 p-1 bg-base-300">
                    <LLMResponse content={llmResponse} ></LLMResponse>
                  </div>
                </div>
                : null}
              {dailyRateSelected ? (
                <GraphSet
                  id="daily-rate"
                  useRechart={useRechart}
                  title="Average Daily Rate ($)"
                  avgTitle="LGA Comparison"
                  field={"average_daily_rate"}
                  dataSet={dataSet}
                  LGAs={LGAs}
                  scale={1.0}
                />
              ) : null}
              {lengthOfStaySelected ? (
                <GraphSet
                  id="length-of-stay"
                  useRechart={useRechart}
                  title="Average Length of Stay (days)"
                  avgTitle="LGA Comparison"
                  field={"average_length_of_stay"}
                  dataSet={dataSet}
                  LGAs={LGAs}
                  scale={1.0}
                />
              ) : null}
              {occupancySelected ? (
                <GraphSet
                  id="average-occupancy"
                  useRechart={useRechart}
                  title="Average Historical Occupancy (%)"
                  avgTitle="LGA Comparison"
                  field={"average_historical_occupancy"}
                  dataSet={dataSet}
                  LGAs={LGAs}
                  scale={100.0}
                />
              ) : null}
              {bookingWindowSelected ? (
                <GraphSet
                  id="average-booking-window"
                  useRechart={useRechart}
                  title="Average Booking Window (days)"
                  avgTitle="LGA Comparison"
                  field={"average_booking_window"}
                  dataSet={dataSet}
                  LGAs={LGAs}
                  scale={1.0}
                />
              ) : null}
            </div>
          ) : !error ? (
            <div>
              <div
                className="box-drop-shadow"
                style={{ height: 400, width: kGraphWidth }}
              >
                <LoadingSpinner />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
