'use strict';

const {Router} = require(`express`);
const getSpotData = require(`../../bill/spot`);
const {Category, BaseCoin} = require(`../../bill/constants`);

const billingSpotRouter = new Router();

billingSpotRouter.get(`/signal/${BaseCoin.BTC}`, (req, res) => {
  const {pairs, summaryInfo, generalInfo} = getSpotData(Category.Spot.SIGNAL, BaseCoin.BTC);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    summaryInfo,
    generalInfo,
  };
  res.render(`spot`, pageContent);
});

billingSpotRouter.get(`/signal/${BaseCoin.USDT}`, (req, res) => {
  const {pairs, summaryInfo, generalInfo} = getSpotData(Category.Spot.SIGNAL, BaseCoin.USDT);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    summaryInfo,
    generalInfo,
  };
  res.render(`spot`, pageContent);
});

billingSpotRouter.get(`/classic/${BaseCoin.BTC}`, (req, res) => {
  const {pairs, summaryInfo, generalInfo} = getSpotData(Category.Spot.CLASSIC, BaseCoin.BTC);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    summaryInfo,
    generalInfo,
  };
  res.render(`spot`, pageContent);
});

billingSpotRouter.get(`/classic/${BaseCoin.USDT}`, (req, res) => {
  const {pairs, summaryInfo, generalInfo} = getSpotData(Category.Spot.CLASSIC, BaseCoin.USDT);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    summaryInfo,
    generalInfo,
  };
  res.render(`spot`, pageContent);
});

module.exports = billingSpotRouter;
