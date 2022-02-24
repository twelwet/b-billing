'use strict';

const moment = require(`moment`);
const {readLineInterface} = require(`../utils`);
const {getHistoricalSymbolPrice, getPrices} = require(`../../../services/node-binance-api/methods`);

const SYMBOL = `BTCUSDT`;
const DELTA_MS = 60000; // 1 min

const getTimeStamp = (dateString) => moment(dateString, `DD.MM.YYYY HH:mm:ss`).valueOf();
const getHumanDate = (timeStamp) => moment(timeStamp).format(`DD.MM.YYYY HH:mm:ss`);

const findSymbol = async (symbol, defaultSymbol) => {
  const allSymbolsPrices = await getPrices();
  const symbols = Object.keys(allSymbolsPrices);
  const result = symbols.find((item) => item.includes(symbol.toUpperCase()));
  if (result) {
    console.log(`${result} symbol is found.`);
    return result;
  } else {
    console.log(`${defaultSymbol} symbol is used.`);
    return defaultSymbol;
  }
};

const humanDateNow = getHumanDate((Date.now() - DELTA_MS));

const startScript = () => {
  readLineInterface.question(`SYMBOL [${SYMBOL}]: `, async (symbol) => {
    symbol = await findSymbol(symbol, SYMBOL);

    readLineInterface.question(`DATE [${humanDateNow}]: `, (date) => {
      date = getTimeStamp(date) || getTimeStamp(humanDateNow);

      getHistoricalSymbolPrice(symbol, date).then((price) => {
        console.table({symbol, date: getHumanDate(date), price});
        process.exit();
      });
    });
  });
};

startScript();
