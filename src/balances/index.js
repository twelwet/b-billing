'use strict';

const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const futuresTradesRow = require(`../../data/json/futures-trades-actual.json`);
const futuresCoinTradesRow = require(`../../data/json/futures-trades-coin-m-actual.json`);

const {getCountable} = require(`../bill/bill-utils`);
const {getBalances} = require(`./utils`);

const spotTrades = getCountable(spotTradesRow, [`price`, `amount`, `total`, `fee`]);
const futuresTrades = getCountable(futuresTradesRow, [`price`, `amount`, `total`, `realizedPnl`, `fee`, `leverage`, `invest`]);
const futuresCoinTrades = getCountable(futuresCoinTradesRow, [`price`, `amount`, `total`, `realizedPnl`, `fee`, `leverage`, `invest`]);

const balances = {
  spot: {
    signal: getBalances(spotTrades, `spot-signal`),
    classic: getBalances(spotTrades, `spot-classic`),
  },
  futures: {
    signal: getBalances(futuresTrades, `f-signal`),
    classic: getBalances(futuresTrades, `f-classic`),
    denis: getBalances(futuresTrades, `f-denis`),
  },
  futuresCoin: {
    signal: getBalances(futuresCoinTrades, `f-signal`),
    classic: getBalances(futuresCoinTrades, `f-classic`),
  },
};

console.log(balances.futuresCoin.signal);

module.exports = balances;
