'use strict';

const futuresTradesRow = require(`../../data/json/futures-trades-actual.json`);
const {getCountable, getBilling} = require(`./utils`);
const {reducer} = require(`../bill-spot/utils`);

const futuresTrades = getCountable(futuresTradesRow);

const getFuturesData = (categoryName) => {
  const pairs = getBilling(futuresTrades, categoryName);

  const generalInfo = {
    name: categoryName,
  };

  const summaryInfo = {
    profit: pairs.length > 0 ? pairs.map((pair) => pair[`profit`]).reduce(reducer) : 0,
    fee: pairs.length > 0 ? pairs.map((pair) => pair[`fee`]).reduce(reducer) : 0,
  };

  return {pairs, generalInfo, summaryInfo};
};

module.exports = getFuturesData;
