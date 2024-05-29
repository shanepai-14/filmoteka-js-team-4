import './js/modal.js';
import './js/header.js';
import './js/upcoming.js';


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
const libraryList = document.querySelector('.library');
const libraryListQ = document.querySelector('.libraryQ');
const libraryListW = document.querySelector('.libraryW');
const search_error = document.querySelector('.search_error');
search_error.classList.add('display-none')
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
     const  dataResult =movies.results;
      if(dataResult.length === 0) {
        search_error.classList.remove('display-none');
        search_error.classList.add('display-block')
        movieList();
        return;
      }
      search_error.classList.remove('display-block');
      search_error.classList.add('display-none');

    } catch (error) {
      console.error('Error searching movies:', error);
  
    }
  } else {

  }
});

function displayResultLibrary(dataResult) {
  listPagination.classList.add('is-hiddenPagination');
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
  movieContainer.insertAdjacentHTML('beforeend', finalResult.join(''));
}
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('libraryBtn')) {
      const buttonText = e.target.textContent;
      const movieId = e.target.closest('.modalBtnContainer');
      let filmotekaWatchMovies = '';
      const movieData = {
        id: movieId.dataset.id,
      };

      if (buttonText === 'Add to watched') {
        filmotekaWatchMovies =
          JSON.parse(localStorage.getItem('filmotekaWatchMovies')) || [];
      }
      if (buttonText === 'Add to queue') {
        filmotekaWatchMovies =
          JSON.parse(localStorage.getItem('filmotekaQueueMovies')) || [];
      }

      const isMovieWatched = filmotekaWatchMovies.some(
        filmotekaWatchMovies => filmotekaWatchMovies.id === movieData.id
      );

      if (!isMovieWatched) {
        if (buttonText === 'Add to watched') {
          filmotekaWatchMovies.push(movieData);
          localStorage.setItem(
            'filmotekaWatchMovies',
            JSON.stringify(filmotekaWatchMovies)
          );
        }
        if (buttonText === 'Add to queue') {
          filmotekaWatchMovies.push(movieData);
          localStorage.setItem(
            'filmotekaQueueMovies',
            JSON.stringify(filmotekaWatchMovies)
          );
        }

        Notiflix.Notify.success('Successfully added to the List!');
      } else {
        Notiflix.Notify.info('This Movie is already added.');
      }
    }
  });
});
async function watchedListData(x) {
  let watchedMoviesShow = '';
  if (x === 0) {
    watchedMoviesShow =
      JSON.parse(localStorage.getItem('filmotekaWatchMovies')) || [];
  }
  if (x === 1) {
    watchedMoviesShow =
      JSON.parse(localStorage.getItem('filmotekaQueueMovies')) || [];
  }
  if (watchedMoviesShow.length === 0) {
    Notiflix.Notify.info('No watch movies to display.');
    return;
  }

  listLoader.classList.remove('is-hidden');

  movieContainer.innerHTML = '';
  for (const movie of watchedMoviesShow) {

    try {
      const searchResult = await getMovieDetails(movie.id);
      displayResultLibrary([searchResult]);



    } catch (error) {
      console.error('Error fetching list:', error);

    }
  }
  listLoader.classList.add('is-hidden');
}
libraryList.addEventListener('click', () => {
  watchedListData(0);
});

// libraryListQ.addEventListener('click', () => {
//   watchedListData(1);
// });

// libraryListW.addEventListener('click', () => {
//   watchedListData(0);
// });

window.addEventListener("load", (event) => {
  movieList();
});





