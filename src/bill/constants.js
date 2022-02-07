'use strict';

const Direction = {
  SPOT: `spot`,
  FUTURES: `futures`,
  FUTURES_COIN: `futures-coin`,
};

const Category = {
  Spot: {
    SIGNAL: `spot-signal`,
    CLASSIC: `spot-classic`,
  },
  Futures: {
    SIGNAL: `f-signal`,
    CLASSIC: `f-classic`,
    DENIS: `f-denis`,
  },
  FuturesCoin: {
    SIGNAL: `f-coin-signal`,
    CLASSIC: `f-coin-classic`,
  },
};

const BaseCoin = {
  Spot: {USDT: `USDT`, BTC: `BTC`},
  Futures: {USDT: `USDT`},
  FuturesCoin: {TRX: `TRXUSD_PERP`, BTC: `BTCUSD_PERP`, ETH: `EHTUSD_PERP`}
};

const Type = {BUY: `BUY`, SELL: `SELL`};

const TradeType = {OPENED: `opened`, CLOSED: `closed`};

module.exports = {Direction, Type, TradeType, Category, BaseCoin};
