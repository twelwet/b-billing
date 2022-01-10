'use strict';

require(`dotenv`).config();
const express = require(`express`);
const {getPrices} = require(`../services/node-binance-api/methods`);

const app = express();
app.set(`json spaces`, 2);
app.use(express.json());

app.get(`/info`, async (req, res) => {
  const result = await getPrices();
  res.json(result);
});

app.listen(
    process.env.SERVER_PORT,
    () => console.log(`Server starts on port: ${process.env.SERVER_PORT}`)
);
