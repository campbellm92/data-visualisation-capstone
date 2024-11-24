//
//  IFQ717 Web Development Capstone
//
//  api.js - Main app API helper function definitions by Gary Cazzulino
//
//

import domtoimage from 'dom-to-image';
import { jsPDF } from 'jspdf'


async function captureAsImage (elementId) {
  const element = document.getElementById(elementId);
  return await domtoimage.toPng(element);
}

export async function generatePDFFrom(htmlElements, outputFilename, display) {

  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'px',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const yMargin = 20;
  const yGap = 10;
  const xMargin = 30;
  let scale = 1.0;
  let yOffset = yMargin;

  for ( let i = 0; i < htmlElements.length; i++) {

    let scalingForHeight = false;
    let element = htmlElements[i];

    if (document.getElementById(element)) {

      const elementImage = await captureAsImage(element);
      let { width, height } = document.getElementById(element).getBoundingClientRect();

      scale = Math.min(
              (pageWidth - (xMargin * 2)) / width,
              (pageHeight - (yMargin * 2)) / height);

      if (yOffset + ((height * scale) + yMargin) >= pageHeight - yMargin * 2 && yOffset > yMargin) {

        yOffset = yMargin;
        pdf.addPage();

      }

      pdf.addImage(elementImage, 'PNG', width < height ? (pageWidth - (width * scale)) / 2.0 : xMargin, yOffset, width * scale, height * scale);
      yOffset += ((height * scale) + yGap);
      
    }
  
  }

  // Save the PDF
  pdf.save(outputFilename);

  if (display) window.open(pdf.output('bloburl'));

}

export function average(arr) {
  return Math.trunc((arr.reduce((p, c) => p + c, 0) / arr.length) * 10.0) / 10.0;
}

// Given a cache array and a specific URL string, getUrlFromCache will return the previous
// API response for that URL if it exists in the cache, filtered by an optionally provided filter
export function getUrlFromCache(cache, url, filter = (element) => true) {
  return cache[url]; // ? cache[url].filter(filter) : cache[url];
}

// A helper function to consistently perform server API calls, handling errors as appropriate
// Take a url and authenticate boolean. If authenticate is true then the user's JWT is
// passed in the request header
export function getUrlFromServer(url, authenticate) {
  console.log(`api url = ${url}`);

  return fetch(url, {
    method: "GET",
    headers: authenticate
      ? {
          "Content-Type": "application/json",
          //"X-API-KEY": kAPI_KEY,
          //"Authorization": "Bearer " + localStorage.getItem(kTOKEN_NAME)
        }
      : {
          "Content-Type": "application/json",
          //"X-API-KEY": kAPI_KEY
        },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data;
      }
      console.log("Full response data:", data);
      //console.table(data['combined_data']);
      return data["combined_data"];
    });
}

export function addDaysToDate(dateString, daysToAdd) {
  const date = new Date(dateString);

  date.setDate(date.getDate() + daysToAdd);

  const newYear = date.getFullYear();
  const newMonth = String(date.getMonth() + 1).padStart(2, "0");
  const newDay = String(date.getDate()).padStart(2, "0");

  const newDateString = `${newYear}-${newMonth}-${newDay}`;

  return newDateString;
}

export function daysBetweenDates(startDate, endDate) {
  const startDateDate = new Date(startDate);
  const endDateDate = new Date(endDate);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayDifference = (endDateDate - startDateDate) / millisecondsPerDay;

  return Math.floor(dayDifference);
}

export function convertToLabel(name) {
  return name.replace(' ', '_').toLowerCase();
}


export function calculateAreaUnderCurve(dataSet) {

  let areaUnderCurve = 0;

  for (let i = 0; i < dataSet.length - 1; i++) {
    const avgHeight = (dataSet[i] + dataSet[i + 1]) / 2;
    const baseWidth = 1;

    areaUnderCurve += avgHeight * baseWidth;
  }

  return areaUnderCurve;
}
