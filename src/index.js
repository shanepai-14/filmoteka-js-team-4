import './js/modal.js';
import './js/header.js';
// import './js/header_library.js';

import { MovieController, getMoviesPopular } from './js/api.js';
import { API_KEY, BASE_URL, options } from './js/api.js';
import { movieCard } from './js/utils.js';

const movieContainer = document.querySelector('.movie-container');
const listLoader = document.querySelector('.loader');
let currentPage = 1;

async function movieList(page = 1) {
  listLoader.classList.remove('is-hidden');
  currentPage = 1;
  movieContainer.innerHTML = '';
  try {
    const queryResult = await getMoviesPopular(currentPage);
    console.log(queryResult);

    displayResult(queryResult.results);
    setupPagination(queryResult.total_results);
    listLoader.classList.add('is-hidden');
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

function displayResult(dataResult) {
  let finalResult = dataResult.map(result => {
    let year = result.release_date.split('-');
    return movieCard(
      result.id,
      result.poster_path,
      result.title,
      result.genre_ids,
      year
    );
  });
  movieContainer.innerHTML = finalResult.join('');
}

function setupPagination(total) {
  const maxItems = 1000 * 20;
  const limitedTotal = Math.min(total, maxItems);

  $('#pagination').pagination({
    dataSource: Array.from({ length: limitedTotal }, (_, i) => i + 1),
    pageSize: 20,
    callback: async function (data, pagination) {
      listLoader.classList.remove('is-hidden');
      currentPage = pagination.pageNumber;
      const queryResult = await getMoviesPopular(currentPage);
      displayResult(queryResult.results);
      listLoader.classList.add('is-hidden');
    },
  });
}

movieList();
