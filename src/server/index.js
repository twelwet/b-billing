'use strict';

require(`dotenv`).config();
const express = require(`express`);
const {getPrices} = require(`../services/node-binance-api/methods`);
const getSpotData = require(`../bill-spot`);
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
  const pageContent = {
    title: Category.SIGNAL,
    data: getSpotData(Category.SIGNAL, BaseCoin.BTC),
  };
  res.render(`spot`, pageContent);
});

app.get(`/billing/spot/signal/${BaseCoin.USDT}`, (req, res) => {
  const pageContent = {
    title: Category.SIGNAL,
    data: getSpotData(Category.SIGNAL, BaseCoin.USDT),
  };
  res.render(`spot`, pageContent);
});

app.get(`/billing/spot/classic/${BaseCoin.BTC}`, (req, res) => {
  const pageContent = {
    title: Category.CLASSIC,
    data: getSpotData(Category.CLASSIC, BaseCoin.BTC),
  };
  res.render(`spot`, pageContent);
});

app.get(`/billing/spot/classic/${BaseCoin.USDT}`, (req, res) => {
  const pageContent = {
    title: Category.CLASSIC,
    data: getSpotData(Category.CLASSIC, BaseCoin.USDT),
  };
  res.render(`spot`, pageContent);
});

app.listen(
    process.env.SERVER_PORT,
    () => console.log(`Server starts on port: ${process.env.SERVER_PORT}`)
);
