'use strict';

const {Router} = require(`express`);
const getSpotData = require(`../../bill/spot`);
const getFuturesData = require(`../../bill/f-usdt`);
const getFuturesCoinData = require(`../../bill/f-coin`);
const {Category, BaseCoin} = require(`../../bill/constants`);

const billingRouter = new Router();

billingRouter.get(`/`, (req, res) => {
  const pageContent = {
    title: `Billing`,
    categories: {
      spot: Object.values(Category.Spot),
      futures: Object.values(Category.Futures),
      futuresCoin: Object.values(Category.FuturesCoin),
    },
    baseCoins: {
      spot: Object.values(BaseCoin.Spot),
      futures: Object.values(BaseCoin.Futures),
      futuresCoin: Object.values(BaseCoin.FuturesCoin),
    },
  };
  res.render(`billing`, pageContent);
});

billingRouter.get(`/spot/:category/:baseCoin`, (req, res) => {
  const category = req.params[`category`];
  const baseCoin = req.params[`baseCoin`];
  const {pairs, summaryInfo, generalInfo} = getSpotData(category, baseCoin);
  const pageContent = {
    title: generalInfo.name,
    categories: {
      spot: Object.values(Category.Spot),
      futures: Object.values(Category.Futures),
      futuresCoin: Object.values(Category.FuturesCoin),
    },
    baseCoins: {
      spot: Object.values(BaseCoin.Spot),
      futures: Object.values(BaseCoin.Futures),
      futuresCoin: Object.values(BaseCoin.FuturesCoin),
    },
    pairs,
    summaryInfo,
    generalInfo,
  };
  res.render(`spot`, pageContent);
});

billingRouter.get(`/futures/:category`, (req, res) => {
  const category = req.params[`category`];
  const {pairs, generalInfo, summaryInfo} = getFuturesData(category);
  const pageContent = {
    title: generalInfo.name,
    categories: {
      spot: Object.values(Category.Spot),
      futures: Object.values(Category.Futures),
      futuresCoin: Object.values(Category.FuturesCoin),
    },
    baseCoins: {
      spot: Object.values(BaseCoin.Spot),
      futures: Object.values(BaseCoin.Futures),
      futuresCoin: Object.values(BaseCoin.FuturesCoin),
    },
    pairs,
    generalInfo,
    summaryInfo,
  };
  res.render(`futures`, pageContent);
});

billingRouter.get(`/futures-coin/:category/:baseCoin`, (req, res) => {
  const category = req.params[`category`];
  const baseCoin = req.params[`baseCoin`];
  const {pair, generalInfo} = getFuturesCoinData(category, baseCoin);
  const pageContent = {
    title: generalInfo.name,
    categories: {
      spot: Object.values(Category.Spot),
      futures: Object.values(Category.Futures),
      futuresCoin: Object.values(Category.FuturesCoin),
    },
    baseCoins: {
      spot: Object.values(BaseCoin.Spot),
      futures: Object.values(BaseCoin.Futures),
      futuresCoin: Object.values(BaseCoin.FuturesCoin),
    },
    generalInfo,
    pair,
  };
  res.render(`futures-coin`, pageContent);
});

module.exports = billingRouter;
