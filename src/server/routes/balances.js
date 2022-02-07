'use strict';

const {Router} = require(`express`);
const balances = require(`../../balances`);

const balancesRouter = new Router();

balancesRouter.get(`/`, (req, res) => {
  const pageContent = {title: `Balances`};
  res.render(`balances`, pageContent);
});

balancesRouter.get(`/spot-signal`, (req, res) => {
  const title = `Spot-signal balances`;
  const data = balances.spot.signal;
  const pageContent = {title, data};
  res.render(`./balances-tables/table`, pageContent);
});

module.exports = balancesRouter;
