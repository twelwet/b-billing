'use strict';

require(`dotenv`).config();
const express = require(`express`);
const {getPrices} = require(`../services/node-binance-api/methods`);
const {billingSpotRouter, billingFuturesRouter, billingFuturesCoinRouter} = require(`./routes`);
const getSpotTrades = require(`../services/node-binance-api/methods/spot/get-trades`);
const {saveToFile, getCsvFromJson} = require(`../scripts/utils`);
const {Field} = require(`../services/node-binance-api/methods/spot/constants`);

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

app.get(`/spot/trades`, async (req, res) => {
  const result = await getSpotTrades();
  await saveToFile(`data/row/spot-trades-row.csv`, await getCsvFromJson(result, Field.SPOT_TRADE));
  res.json({message: `${result.length} data entries are saved to 'data/row/spot-trades-row.csv'`});
});

app.listen(
    process.env.SERVER_PORT,
    () => console.log(`Server starts on port: ${process.env.SERVER_PORT}`)
);
