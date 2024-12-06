//
//  IFQ717 Web Development Capstone
//
//  Graphs.jsx - Sample display of current graphing modules by Gary Cazzulino
//
//

import GraphSet from "../charts/GraphSet";
import GraphSpendingSet from "../charts/GraphSpendingSet";
import { useLocalisData } from "../../api/hooks/useLocalisData";
import { useLocalisSpendingData } from "../../api/hooks/useLocalisSpendData.jsx";
import { useState } from "react";
import Checkbox from "../ui/Checkbox";
import { kOriginDate, kDefaultResponse } from "../../api/utils/constants";
import LoadingSpinner from "../ui/LoadingSpinner";
import { ButtonMediumFullWide, ButtonDownloadReport, ButtonMedium } from "../ui/Buttons";
import AIAnalysis from "./AIAnalysis";
import LLMResponse from "./LLMResponse";
import { addDaysToDate, generatePDFFrom } from "../../api/utils/utils";
import { useWindowWidthResize } from "../../api/hooks/useWindowWidthResize";
import SpendCats from "../../components/ui/SpendCats.jsx";
import { useLocalisSpendCategories } from "../../api/hooks/useLocalisSpendCategories";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";
import DatePicker from "../ui/DatePicker.jsx";

const kGraphWidth = "100%";

