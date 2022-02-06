'use strict';

const {Router} = require(`express`);
const {getWithdrawHistory} = require(`../../services/node-binance-api/methods`);
const {saveToFile, getCsvFromJson} = require(`../../scripts/utils`);
const {Field} = require(`../../services/node-binance-api/methods/constants`);

const cashFlowRouter = new Router();

cashFlowRouter.get(`/out`, async (req, res) => {
  const result = await getWithdrawHistory();
  await saveToFile(`data/row/cash-flow-out.csv`, await getCsvFromJson(result, Field.WITHDRAW));
  res.json(result);
});

module.exports = cashFlowRouter;
