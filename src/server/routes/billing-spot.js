'use strict';

const {Router} = require(`express`);
const getSpotData = require(`../../bill/spot`);
const {Category, BaseCoin} = require(`../../bill/constants`);

const billingSpotRouter = new Router();

billingSpotRouter.get(`/:category/:baseCoin`, (req, res) => {
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

module.exports = billingSpotRouter;
