'use strict';

const moment = require(`moment`);

const BTC_CONTRACT_PRICE = 100; // USD
const OTHER_CONTRACT_PRICE = 10; // USD

const getContractPrice = (asset) => asset.includes(`BTC`) ? BTC_CONTRACT_PRICE : OTHER_CONTRACT_PRICE;

const getFuturesTradeCoinMAdapter = (futuresTradeCoinMInstance) => {
  const {
    id,
    orderId,
    symbol,
    // pair,
    side,
    price,
    qty,
    realizedPnl,
    marginAsset,
    // baseQty,
    commission,
    commissionAsset,
    time,
    // positionSide,
    // buyer,
    // maker,
  } = futuresTradeCoinMInstance;

  const total = parseFloat(qty) * getContractPrice(symbol) / parseFloat(price);

  return {
    id,
    orderId,
    date: moment(new Date(time)).format(`DD.MM.YYYY HH:mm:ss`),
    timestamp: time,
    symbol,
    type: side,
    price: parseFloat(price),
    amount: parseFloat(qty),
    total,
    realizedPnl: parseFloat(realizedPnl),
    marginCoin: marginAsset,
    fee: parseFloat(commission),
    feeCoin: commissionAsset,
  };
};

module.exports = getFuturesTradeCoinMAdapter;
