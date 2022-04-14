import { get } from 'lodash';
import { async } from 'regenerator-runtime';
import { API, RES_PER_PAGE } from './config';
import { getJson } from './helpers';

export const state = {
  recipe: {},
  search: { query: '', results: {}, page: 1, perPage: RES_PER_PAGE },
};
export const loadReciep = async function (id) {
  try {
    const data = await getJson(API + id);
    const obj = data.data.recipe;
    state.recipe = {
      id: obj.id,
      image: obj.image_url,
      publisher: obj.publisher,
      ingredients: obj.ingredients,
      title: obj.title,
      servings: obj.servings,
      url: obj.source_url,
      time: obj.cooking_time,
    };
  } catch {
    err => {
      throw err;
    };
  }
};
export const searchResults = async function (searchKey) {
  try {
    const data = await getJson(API + `?search=${searchKey}`);
    const getArr = data.data.recipes;
    state.search.query = searchKey;
    state.search.results = getArr.map(val => {
      return {
        id: val.id,
        image: val.image_url,
        publisher: val.publisher,
        title: val.title,
      };
    });
  } catch (err) {
    throw err;
  }
};
export const paginationLogic = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.perPage;
  const end = page * state.search.perPage;
  return state.search.results.slice(start, end);
};

// const paginationLogic = function (page, all, step) {
//   if (step * page < all) {
//     let a = (page - 1) * step;
//     let b = page * step;
//     for (let i = a + 1; i <= b; i++) {
//       console.log(i);
//     }
//   } else {
//     alert('xato kiritdingiz');
//   }
// };
// let q = +prompt('page');
// let w = +prompt('all');
// let e = +prompt('step');
// paginationLogic(q, w, e);
