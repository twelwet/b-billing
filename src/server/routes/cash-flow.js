'use strict';

const {Router} = require(`express`);
const {getWithdrawHistory, getDepositHistory} = require(`../../services/node-binance-api/methods`);
const {saveToFile, getCsvFromJson} = require(`../../scripts/utils`);
const {Field} = require(`../../services/node-binance-api/methods/constants`);

const cashFlowRouter = new Router();

cashFlowRouter.get(`/out`, async (req, res) => {
  const result = await getWithdrawHistory();
  await saveToFile(`data/row/cash-flow-out.csv`, await getCsvFromJson(result, Field.WITHDRAW));
  res.json(result);
});

cashFlowRouter.get(`/in`, async (req, res) => {
  const result = await getDepositHistory();
  await saveToFile(`data/row/cash-flow-in.csv`, await getCsvFromJson(result, Field.DEPOSIT));
  res.json(result);
});

module.exports = cashFlowRouter;
