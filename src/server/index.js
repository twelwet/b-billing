'use strict';

require(`dotenv`).config();
const express = require(`express`);
const {getPrices} = require(`../services/node-binance-api/methods`);
const getSpotData = require(`../bill/spot`);
const getFuturesData = require(`../bill/f-usdt`);
const getFuturesCoinData = require(`../bill/f-coin`);
const {Category, BaseCoin} = require(`../bill/constants`);

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

app.get(`/billing/futures/signal`, (req, res) => {
  const {pairs, generalInfo, summaryInfo} = getFuturesData(`f-signal`);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    generalInfo,
    summaryInfo,
  };
  res.render(`futures`, pageContent);
});

app.get(`/billing/futures/classic`, (req, res) => {
  const {pairs, generalInfo, summaryInfo} = getFuturesData(`f-classic`);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    generalInfo,
    summaryInfo,
  };
  res.render(`futures`, pageContent);
});

app.get(`/billing/futures/denis`, (req, res) => {
  const {pairs, generalInfo, summaryInfo} = getFuturesData(`denis`);
  const pageContent = {
    title: generalInfo.name,
    pairs,
    generalInfo,
    summaryInfo,
  };
  res.render(`futures`, pageContent);
});

app.get(`/billing/futures-coin/classic/TRX`, (req, res) => {
  const {pair, generalInfo} = getFuturesCoinData(`f-classic`, `TRXUSD_PERP`);
  const pageContent = {
    title: generalInfo.name,
    generalInfo,
    pair,
  };
  res.render(`futures-coin`, pageContent);
});

app.get(`/billing/futures-coin/signal/BTC`, (req, res) => {
  const {pair, generalInfo} = getFuturesCoinData(`f-signal`, `BTCUSD_PERP`);
  const pageContent = {
    title: generalInfo.name,
    generalInfo,
    pair,
  };
  res.render(`futures-coin`, pageContent);
});

app.get(`/billing/futures-coin/classic/ETH`, (req, res) => {
  const {pair, generalInfo} = getFuturesCoinData(`f-classic`, `ETHUSD_PERP`);
  const pageContent = {
    title: generalInfo.name,
    generalInfo,
    pair,
  };
  res.render(`futures-coin`, pageContent);
});

app.listen(
    process.env.SERVER_PORT,
    () => console.log(`Server starts on port: ${process.env.SERVER_PORT}`)
);
