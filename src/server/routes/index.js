'use strict';

const billingSpotRouter = require(`./billing-spot`);
const billingFuturesRouter = require(`./billing-f`);
const billingFuturesCoinRouter = require(`./billing-f-coin`);
const tradesRouter = require(`./trades`);

module.exports = {
  billingSpotRouter,
  billingFuturesRouter,
  billingFuturesCoinRouter,
  tradesRouter,
};
