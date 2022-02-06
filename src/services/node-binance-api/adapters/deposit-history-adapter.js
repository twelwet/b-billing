'use strict';

const moment = require(`moment`);

const getDepositHistoryAdapter = (depositEntryInstance) => {
  const {
    amount,
    coin,
    network,
    // status,
    address,
    // addressTag,
    txId,
    insertTime,
    transferType,
    // confirmTimes,
    // unlockConfirm,
  } = depositEntryInstance;

  return {
    date: moment(new Date(insertTime)).format(`DD.MM.YYYY HH:mm:ss`),
    amount: parseFloat(amount),
    coin,
    network,
    address,
    txId,
    transferType,
  };
};

module.exports = getDepositHistoryAdapter;
