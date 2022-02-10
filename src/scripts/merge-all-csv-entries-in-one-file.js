'use strict';

// script that merge all entries from the bunch of csv-files to one csv-file
const {mergeCsvFiles} = require(`./utils`);
const {Field} = require(`../services/node-binance-api/methods/constants`);

const FilePath = {
  DIRECTORY_PATH: `data/row/temp`,
  RESULT_PATH: `data/row/result.csv`,
};

mergeCsvFiles(FilePath.DIRECTORY_PATH, FilePath.RESULT_PATH, Field.SPOT_TRADE);
