'use strict';

require(`dotenv`).config();
const express = require(`express`);
const {getPrices} = require(`../services/node-binance-api/methods`);
const getSpotData = require(`../bill-spot`);
const getFuturesData = require(`../bill-f-usdt`);
const {Category, BaseCoin} = require(`../bill-spot/constants`);

const app = express();
app.set(`json spaces`, 2);
app.use(express.json());

app.set(`views`, `./src/server/templates`);
app.set(`view engine`, `pug`);

app.get(`/info`, async (req, res) => {
  const result = await getPrices();
  res.json(result);
});

app.get(`/billing/spot/signal/${BaseCoin.BTC}`, (req, res) => {
  const {pairs, summaryInfo, generalInfo} = getSpotData(Category.SIGNAL, BaseCoin.BTC);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    summaryInfo,
    generalInfo,
  };
  res.render(`spot`, pageContent);
});

app.get(`/billing/spot/signal/${BaseCoin.USDT}`, (req, res) => {
  const {pairs, summaryInfo, generalInfo} = getSpotData(Category.SIGNAL, BaseCoin.USDT);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    summaryInfo,
    generalInfo,
  };
  res.render(`spot`, pageContent);
});

app.get(`/billing/spot/classic/${BaseCoin.BTC}`, (req, res) => {
  const {pairs, summaryInfo, generalInfo} = getSpotData(Category.CLASSIC, BaseCoin.BTC);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    summaryInfo,
    generalInfo,
  };
  res.render(`spot`, pageContent);
});

app.get(`/billing/spot/classic/${BaseCoin.USDT}`, (req, res) => {
  const {pairs, summaryInfo, generalInfo} = getSpotData(Category.CLASSIC, BaseCoin.USDT);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    summaryInfo,
    generalInfo,
  };
  res.render(`spot`, pageContent);
});

app.get(`/billing/futures/classic`, (req, res) => {
  const {pairs, generalInfo} = getFuturesData(`f-classic`);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    generalInfo,
  };
  res.render(`futures`, pageContent);
});

app.listen(
    process.env.SERVER_PORT,
    () => console.log(`Server starts on port: ${process.env.SERVER_PORT}`)
);
