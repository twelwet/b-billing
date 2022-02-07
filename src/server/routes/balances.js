'use strict';

const {Router} = require(`express`);

const balancesRouter = new Router();

balancesRouter.get(`/`, (req, res) => {
  res.render(`balances`);
});

module.exports = balancesRouter;
