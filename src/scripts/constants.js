'use strict';

const FilePath = {
  Spot: {
    CSV: `data/csv/spot-trades-actual.csv`,
    JSON: `data/json/spot-trades-actual.json`,
  },
  SpotMutated: {
    CSV: `data/csv/spot-trades-mutated.csv`,
    JSON: `data/json/spot-trades-mutated.json`,
  },
  FuturesUsdM: {
    CSV: `data/csv/futures-trades-actual.csv`,
    JSON: `data/json/futures-trades-actual.json`,
  },
  FuturesCoinM: {
    CSV: `data/csv/futures-trades-coin-m-actual.csv`,
    JSON: `data/json/futures-trades-coin-m-actual.json`,
  },
};

const MutatedRule = {
  USDT: `BTC`,
  BTC: `USDT`,
};

module.exports = {FilePath, MutatedRule};
