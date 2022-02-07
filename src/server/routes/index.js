'use strict';

const billingRouter = require(`./billing`);
const tradesRouter = require(`./trades`);
const cashFlowRouter = require(`./cash-flow`);

module.exports = {
  billingRouter,
  tradesRouter,
  cashFlowRouter,
};
