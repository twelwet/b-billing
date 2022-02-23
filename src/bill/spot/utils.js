'use strict';

const {reducer, getAssetInfo, sortBySellPeriod, getIsClosed, getSumByField} = require(`../bill-utils`);

const getBilling = (allTrades, categoryName, tradeType, baseCoin) => {
  const allTradesInCategory = allTrades
    .filter((trade) => trade[`category`] === categoryName)
    .filter((trade) => trade[`baseCoin`] === baseCoin);
  const trades = allTradesInCategory.filter((trade) => trade[`tradeType`] === tradeType);
  const assets = [...new Set(trades.map((item) => item[`symbol`]))];
  const result = [];

  for (const asset of assets) {
    const assetTrades = trades.filter((item) => item[`symbol`] === asset);
    const {buyAmount, sellAmount, buyTotal, sellTotal} = getAssetInfo(assetTrades);
    const isClosed = getIsClosed(buyAmount, sellAmount);

    const periodNames = [...(new Set(allTrades.map((trade) => trade[`period`])))];
    const price = {buy: 0, sell: 0};
    const periodProfits = {};
    const periodFee = {};

    for (const period of periodNames) {
      const periodTrades = assetTrades.filter((trade) => trade[`period`] === period);
      const periodTradesBuy = periodTrades.length > 0
        ? periodTrades.filter((trade) => trade[`type`] === `BUY`)
        : [{amount: 0, total: 0}];
      const periodTradesSell = periodTrades.length > 0
        ? periodTrades.filter((trade) => trade[`type`] === `SELL`)
        : [{amount: 0, total: 0}];
      const amountBuyInPeriod = getSumByField(periodTradesBuy, `amount`);
      const amountSellInPeriod = getSumByField(periodTradesSell, `amount`);
      const totalBuyInPeriod = getSumByField(periodTradesBuy, `total`);
      const totalSellInPeriod = getSumByField(periodTradesSell, `total`);
      price.buy = totalBuyInPeriod / amountBuyInPeriod || price.buy;
      price.sell = totalSellInPeriod / amountSellInPeriod || price.sell;
      periodProfits[`${period}`] = totalSellInPeriod - price.buy * amountSellInPeriod;
      periodFee[`${period}`] = getSumByField(periodTradesSell, `fee`) || 0;
    }

    const profit = Object.values(periodProfits).reduce(reducer);
    const fee = Object.values(periodFee).reduce(reducer);
    result.push({asset, buyAmount, sellAmount, buyTotal, sellTotal, isClosed, profit, periodProfits, periodNames, periodFee, fee});
  }
  return result.sort(sortBySellPeriod);
};

module.exports = {getBilling};
