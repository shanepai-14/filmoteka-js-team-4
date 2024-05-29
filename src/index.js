import './js/modal.js';
import './js/header.js';
import './js/upcoming.js';
// import './js/header_library.js';

import {
  MovieController,
  getMoviesPopular,
  getMovieDetails,
  searchMovies,
} from './js/api.js';
import Notiflix from 'notiflix';
import { movieCard, movieCardHere } from './js/utils.js';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('input-textbox-home');
const movieContainer = document.querySelector('.movie-container');
const listLoader = document.querySelector('.loader');
const listPagination = document.querySelector('.is-hiddenPagination');
let currentPage = 1;

async function movieList(page = 1) {
  listLoader.classList.remove('is-hidden');
  currentPage = 1;
  movieContainer.innerHTML = '';
  try {
    const queryResult = await getMoviesPopular(currentPage);
    // console.log(queryResult);

    displayResult(queryResult.results);
    setupPagination(queryResult.total_results);
    listLoader.classList.add('is-hidden');
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

function displayResult(dataResult) {
  if(dataResult.length === 0) {
    movieList();
    return;
  }
  let finalResult = dataResult.map(result => {
    let year = result.release_date.split('-');
    return movieCard(
      result.id,
      result.poster_path,
      result.title,
      result.genre_ids,
      year,
      result.vote_average
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
      listPagination.classList.add('is-hiddenPagination');
      listLoader.classList.remove('is-hidden');
      currentPage = pagination.pageNumber;
      const queryResult = await getMoviesPopular(currentPage);
      displayResult(queryResult.results);
      listLoader.classList.add('is-hidden');
      listPagination.classList.remove('is-hiddenPagination');
    },
  });
}
function setupSearchPagination(total,searchTerm) {
  const maxItems = 1000 * 20;
  const limitedTotal = Math.min(total, maxItems);

  $('#pagination').pagination({
    dataSource: Array.from({ length: limitedTotal }, (_, i) => i + 1),
    pageSize: 20,
    callback: async function (data, pagination) {
      listPagination.classList.add('is-hiddenPagination');
      listLoader.classList.remove('is-hidden');
      currentPage = pagination.pageNumber;
      const queryResult = await searchMovies(searchTerm,currentPage); 
      displayResult(queryResult.results);
      listLoader.classList.add('is-hidden');
      listPagination.classList.remove('is-hiddenPagination');
    },
  });
}
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form submission

  const searchTerm = searchInput.value.trim(); 
  // console.log(searchTerm)// Get the search term
  movieContainer.innerHTML = '';
   let page = 1;
  if (searchTerm) {
    try {
      const movies = await searchMovies(searchTerm,page); // Call your searchMovies function
      // console.log(movies.results);
      displayResult(movies.results);
      setupSearchPagination(movies.total_results,searchTerm);
      // setupPagination(movies.total_results);
    } catch (error) {
      console.error('Error searching movies:', error);
  
    }
  } else {

  }
});
window.addEventListener("load", (event) => {
  movieList();
});





