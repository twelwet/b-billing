'use strict';

const {Router} = require(`express`);
const getFuturesData = require(`../../bill/f-usdt`);
const {Category, BaseCoin} = require(`../../bill/constants`);

const billingFuturesRouter = new Router();

billingFuturesRouter.get(`/:category`, (req, res) => {
  const category = req.params[`category`];
  const {pairs, generalInfo, summaryInfo} = getFuturesData(category);
  const pageContent = {
    title: generalInfo.name,
    categories: {
      spot: Object.values(Category.Spot),
      futures: Object.values(Category.Futures),
    },
    baseCoins: Object.values(BaseCoin),
    pairs,
    generalInfo,
    summaryInfo,
  };
  res.render(`futures`, pageContent);
});

billingFuturesRouter.get(`/classic`, (req, res) => {
  const {pairs, generalInfo, summaryInfo} = getFuturesData(`f-classic`);
  const pageContent = {
    title: generalInfo.name,
    categories: {
      spot: Object.values(Category.Spot),
    },
    baseCoins: Object.values(BaseCoin),
    pairs,
    generalInfo,
    summaryInfo,
  };
  res.render(`futures`, pageContent);
});

billingFuturesRouter.get(`/denis`, (req, res) => {
  const {pairs, generalInfo, summaryInfo} = getFuturesData(`denis`);
  const pageContent = {
    title: generalInfo.name,
    categories: {
      spot: Object.values(Category.Spot),
    },
    baseCoins: Object.values(BaseCoin),
    pairs,
    generalInfo,
    summaryInfo,
  };
  res.render(`futures`, pageContent);
});

module.exports = billingFuturesRouter;
