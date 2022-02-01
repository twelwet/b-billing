'use strict';

const fs = require(`fs`);
const {promisify} = require(`util`);
const csvToJson = require(`csvtojson`);

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

module.exports = {saveToFile, getJsonFromCsv};
