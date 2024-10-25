import { numericDateToString } from "./dateUtils";

// get a monthly average of the ADR value
export function getMonthlyAverageADR(data, year) {
  const monthlyData = {};

  data?.forEach((item) => {
    const { month, year: itemYear } = numericDateToString(item.sample_date);

    if (itemYear !== year) {
      return;
    }

    if (!monthlyData[month]) {
      monthlyData[month] = { month, totalADR: 0, count: 0 };
    }

    monthlyData[month].totalADR += parseFloat(item.average_daily_rate);
    monthlyData[month].count += 1;
  });
  return Object.values(monthlyData).map((item) => ({
    name: item.month,
    value: item.totalADR / item.count,
  }));
}
