'use strict';

const {Router} = require(`express`);

const balancesRouter = new Router();

balancesRouter.get(`/`, (req, res) => {
  const pageContent = {title: `Balances`};
  res.render(`balances`, pageContent);
});

module.exports = balancesRouter;
