'use strict';

// TODO Add here all trades data (spot, futures, futures-coin)
const {getCountable} = require(`../bill/bill-utils`);
const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const mutatedTradesRow = require(`../../data/json/spot-trades-only-mutated.json`);

const spotTradesActual = getCountable(spotTradesRow, [`price`, `amount`, `total`, `fee`, `isShift`]);
const mutatedTrades = getCountable(mutatedTradesRow, [`price`, `amount`, `total`, `fee`, `isShift`]);

const tradesWithoutMutatedItems = spotTradesActual.filter((trade) => trade[`isShift`] === 0);

const spotTrades = tradesWithoutMutatedItems.concat(mutatedTrades);
console.log(spotTrades.filter((trade) => trade[`symbol`].includes(`SUPER`)).map((item) => item[`category`]));

module.exports = {spotTrades};
