'use strict';

const {Category} = require(`../bill/constants`);
const {getBalances} = require(`./utils`);
const {spotTrades, futuresTrades, futuresCoinTrades} = require(`../data-entry-point`);

const balances = {
  [`${Category.Spot.SIGNAL}`]: getBalances(spotTrades, Category.Spot.SIGNAL),
  [`${Category.Spot.CLASSIC}`]: getBalances(spotTrades, Category.Spot.CLASSIC),
  [`${Category.Spot.TEST}`]: getBalances(spotTrades, Category.Spot.TEST),
  [`${Category.Spot.DEPOSIT}`]: getBalances(spotTrades, Category.Spot.DEPOSIT),
  [`${Category.Spot.CHANGE}`]: getBalances(spotTrades, Category.Spot.CHANGE),
  [`${Category.Futures.SIGNAL}`]: getBalances(futuresTrades, Category.Futures.SIGNAL),
  [`${Category.Futures.CLASSIC}`]: getBalances(futuresTrades, Category.Futures.CLASSIC),
  [`${Category.Futures.DENIS}`]: getBalances(futuresTrades, Category.Futures.DENIS),
  [`${Category.FuturesCoin.SIGNAL}`]: getBalances(futuresCoinTrades, Category.FuturesCoin.SIGNAL),
  [`${Category.FuturesCoin.CLASSIC}`]: getBalances(futuresCoinTrades, Category.FuturesCoin.CLASSIC),
};

module.exports = balances;
