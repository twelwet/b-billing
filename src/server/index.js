'use strict';

require(`dotenv`).config();
const express = require(`express`);
const {getPrices, getSpotTrades, getFuturesTrades} = require(`../services/node-binance-api/methods`);
const {billingSpotRouter, billingFuturesRouter, billingFuturesCoinRouter} = require(`./routes`);
const {saveToFile, getCsvFromJson} = require(`../scripts/utils`);
const {Field} = require(`../services/node-binance-api/methods/constants`);

const app = express();
app.set(`json spaces`, 2);
app.use(express.json());

app.set(`views`, `./src/server/templates`);
app.set(`view engine`, `pug`);

app.use(`/billing/spot`, billingSpotRouter);
app.use(`/billing/futures`, billingFuturesRouter);
app.use(`/billing/futures-coin`, billingFuturesCoinRouter);

app.get(`/info`, async (req, res) => {
  const result = await getPrices();
  res.json(result);
});

app.get(`/trades/spot`, async (req, res) => {
  const result = await getSpotTrades();
  await saveToFile(`data/row/spot-trades-row.csv`, await getCsvFromJson(result, Field.SPOT_TRADE));
  res.json({message: `${result.length} data entries are saved to 'data/row/spot-trades-row.csv'`});
});

app.get(`/trades/futures`, async (req, res) => {
  const result = await getFuturesTrades();
  await saveToFile(`data/row/futures-trades-row.csv`, await getCsvFromJson(result, Field.FUTURES_TRADE));
  res.json({message: `${result.length} data entries are saved to 'data/row/futures-trades-row.csv'`});
});

app.listen(
    process.env.SERVER_PORT,
    () => console.log(`Server starts on port: ${process.env.SERVER_PORT}`)
);
