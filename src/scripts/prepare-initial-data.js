'use strict';

const {saveToFile, getJsonFromCsv} = require(`./utils`);
const {FilePath} = require(`./constants`);

const prepareJson = (pathToCsvFile, resultPath) => {
  getJsonFromCsv(pathToCsvFile)
    .then((data) => saveToFile(resultPath, JSON.stringify(data)));
};

prepareJson(FilePath.Spot.CSV, FilePath.Spot.JSON);
prepareJson(FilePath.SpotMutated.CSV, FilePath.SpotMutated.JSON);
prepareJson(FilePath.FuturesUsdM.CSV, FilePath.FuturesUsdM.JSON);
prepareJson(FilePath.FuturesCoinM.CSV, FilePath.FuturesCoinM.JSON);
