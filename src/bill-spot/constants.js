'use strict';

const Category = {
  SIGNAL: `spot-signal`,
  CLASSIC: `spot-classic`,
};

const Type = {BUY: `BUY`, SELL: `SELL`};

const TradeType = {OPENED: `opened`, CLOSED: `closed`};

const BaseCoin = {USDT: `USDT`, BTC: `BTC`};

module.exports = {Type, TradeType, Category, BaseCoin};
