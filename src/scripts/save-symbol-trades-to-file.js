'use strict';

const {spotTrades} = require(`../data-entry-point`);
const {getCsvFromJson, saveToFile} = require(`./utils`);

const TARGET_SYMBOL = `1INCH`;

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

const resultTrades = spotTrades
  .filter((trade) => trade[`symbol`]
    .includes(TARGET_SYMBOL));

saveToFile(`data/temp/${TARGET_SYMBOL}-trades.csv`, getCsvFromJson(resultTrades, FIELDS));
