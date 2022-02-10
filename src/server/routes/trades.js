'use strict';

const {Router} = require(`express`);
const {getSpotTrades, getFuturesTrades, getFuturesCoinTrades, divideSymbolsToGroups} = require(`../../services/node-binance-api/methods`);
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

// TODO temporary route to find all trades in spot market
const getPath = (groupNumber, entriesQuantiy) => entriesQuantiy === 0
  ? `data/row/temp/null-spot-trades-row-00${groupNumber}`
  : `data/row/temp/spot-trades-row-00${groupNumber}`;

tradesRouter.get(`/spot/:groupNumber`, async (req, res) => {
  const groupNumber = req.params[`groupNumber`];
  const groups = await divideSymbolsToGroups(50);
  const group = groups[groupNumber];
  const result = await getSpotTrades(group);
  const entriesQuantity = result.length;
  const path = getPath(groupNumber, entriesQuantity);
  await saveToFile(path, await getCsvFromJson(result, Field.SPOT_TRADE));
  res.json({message: `${result.length} data entries are saved to '${path}', quantity of groups: ${groups.length}`});
});

module.exports = tradesRouter;
