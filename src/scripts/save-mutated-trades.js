'use strict';

const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const {getCountable} = require(`../bill/bill-utils`);
const {mutateTrades, mutateFeeCoins, saveToFile, getCsvFromJson} = require(`./utils`);
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

const spotTradesInitial = getCountable(spotTradesRow, [`price`, `amount`, `total`, `fee`, `isShift`]);
const shiftTrades = spotTradesInitial.filter((trade) => trade[`isShift`] === 1);
const unShiftTrades = spotTradesInitial.filter((trade) => trade[`isShift`] === 0);

mutateTrades(shiftTrades)
  .then((mutatedTrades) => {
    const mutatedTradesCountable = getCountable(mutatedTrades, [`price`, `amount`, `total`, `fee`, `isShift`]);
    const allTradesFirstMutation = unShiftTrades.concat(mutatedTradesCountable);

    const tradesToSecondMutation = allTradesFirstMutation
      .filter((trade) => trade[`feeCoin`] !== `USDT`)
      .filter((trade) => trade[`feeCoin`] !== `BTC`);
    const tradesNotToMutate = allTradesFirstMutation
      .filter((trade) => trade[`feeCoin`] === `USDT` || trade[`feeCoin`] === `BTC`);

    mutateFeeCoins(tradesToSecondMutation)
      .then((mutatedTradesSecond) => {
        const mutatedTradesCountableSecond = getCountable(mutatedTradesSecond, [`price`, `amount`, `total`, `fee`, `isShift`]);
        const allTradesSecondMutation = tradesNotToMutate.concat(mutatedTradesCountableSecond);
        const result = allTradesSecondMutation.sort((a, b) => a[`timestamp`] - b[`timestamp`]);

        saveToFile(FilePath.SpotMutated.CSV, getCsvFromJson(result, FIELDS))
          .then(() => console.log(`Operation is successful.`));
      });
  });
