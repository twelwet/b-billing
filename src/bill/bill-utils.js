'use strict';

const reducer = (previousValue, currentValue) => previousValue + currentValue;

const getCountable = (data, fields) => {
  for (const item of data) {
    for (const field of fields) {
      item[`${field}`] = +item[`${field}`];
    }
  }
  return data;
};

const getPeriodProfits = (periodNames, allTradesInCategory) => {
  const periodProfits = [];
  for (const period of periodNames) {
    const periodProfit = allTradesInCategory
      .filter((pair) => pair[`periodNames`].find((periodName) => periodName === period))
      .map((pair) => pair[`periodProfits`][`${period}`]);
    periodProfits.push(periodProfit.length > 0 ? periodProfit.reduce(reducer) : 0);
  }
  return periodProfits;
};

module.exports = {reducer, getCountable, getPeriodProfits};
