'use strict';

const {Router} = require(`express`);
const getFuturesData = require(`../../bill/f-usdt`);

const billingFuturesRouter = new Router();

billingFuturesRouter.get(`/signal`, (req, res) => {
  const {pairs, generalInfo, summaryInfo} = getFuturesData(`f-signal`);
  const pageContent = {
    title: generalInfo.name,
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
    pairs,
    generalInfo,
    summaryInfo,
  };
  res.render(`futures`, pageContent);
});

module.exports = billingFuturesRouter;
