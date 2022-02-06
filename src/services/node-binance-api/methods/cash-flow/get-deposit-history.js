'use strict';

const {depositHistory} = require(`../../service`);
const getDepositHistoryAdapter = require(`../../adapters/deposit-history-adapter`);

const getDepositHistory = () => depositHistory()
  .then((history) => history.map((entry) => getDepositHistoryAdapter(entry)));

module.exports = getDepositHistory;
