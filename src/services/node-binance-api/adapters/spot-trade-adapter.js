'use strict';

const moment = require(`moment`);
const {Type} = require(`../../../bill/constants`);

const getSpotTradeAdapter = (symbol, spotTradeInstance) => {
  const {
    id,
    orderId,
    price,
    qty,
    commission,
    commissionAsset,
    time,
    isBuyer,
    // isMaker,
    // isBestMatch
  } = spotTradeInstance;

  const priceFloat = parseFloat(price);
  const qtyFloat = parseFloat(qty);
  const totalFloat = priceFloat * qtyFloat;
  const commissionFloat = parseFloat(commission);

  return {
    id,
    orderId,
    date: moment(new Date(time)).format(`DD.MM.YYYY HH:mm:ss`),
    timestamp: time,
    market: symbol,
    type: isBuyer ? Type.BUY : Type.SELL,
    price: priceFloat,
    amount: qtyFloat,
    total: totalFloat,
    fee: commissionFloat,
    feeCoin: commissionAsset,
  };
};

module.exports = getSpotTradeAdapter;
