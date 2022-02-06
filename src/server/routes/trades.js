'use strict';

const {Router} = require(`express`);
const {getSpotTrades, getFuturesTrades, getFuturesCoinTrades} = require(`../../services/node-binance-api/methods`);
const {saveToFile, getCsvFromJson} = require(`../../scripts/utils`);
const {Field} = require(`../../services/node-binance-api/methods/constants`);

const tradesRouter = new Router();

tradesRouter.get(`/spot`, async (req, res) => {
  const result = await getSpotTrades();
  await saveToFile(`data/row/spot-trades-row.csv`, await getCsvFromJson(result, Field.SPOT_TRADE));
  res.json({message: `${result.length} data entries are saved to 'data/row/spot-trades-row.csv'`});
});

tradesRouter.get(`/futures`, async (req, res) => {
  const result = await getFuturesTrades();
  await saveToFile(`data/row/futures-trades-row.csv`, await getCsvFromJson(result, Field.FUTURES_TRADE));
  res.json({message: `${result.length} data entries are saved to 'data/row/futures-trades-row.csv'`});
});

tradesRouter.get(`/futures-coin`, async (req, res) => {
  const result = await getFuturesCoinTrades();
  await saveToFile(`data/row/futures-trades-coin-m-row.csv`, await getCsvFromJson(result, Field.FUTURES_TRADE_COIN_M));
  res.json({message: `${result.length} data entries are saved to 'data/row/futures-trades-coin-m-row.csv'`});
});

module.exports = tradesRouter;
