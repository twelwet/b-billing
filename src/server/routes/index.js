'use strict';

const billingSpotRouter = require(`./billing-spot`);
const billingFuturesRouter = require(`./billing-f`);
const billingFuturesCoinRouter = require(`./billing-f-coin`);

module.exports = {billingSpotRouter, billingFuturesRouter, billingFuturesCoinRouter};
