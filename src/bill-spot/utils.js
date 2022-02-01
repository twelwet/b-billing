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

const sortByIsClosed = (a, b) => {
  if (a[`isClosed`] * b[`isClosed`]) {
    return 1;
  } else {
    return -1;
  }
}

module.exports = {reducer, getCountable, sortByIsClosed};
