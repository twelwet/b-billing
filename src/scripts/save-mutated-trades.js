'use strict';

const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const {getCountable} = require(`../bill/bill-utils`);
const {mutateTrade, saveToFile, getCsvFromJson} = require(`./utils`);
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

const mutateTrades = async (trades) => {
  for (const [index, trade] of trades.entries()) {
    await mutateTrade(trade);
    console.log(`${index + 1} entry of ${trades.length} entries is completed.`);
  }
  return trades;
};

mutateTrades(shiftTrades).then((result) => {
  saveToFile(FilePath.SpotMutated.CSV, getCsvFromJson(result, FIELDS)).then((result) => console.log(result));
});
