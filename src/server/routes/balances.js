'use strict';

const {Router} = require(`express`);
const balances = require(`../../balances`);
const {Category} = require(`../../bill/constants`);

const sortByAsset = ((a, b) => {
  if (a[`asset`] < b[`asset`]) {
    return -1;
  }
  if (a[`asset`] > b[`asset`]) {
    return 1;
  }
  return 0;
});

const balancesRouter = new Router();

balancesRouter.get(`/`, (req, res) => {
  const pageContent = {title: `Balances`};
  res.render(`balances`, pageContent);
});

const categories = Object.keys(balances);

for (const category of categories) {
  balancesRouter.get(`/${category}`, (req, res) => {
    const data = balances[`${category}`];
    if (category === Category.Spot.CLASSIC) {
      data.sort(sortByAsset);
    }
    const title = `${category} balance`;
    const pageContent = {data, category, title};
    res.render(`./balances-tables/table`, pageContent);
  });
}

module.exports = balancesRouter;
