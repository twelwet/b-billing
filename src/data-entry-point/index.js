'use strict';

const {getCountable} = require(`../bill/bill-utils`);
const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const mutatedTradesRow = require(`../../data/json/spot-trades-only-mutated.json`);
const futuresTradesRow = require(`../../data/json/futures-trades-actual.json`);
const futuresCoinTradesRow = require(`../../data/json/futures-trades-coin-m-actual.json`);

const getSpotTrades = () => {
  const spotTradesActual = getCountable(spotTradesRow, [`price`, `amount`, `total`, `fee`, `isShift`]);
  const mutatedTrades = getCountable(mutatedTradesRow, [`price`, `amount`, `total`, `fee`, `isShift`]);
  const tradesWithoutMutatedItems = spotTradesActual.filter((trade) => trade[`isShift`] === 0);
  return tradesWithoutMutatedItems.concat(mutatedTrades);
};

const spotTrades = getSpotTrades();
const futuresTrades = getCountable(futuresTradesRow, [`price`, `amount`, `total`, `realizedPnl`, `fee`, `leverage`, `invest`]);
const futuresCoinTrades = getCountable(futuresCoinTradesRow, [`price`, `amount`, `total`, `realizedPnl`, `fee`, `leverage`, `invest`]);

module.exports = {spotTrades, futuresTrades, futuresCoinTrades};
