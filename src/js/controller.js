const { async } = require('regenerator-runtime');
import { loadReciep, state, searchResults, paginationLogic } from './model.js';
import recipeView from './views/reciepView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
const showRepset = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.loadingSppiner();
    await loadReciep(id);
    data = state.recipe;
    recipeView.render(data);
  } catch (err) {
    recipeView.renderError();
    throw err;
  }
};
const searchController = async function () {
  const inputValue = searchView.getQuery();
  await searchResults(inputValue);
  const data = paginationLogic(6);
  ResultsView.render(data);
  paginationView.render(state.search);
};
const paginationController = async function () {
  try {
    const data = paginationLogic();
    paginationView.render(paginationLogic.state.search);
    ResultsView.render(data);
  } catch (err) {
    throw err;
  }
};
searchView.addHandlerEvent(searchController);
recipeView.addHundler(showRepset);
paginationView.addHundlerEvent(paginationController);
