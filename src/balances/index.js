'use strict';

const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const futuresTradesRow = require(`../../data/json/futures-trades-actual.json`);
const futuresCoinTradesRow = require(`../../data/json/futures-trades-coin-m-actual.json`);
const {Category} = require(`../bill/constants`);

const {getCountable} = require(`../bill/bill-utils`);
const {getBalances} = require(`./utils`);

const spotTrades = getCountable(spotTradesRow, [`price`, `amount`, `total`, `fee`]);
const futuresTrades = getCountable(futuresTradesRow, [`price`, `amount`, `total`, `realizedPnl`, `fee`, `leverage`, `invest`]);
const futuresCoinTrades = getCountable(futuresCoinTradesRow, [`price`, `amount`, `total`, `realizedPnl`, `fee`, `leverage`, `invest`]);

const balances = {
  [`${Category.Spot.SIGNAL}`]: getBalances(spotTrades, Category.Spot.SIGNAL),
  [`${Category.Spot.CLASSIC}`]: getBalances(spotTrades, Category.Spot.CLASSIC),
  [`${Category.Futures.SIGNAL}`]: getBalances(futuresTrades, Category.Futures.SIGNAL),
  [`${Category.Futures.CLASSIC}`]: getBalances(futuresTrades, Category.Futures.CLASSIC),
  [`${Category.Futures.DENIS}`]: getBalances(futuresTrades, Category.Futures.DENIS),
  [`${Category.FuturesCoin.SIGNAL}`]: getBalances(futuresCoinTrades, Category.FuturesCoin.SIGNAL),
  [`${Category.FuturesCoin.CLASSIC}`]: getBalances(futuresCoinTrades, Category.FuturesCoin.CLASSIC),
};

module.exports = balances;
