'use strict';

const {spotTrades} = require(`../../data-entry-point`);
const {getAssetInfo} = require(`../bill-utils`);
const {getOrders} = require(`../../scripts/utils`);

const getAssetData = (symbol, category) => {
  const trades = spotTrades.filter((trade) => trade[`symbol`] === symbol).filter((trade) => trade[`category`] === category);
  const {buyAmount, sellAmount, buyTotal, sellTotal, buyFee, sellFee} = getAssetInfo(trades);

  const generalInfo = {
    name: `${category}/${symbol}`,
  };

  const summaryInfo = {
    buyAmount, sellAmount, buyTotal, sellTotal, buyFee, sellFee
  };

  return {
    orders: getOrders(trades),
    summaryInfo,
    generalInfo,
  };
};

module.exports = {getAssetData};
