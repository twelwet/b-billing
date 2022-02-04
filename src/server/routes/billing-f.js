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

module.exports = billingFuturesRouter;
