'use strict';

require(`dotenv`).config();
const Service = require(`node-binance-api`);

const binance = new Service().options({
  APIKEY: process.env.BINANCE_KEY,
  APISECRET: process.env.BINANCE_SECRET,
});

module.exports = binance;