export default function Graphs() {
  const useRechart = true;
  const [windowDays, setWindowDays] = useState(90);
  // const [dateOffset, setDateOffset] = useState(0);

  const [startDate, setStartDate] = useState(kOriginDate);
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: startDate, endDate: addDaysToDate(startDate, windowDays) });
  const { loading, dataSet, error, totalDateRange } = useLocalisData(selectedDateRange.startDate, selectedDateRange.endDate);
  const { spendingDataLoading, spendingDataSet, spendingDataError } = useLocalisSpendingData(selectedDateRange.startDate, selectedDateRange.endDate);

  const { spendCatsLoading, spendCats, spendCatsError } = useLocalisSpendCategories();
  const [selectedCats, setSelectedCats] = useState(["Airlines/Air Carriers", "Automotive", "Bars/Taverns/Lounges/Discos"]);

  const [llmResponse, setllmResponse] = useState('');

  const [goldCoastSelected, setGoldCoastSelected] = useState(true);
  const [noosaSelected, setNoosaSelected] = useState(true);
  const [whitsundaySelected, setWhitsundaySelected] = useState(true);
  const [cairnsSelected, setCairnsSelected] = useState(true);

  const [dailyRateSelected, setDailyRateSelected] = useState(true);
  const [lengthOfStaySelected, setLengthOfStaySelected] = useState(false);
  const [occupancySelected, setOccupancySelected] = useState(false);
  const [bookingWindowSelected, setBookingWindowSelected] = useState(false);
  const [spendingDataSelected, setSpendingDataSelected] = useState(true);
  const [aiAnalysisSelected, setAiAnalysisSelected] = useState(false);

  const { width } = useWindowWidthResize();

  const LGAs = new Array();

  const fullConfig = resolveConfig(tailwindConfig);

  const smSplit = parseInt(fullConfig.theme.screens.sm, 10);
  const mdSplit = parseInt(fullConfig.theme.screens.md, 10);
  const lgSplit = parseInt(fullConfig.theme.screens.lg, 10);
  const xlSplit = parseInt(fullConfig.theme.screens.xl, 10);

  function toggleCat(cat) {
    //console.table(cat);
    setSelectedCats((prevSelectedCats) => {
      return prevSelectedCats.includes(cat)
        ? prevSelectedCats.filter((c) => c !== cat)
        : [...prevSelectedCats, cat];
    });
  };

  function setOpenDetails(idToOpen) {
    console.log(idToOpen);
    const detailsElements = document.querySelectorAll("details");

    detailsElements.forEach((details) => {
      console.log(details.id);
      if (details.id === idToOpen) {
        //details.open = true;
      } else {
        details.open = false;
      }
    });
  }

  if (goldCoastSelected) LGAs.push("Gold Coast");
  if (noosaSelected) LGAs.push("Noosa");
  if (whitsundaySelected) LGAs.push("Whitsunday");
  if (cairnsSelected) LGAs.push("Cairns");

  return (
    <div>
      <div className="mx-auto p-4">

        <h1 className="font-light lg:p-3 text-xl sm:text-2xl lg:text-3xl text-primary-content mb-4 lg:mb-0 pb-4">Data Analyst</h1>

        <div className="grid md:grid-cols-1 opacity-95 gap-0 mb-4 items-start lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_50px]">
          <div className="shadow-md border-1 text-primary-content rounded bg-base-300 m-1 p-3 md:min-w-44 z-20">

            <div className="">
              {/*<DateScroller
                    startDate={startDate}
                    setStartDate={setStartDate}
                    windowDays={windowDays}
                    setWindowDays={setWindowDays}
                  />*/}
              <details id="DateSelector" onClick={() => { setOpenDetails("DateSelector") }}><summary className="">Date Range</summary>
                <div className="mt-2">
                  <DatePicker value={selectedDateRange}
                    setSelectedDateRange={setSelectedDateRange} />
                </div>
                {width > mdSplit && width < lgSplit ? <div className="h-[450px]"> </div> : null}
                {width < mdSplit ? <div className="h-[850px]"> </div> : null}
              </details>
            </div>

          </div>
          <div className="shadow-md opacity-95 border-1 rounded bg-base-300 m-1 p-3 md:min-w-44 z-20">
            <details id="LGASelector" onClick={() => setOpenDetails("LGASelector")}>
              <summary className="text-primary-content">LGAs</summary>
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
            </details>
          </div>

          <div className="shadow-md border-1 opacity-95 rounded bg-base-300 m-1 p-3 md:min-w-44 z-20">
            <details id="MetricSelector" onClick={() => setOpenDetails("MetricSelector")}>
              <summary className="text-primary-content">Metrics</summary>
              <Checkbox
                label="Spending"
                value={spendingDataSelected}
                setValue={setSpendingDataSelected}
              />
              <Checkbox
                label="Daily Rate"
                value={dailyRateSelected}
                setValue={setDailyRateSelected}
              />
              <Checkbox
                label="Occupancy"
                value={occupancySelected}
                setValue={setOccupancySelected}
              />
              <Checkbox
                label="Length of Stay"
                value={lengthOfStaySelected}
                setValue={setLengthOfStaySelected}
              />
              <Checkbox
                label="Booking Window"
                value={bookingWindowSelected}
                setValue={setBookingWindowSelected}
              />
              {llmResponse !== '' ?
                <Checkbox
                  label="AI Analysis"
                  value={aiAnalysisSelected}
                  setValue={setAiAnalysisSelected}
                />
                : null}
            </details></div>
          {spendingDataSelected && !spendCatsLoading && !spendCatsError && spendCats ?
            <div className="shadow-md border-1 opacity-95 rounded bg-base-300 m-1 p-3 md:min-w-55 z-20">
              <details id="SpendCatSelector" onClick={() => { setOpenDetails("SpendCatSelector") }}>
                <summary className="text-primary-content">Spending</summary>
                <SpendCats spendCats={spendCats}
                  selectedCats={selectedCats}
                  onChangeCat={toggleCat}
                />
              </details>
            </div>
            : null}

          {!loading && !error && dataSet ? (
            <div className="shadow-md border-1 opacity-95 rounded m-1 p-3 relative shadow-lg bg-base-300 text-primary-content z-20">
              <details id="AIWidget" onClick={() => setOpenDetails("AIWidget")}><summary>AI Analysis</summary>
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
                  afterClickAnalyse={() => setOpenDetails("none")}
                />
              </details>
            </div>
          ) : null}

          <div className="col-span-1 m-0 p-3 relative text-primary-content z-20">
            {width >= lgSplit ?
              <ButtonDownloadReport
                id="report-button"
                onClick={(e) => {
                  generatePDFFrom(['llm-response', 'daily-rate', 'length-of-stay', 'average-occupancy', 'average-booking-window', 'spending-graphs'],
                    'LocalisDataAnalysisReport.pdf',
                    false);
                  return false;
                }}
                disabled={false}
              /> : <ButtonMediumFullWide
                id="report-button"
                onClick={(e) => {
                  generatePDFFrom(['llm-response', 'daily-rate', 'length-of-stay', 'average-occupancy', 'average-booking-window', 'spending-graphs'],
                    'LocalisDataAnalysisReport.pdf',
                    false);
                  return false;
                }}
                disabled={false}
                textColor="text-secondary-content"
              >Download Report</ButtonMediumFullWide>}

          </div>
          <div className="lg:col-span-12 xl:col-span-10 lg:h-[70vh] xl:h-[70vh] lg:mr-8 lg:overflow-scroll lg:fixed lg:top-56 z-10" /* max-w-[1440px]"*/>
            {!loading && !error && dataSet ? (
              <div id="report-container" className="pr-3">
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
                {spendingDataSelected ?
                  <div>
                    {!spendingDataLoading && !spendingDataError && spendingDataSet ? (
                        <GraphSpendingSet
                          id="spending-graphs"
                          useRechart={useRechart}
                          title="Spending For"
                          avgTitle="Category $ comparison"
                          field={"spend"}
                          selectedCats={selectedCats}
                          dataSet={spendingDataSet}
                          LGAs={LGAs}
                          scale={1.0}
                        />
                    ) : !spendingDataError ? (
                      <div>
                        <div
                          className="box-drop-shadow"
                          style={{ height: 400, width: kGraphWidth }}
                        >
                          <LoadingSpinner />
                        </div>
                      </div>
                    ) : spendingDataError}
                  </div> : null}
                {dailyRateSelected ? (
                  <GraphSet
                    id="daily-rate"
                    useRechart={useRechart}
                    title="Average Daily Rate ($)"
                    avgTitle="LGA Comparison"
                    field={"average_daily_rate"}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    windowDays={windowDays}
                    setWindowDays={setWindowDays}
                    totalDateRange={totalDateRange}
                    setSelectedDateRange={setSelectedDateRange}
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
                    startDate={startDate}
                    setStartDate={setStartDate}
                    windowDays={windowDays}
                    setWindowDays={setWindowDays}
                    totalDateRange={totalDateRange}
                    setSelectedDateRange={setSelectedDateRange}
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
                    startDate={startDate}
                    setStartDate={setStartDate}
                    windowDays={windowDays}
                    setWindowDays={setWindowDays}
                    totalDateRange={totalDateRange}
                    setSelectedDateRange={setSelectedDateRange}
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
                    startDate={startDate}
                    setStartDate={setStartDate}
                    windowDays={windowDays}
                    setWindowDays={setWindowDays}
                    totalDateRange={totalDateRange}
                    setSelectedDateRange={setSelectedDateRange}
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
    </div>
  );
}
