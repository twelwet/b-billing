'use strict';

const fs = require(`fs`);
const {promisify} = require(`util`);
const csvToJson = require(`csvtojson`);
const {parse} = require(`json2csv`);

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

module.exports = {saveToFile, getJsonFromCsv, getCsvFromJson};
