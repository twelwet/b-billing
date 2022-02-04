'use strict';

const {Router} = require(`express`);
const getFuturesCoinData = require(`../../bill/f-coin`);
const {Category, BaseCoin} = require(`../../bill/constants`);

const billingFuturesCoinRouter = new Router();

billingFuturesCoinRouter.get(`/:category/:baseCoin`, (req, res) => {
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

module.exports = billingFuturesCoinRouter;
