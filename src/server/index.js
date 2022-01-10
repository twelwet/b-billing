'use strict';

require(`dotenv`).config();
const express = require(`express`);

const app = express();
app.set(`json spaces`, 2);
app.use(express.json());

app.get(`/info`, (req, res) => {
  res.json({info: `Hello world!`});
});

app.listen(
  process.env.SERVER_PORT,
  () => console.log(`Server starts on port: ${process.env.SERVER_PORT}`)
);
