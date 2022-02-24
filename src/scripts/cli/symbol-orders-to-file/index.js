'use strict';

const {readLineInterface} = require(`../utils`);
const {spotTrades} = require(`../../../data-entry-point`);
const {SYMBOL} = require(`../symbol-billing/constants`);
const {getOrders, saveToFile, getCsvFromJson} = require(`../../utils`);

// TODO This constant should be relocated
const FIELDS = [
  `period`,
  `tradeType`,
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
  `baseCoin`,
  `isShift`,
  `note`,
];

const startScript = () => {
  readLineInterface.question(`SYMBOL [${SYMBOL}]: `, (symbol) => {
    symbol = symbol || SYMBOL;

    const resultTrades = spotTrades
      .filter((trade) => trade[`symbol`]
        .includes(symbol));

    const resultOrders = getOrders(resultTrades);

    saveToFile(`data/temp/${symbol}-orders.csv`, getCsvFromJson(resultOrders, FIELDS))
      .then(() => process.exit());
  });

};

startScript();
