'use strict';

const moment = require(`moment`);

const getWithdrawHistoryAdapter = (withdrawEntryInstance) => {
  const {
    // id,
    amount,
    transactionFee,
    coin,
    status,
    address,
    txId,
    applyTime,
    network,
    transferType,
  } = withdrawEntryInstance;

  return {
    date: moment(new Date(applyTime)).format(`DD.MM.YYYY HH:mm:ss`),
    amount: parseFloat(amount),
    coin,
    network,
    transactionFee: parseFloat(transactionFee),
    address,
    txId,
    transferType,
    status,
  };
};

module.exports = getWithdrawHistoryAdapter;
