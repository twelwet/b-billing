'use strict';

const express = require(`express`);

const app = express();
app.set(`json spaces`, 2);
app.use(express.json());

app.get(`/info`, (req, res) => {
  res.json({info: `Hello world!`});
});

app.listen(
  8080,
  () => console.log(`Server starts on port: 8080`)
);
