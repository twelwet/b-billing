'use strict';

const {prices} = require(`../../service`);

const getPrices = () => prices()
  .then((allPrices) => {
    const result = {};

    for (const symbol in allPrices) {
      if (Object.prototype.hasOwnProperty.call(allPrices, symbol)) {
        result[symbol] = parseFloat(allPrices[symbol]);
      }
    }
    return result;
  })
  .catch((error) => ({error: error.message}));

module.exports = getPrices;
