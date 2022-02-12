'use strict';

const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const {getCountable} = require(`../bill/bill-utils`);
const {mutateTrades, saveToFile, getCsvFromJson} = require(`./utils`);
const {FilePath} = require(`./constants`);

// TODO This constant should be relocated
const FIELDS = [
  `id`,
  `orderId`,
  `date`,
  `timestamp`,
  `symbol`,
  `type`,
  `price`,
  `amount`,
  `total`,
  `fee`,
  `feeCoin`,
  `category`,
  `period`,
  `tradeType`,
  `baseCoin`,
  `isShift`,
  `note`
];

const spotTrades = getCountable(spotTradesRow, [`price`, `amount`, `total`, `fee`, `isShift`]);
const shiftTrades = spotTrades.filter((trade) => trade[`isShift`] === 1);

mutateTrades(shiftTrades)
  .then((mutatedTrades) => saveToFile(FilePath.SpotMutated.CSV, getCsvFromJson(mutatedTrades, FIELDS)));
