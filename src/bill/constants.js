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
  FuturesCoin: {
    SIGNAL: `f-signal`,
    CLASSIC: `f-classic`,
  },
};

const BaseCoin = {
  Spot: {USDT: `USDT`, BTC: `BTC`},
  Futures: {USDT: `USDT`},
  FuturesCoin: {TRX: `TRXUSD_PERP`, BTC: `BTCUSD_PERP`, ETH: `EHTUSD_PERP`}
};

const Type = {BUY: `BUY`, SELL: `SELL`};

const TradeType = {OPENED: `opened`, CLOSED: `closed`};

module.exports = {Type, TradeType, Category, BaseCoin};
