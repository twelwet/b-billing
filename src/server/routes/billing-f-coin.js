'use strict';

const {Router} = require(`express`);
const getFuturesCoinData = require(`../../bill/f-coin`);
const {Category, BaseCoin} = require(`../../bill/constants`);

const billingFuturesCoinRouter = new Router();

billingFuturesCoinRouter.get(`/classic/TRX`, (req, res) => {
  const {pair, generalInfo} = getFuturesCoinData(`f-classic`, `TRXUSD_PERP`);
  const pageContent = {
    title: generalInfo.name,
    categories: {
      spot: Object.values(Category.Spot),
    },
    baseCoins: Object.values(BaseCoin),
    generalInfo,
    pair,
  };
  res.render(`futures-coin`, pageContent);
});

billingFuturesCoinRouter.get(`/signal/BTC`, (req, res) => {
  const {pair, generalInfo} = getFuturesCoinData(`f-signal`, `BTCUSD_PERP`);
  const pageContent = {
    title: generalInfo.name,
    categories: {
      spot: Object.values(Category.Spot),
    },
    baseCoins: Object.values(BaseCoin),
    generalInfo,
    pair,
  };
  res.render(`futures-coin`, pageContent);
});

billingFuturesCoinRouter.get(`/classic/ETH`, (req, res) => {
  const {pair, generalInfo} = getFuturesCoinData(`f-classic`, `ETHUSD_PERP`);
  const pageContent = {
    title: generalInfo.name,
    categories: {
      spot: Object.values(Category.Spot),
    },
    baseCoins: Object.values(BaseCoin),
    generalInfo,
    pair,
  };
  res.render(`futures-coin`, pageContent);
});

module.exports = billingFuturesCoinRouter;
