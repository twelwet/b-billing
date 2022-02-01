'use strict';

const reducer = (previousValue, currentValue) => previousValue + currentValue;

const getCountable = (data) => {
  for (const item of data) {
    item[`price`] = +item[`price`];
    item[`amount`] = +item[`amount`];
    item[`total`] = +item[`total`];
    item[`fee`] = +item[`fee`];
  }
  return data;
};

module.exports = {reducer, getCountable};
