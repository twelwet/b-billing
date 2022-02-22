'use strict';

const {spotTrades} = require(`../data-entry-point`);
const {getCsvFromJson, saveToFile, getOrders} = require(`./utils`);

const TARGET_SYMBOL = `BTT`;

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

const resultOrders = getOrders(resultTrades);

saveToFile(`data/temp/${TARGET_SYMBOL}-orders.csv`, getCsvFromJson(resultOrders, FIELDS));
