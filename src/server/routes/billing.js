'use strict';

const {Router} = require(`express`);
const getSpotData = require(`../../bill/spot`);
const {getAssetData} = require(`../../bill/spot/asset`);
const getFuturesData = require(`../../bill/f-usdt`);
const getFuturesCoinData = require(`../../bill/f-coin`);
const {Category, BaseCoin} = require(`../../bill/constants`);

const billingRouter = new Router();

const getPageContent = (title) => {
  return {
    title,
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
};

billingRouter.get(`/`, (req, res) => {
  const pageContent = getPageContent(`Billing`);
  res.render(`billing`, pageContent);
});

billingRouter.get(`/spot/:category/:baseCoin`, (req, res) => {
  const category = req.params[`category`];
  const baseCoin = req.params[`baseCoin`];
  const {pairs, summaryInfo, generalInfo} = getSpotData(category, baseCoin);
  const title = generalInfo.name;
  const pageContent = getPageContent(title);
  pageContent[`pairs`] = pairs;
  pageContent[`generalInfo`] = generalInfo;
  pageContent[`summaryInfo`] = summaryInfo;
  pageContent[`category`] = category;
  res.render(`./billing-tables/spot`, pageContent);
});

billingRouter.get(`/futures/:category`, (req, res) => {
  const category = req.params[`category`];
  const {pairs, generalInfo, summaryInfo} = getFuturesData(category);
  const title = generalInfo.name;
  const pageContent = getPageContent(title);
  pageContent[`pairs`] = pairs;
  pageContent[`generalInfo`] = generalInfo;
  pageContent[`summaryInfo`] = summaryInfo;
  res.render(`./billing-tables/futures`, pageContent);
});

billingRouter.get(`/futures-coin/:category/:baseCoin`, (req, res) => {
  const category = req.params[`category`];
  const baseCoin = req.params[`baseCoin`];
  const {pair, generalInfo, summaryInfo} = getFuturesCoinData(category, baseCoin);
  const title = generalInfo.name;
  const pageContent = getPageContent(title);
  pageContent[`pair`] = pair;
  pageContent[`generalInfo`] = generalInfo;
  pageContent[`summaryInfo`] = summaryInfo;
  res.render(`./billing-tables/futures-coin`, pageContent);
});

billingRouter.get(`/spot/orders/:category/:asset`, (req, res) => {
  const category = req.params[`category`];
  const asset = req.params[`asset`];
  const {orders, generalInfo} = getAssetData(asset, category);
  const title = generalInfo.name;
  res.render(`./billing-asset/spot`, {title, orders, generalInfo});
});

module.exports = billingRouter;
