'use strict';

const {getCountable} = require(`../bill/bill-utils`);
const spotTradesMutated = require(`../../data/json/spot-trades-mutated.json`);
const futuresTradesRow = require(`../../data/json/futures-trades-actual.json`);
const futuresCoinTradesRow = require(`../../data/json/futures-trades-coin-m-actual.json`);

const spotTrades = getCountable(spotTradesMutated, [`price`, `amount`, `total`, `fee`, `isShift`]);
const futuresTrades = getCountable(futuresTradesRow, [`price`, `amount`, `total`, `realizedPnl`, `fee`, `leverage`, `invest`]);
const futuresCoinTrades = getCountable(futuresCoinTradesRow, [`price`, `amount`, `total`, `realizedPnl`, `fee`, `leverage`, `invest`]);

// TODO Sort all trades in chronological order before export
module.exports = {spotTrades, futuresTrades, futuresCoinTrades};
