'use strict';

const moment = require(`moment`);

const getFuturesTradeAdapter = (futuresTradeInstance) => {
  const {
    id,
    orderId,
    time,
    symbol,
    side,
    price,
    qty,
    realizedPnl,
    marginAsset,
    quoteQty,
    commission,
    commissionAsset,
    positionSide,
    buyer,
    maker,
  } = futuresTradeInstance;

  return {
    id,
    orderId,
    date: moment(new Date(time)).format(`DD.MM.YYYY HH:mm:ss`),
    timestamp: time,
    symbol,
    type: side,
    price: parseFloat(price),
    quoteAmount: parseFloat(quoteQty),
    amount: parseFloat(qty),
    total: parseFloat(price) * parseFloat(qty),
    realizedPnl: parseFloat(realizedPnl),
    marginCoin: marginAsset,
    fee: parseFloat(commission),
    feeCoin: commissionAsset,
    positionSide,
    buyer,
    maker,
  };
};

module.exports = getFuturesTradeAdapter;
