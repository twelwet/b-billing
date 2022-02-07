'use strict';

const billingRouter = require(`./billing`);
const tradesRouter = require(`./trades`);
const cashFlowRouter = require(`./cash-flow`);
const balancesRouter = require(`./balances`);

module.exports = {
  billingRouter,
  tradesRouter,
  cashFlowRouter,
  balancesRouter,
};
