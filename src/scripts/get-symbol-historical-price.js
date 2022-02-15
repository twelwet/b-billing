'use strict';

const moment = require(`moment`);
const {getHistoricalSymbolPrice} = require(`../services/node-binance-api/methods`);

const SYMBOL = `1INCHBTC`;
const TIME_STRING = `10.02.2022 00:00:00`;

const timeStamp = moment(TIME_STRING, `DD.MM.YYYY HH:mm:ss`).valueOf();

getHistoricalSymbolPrice(SYMBOL, timeStamp)
  .then((price) => console.log({
    symbol: SYMBOL,
    date: moment(timeStamp).format(`DD.MM.YYYY HH:mm:ss`),
    price,
  }));
