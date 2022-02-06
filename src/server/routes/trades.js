'use strict';

const {Router} = require(`express`);
const {getSpotTrades, getFuturesTrades, getFuturesCoinTrades} = require(`../../services/node-binance-api/methods`);
const {saveToFile, getCsvFromJson} = require(`../../scripts/utils`);
const {Field} = require(`../../services/node-binance-api/methods/constants`);

const subRoute = [
  {
    name: `spot`,
    filePath: `data/row/spot-trades-row.csv`,
    fields: Field.SPOT_TRADE,
    api: getSpotTrades,
  },
  {
    name: `futures`,
    filePath: `data/row/futures-trades-row.csv`,
    fields: Field.FUTURES_TRADE,
    api: getFuturesTrades,
  },
  {
    name: `futures-coin`,
    filePath: `data/row/futures-trades-coin-m-row.csv`,
    fields: Field.FUTURES_TRADE_COIN_M,
    api: getFuturesCoinTrades,
  },
];

const tradesRouter = new Router();

for (const item of subRoute) {
  tradesRouter.get(`/${item.name}`, async (req, res) => {
    const result = await item.api();
    await saveToFile(`${item.filePath}`, await getCsvFromJson(result, item.fields));
    res.json({message: `${result.length} data entries are saved to '${item.filePath}'`});
  });
}

module.exports = tradesRouter;
