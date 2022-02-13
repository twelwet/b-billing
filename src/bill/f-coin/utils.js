'use strict';

const {getAssetProps} = require(`../bill-utils`);

const getBilling = (allTrades, categoryName, coin) => {
  const trades = allTrades
    .filter((trade) => trade[`category`] === categoryName)
    .filter((trade) => trade[`symbol`] === coin);

  const {
    buyAmount,
    sellAmount,
    profit,
    fee,
    invest,
    isClosed,
    periodNames,
    periodProfits,
    periodFees,
  } = getAssetProps(trades);

  return {asset: coin, invest, buyAmount, sellAmount, isClosed, periodNames, periodProfits, periodFees, profit, fee};
};

module.exports = {getBilling};
