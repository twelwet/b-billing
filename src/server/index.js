'use strict';

require(`dotenv`).config();
const express = require(`express`);
const {getPrices} = require(`../services/node-binance-api/methods`);
const {
  balancesRouter,
  billingRouter,
  tradesRouter,
  cashFlowRouter,
} = require(`./routes`);

const app = express();
app.set(`json spaces`, 2);
app.use(express.json());

app.set(`views`, `./src/server/templates`);
app.set(`view engine`, `pug`);

app.use(`/balances`, balancesRouter);
app.use(`/billing`, billingRouter);
app.use(`/api/trades`, tradesRouter);
app.use(`/api/cash-flow`, cashFlowRouter);

app.get(`/info`, async (req, res) => {
  const result = await getPrices();
  res.json(result);
});

app.listen(
    process.env.SERVER_PORT,
    () => console.log(`Server starts on port: ${process.env.SERVER_PORT}`)
);
