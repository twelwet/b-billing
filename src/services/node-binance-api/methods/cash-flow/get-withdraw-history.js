'use strict';

const {withdrawHistory} = require(`../../service`);
const getWithdrawHistoryAdapter = require(`../../adapters/withdraw-history-adapter`);

const getWithdrawHistory = () => withdrawHistory()
  .then((history) => history.map((entry) => getWithdrawHistoryAdapter(entry)));

module.exports = getWithdrawHistory;
