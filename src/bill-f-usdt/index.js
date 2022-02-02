'use strict';

const futuresTradesRow = require(`../../data/json/futures-trades-actual.json`);
const {getCountable, getBilling} = require(`./utils`);

const futuresTrades = getCountable(futuresTradesRow);

const getFuturesData = (categoryName) => {
  const pairs = getBilling(futuresTrades, categoryName);

  const generalInfo = {
    name: categoryName,
  };

  return {pairs, generalInfo};
};

module.exports = getFuturesData;
