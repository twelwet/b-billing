'use strict';

const fs = require(`fs`);
const {promisify} = require(`util`);
const csvToJson = require(`csvtojson`);
const {parse} = require(`json2csv`);
const {MutatedRule} = require(`./constants`);
const {getSumByField} = require(`../bill/bill-utils`);
const {getHistoricalSymbolPrice} = require(`../services/node-binance-api/methods`);

const saveToFile = async (path, data) => {
  const writeFile = promisify(fs.writeFile);
  try {
    await writeFile(path, data);
    console.log(`Operation success. File '${path}' is created.`);
  } catch (error) {
    console.log(`Error: Can't write data to file '${path}'.`);
  }
};

const getJsonFromCsv = (filename, delimiter = `,`) => {
  return csvToJson({delimiter})
    .fromFile(filename)
    .then((json) => json);
};

const getCsvFromJson = (jsonData, fields) => {
  const opts = {fields};

  try {
    return parse(jsonData, opts);
  } catch (err) {
    console.error(err);
    return err;
  }
};

const getFileList = async (path) => {
  const readDir = promisify(fs.readdir);
  try {
    return await readDir(path).then((filenames) => filenames);

  } catch (error) {
    console.log(`Error: Can't read data from '${path}'.`);
    return error;
  }
};

const mergeCsvFiles = (directoryPath, resultFilePath, rowNames, delimiter = `,`) => {
  getFileList(directoryPath).then(async (list) => {
    let result = [];
    for (const filename of list) {
      const fileEntries = await getJsonFromCsv(`${directoryPath}/${filename}`, delimiter);
      result = result.concat(fileEntries);
    }
    await saveToFile(resultFilePath, await getCsvFromJson(result, rowNames));
  });
};

const mutateTrade = async (trade) => {
  const markets = Object.keys(MutatedRule);
  for (const market of markets) {
    if (trade[`symbol`].endsWith(market)) {
      trade[`symbol`] = `${trade[`symbol`].substring(0, trade[`symbol`].length - market.length)}${MutatedRule[market]}`;
      trade[`price`] = await getHistoricalSymbolPrice(trade[`symbol`], trade[`timestamp`]);
      trade[`total`] = trade[`price`] * trade[`amount`];
      trade[`fee`] = trade[`total`] / 1000;
      trade[`feeCoin`] = MutatedRule[trade[`baseCoin`]];
      trade[`baseCoin`] = MutatedRule[trade[`baseCoin`]];
      return trade;
    }
  }
  return {};
};

const mutateTrades = async (trades) => {
  for (const [index, trade] of trades.entries()) {
    await mutateTrade(trade);
    console.log(`${index + 1} entry of ${trades.length} entries is completed.`);
  }
  return trades;
};

const getOrders = (trades) => {
  const orderIds = [...(new Set(trades.map((trade) => trade[`orderId`])))];
  const orders = [];
  for (const orderId of orderIds) {
    const tradesInOrder = trades.filter((trade) => trade[`orderId`] === orderId);
    const {
      date, timestamp, symbol, type, feeCoin, category, period, baseCoin, isShift, note, tradeType
    } = tradesInOrder[0];
    const amount = getSumByField(tradesInOrder, `amount`);
    const total = getSumByField(tradesInOrder, `total`);
    const fee = getSumByField(tradesInOrder, `fee`);
    const price = total / amount;
    orders.push({
      date, timestamp, symbol, type, price, amount, total, fee, feeCoin, category, period, baseCoin, isShift, note, orderId, tradeType,
    });
  }
  return orders;
};

module.exports = {saveToFile, getJsonFromCsv, getCsvFromJson, mergeCsvFiles, mutateTrades, getOrders};
