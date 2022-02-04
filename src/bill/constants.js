'use strict';

const Category = {
  Spot: {
    SIGNAL: `spot-signal`,
    CLASSIC: `spot-classic`,
  },
  Futures: {
    SIGNAL: `f-signal`,
    CLASSIC: `f-classic`,
    DENIS: `denis`,
  },
  FuturesCoin: {},
};

const Type = {BUY: `BUY`, SELL: `SELL`};

const TradeType = {OPENED: `opened`, CLOSED: `closed`};

const BaseCoin = {USDT: `USDT`, BTC: `BTC`};

module.exports = {Type, TradeType, Category, BaseCoin};
