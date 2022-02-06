'use strict';

require(`dotenv`).config();
const express = require(`express`);
const {getPrices} = require(`../services/node-binance-api/methods`);
const {
  billingSpotRouter,
  billingFuturesRouter,
  billingFuturesCoinRouter,
  tradesRouter,
} = require(`./routes`);

const app = express();
app.set(`json spaces`, 2);
app.use(express.json());

app.set(`views`, `./src/server/templates`);
app.set(`view engine`, `pug`);

app.use(`/billing/spot`, billingSpotRouter);
app.use(`/billing/futures`, billingFuturesRouter);
app.use(`/billing/futures-coin`, billingFuturesCoinRouter);
app.use(`/trades`, tradesRouter);

app.get(`/info`, async (req, res) => {
  const result = await getPrices();
  res.json(result);
});

app.listen(
    process.env.SERVER_PORT,
    () => console.log(`Server starts on port: ${process.env.SERVER_PORT}`)
);
