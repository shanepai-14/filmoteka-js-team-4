import './js/modal.js';
import './js/header.js';
// import './js/header_library.js';

import {
  MovieController,
  getMoviesPopular,
  getMovieDetails,
} from './js/api.js';
import { API_KEY, BASE_URL, options } from './js/api.js';
import Notiflix from 'notiflix';
import { movieCard, movieCardHere } from './js/utils.js';

const movieContainer = document.querySelector('.movie-container');
const listLoader = document.querySelector('.loader');
const libraryListQ = document.querySelector('.libraryQ');
const libraryListW = document.querySelector('.libraryW');
const listPagination = document.querySelector('.is-hiddenPagination');
let currentPage = 1;

function displayResult(dataResult) {
  const finalResult = dataResult.map(result => {
    const year = result.release_date
      ? result.release_date.split('-')[0]
      : 'N/A';
    return movieCard(
      result.id,
      result.poster_path,
      result.title,
      result.genre_ids || [],
      year
    );
  });
  movieContainer.innerHTML = finalResult.join('');
}

function displayResultLibrary(dataResult) {
  listPagination.classList.add('is-hiddenPagination');
  const finalResult = dataResult.map(result => {
    const genre_ids = result.genres.map(genre => genre.id);
    const year = result.release_date
      ? result.release_date.split('-')
      : 'N/A';
    return movieCard(
      result.id,
      result.poster_path,
      result.title,
      genre_ids|| [],
      year,
      result.vote_average
    );
  });
  movieContainer.insertAdjacentHTML('beforeend', finalResult.join(''));
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('libraryBtn')) {
      const buttonText = e.target.textContent;
      const movieId = e.target.closest('.modalBtnContainer').dataset.id;
      let filmotekaWatchMovies = [];
      const movieData = { id: movieId };

      if (buttonText === 'Add to watched') {
        filmotekaWatchMovies =
          JSON.parse(localStorage.getItem('filmotekaWatchMovies')) || [];
      } else if (buttonText === 'Add to queue') {
        filmotekaWatchMovies =
          JSON.parse(localStorage.getItem('filmotekaQueueMovies')) || [];
      }

      const isMovieWatched = filmotekaWatchMovies.some(
        movie => movie.id === movieData.id
      );

      if (!isMovieWatched) {
        if (buttonText === 'Add to watched') {
          filmotekaWatchMovies.push(movieData);
          localStorage.setItem(
            'filmotekaWatchMovies',
            JSON.stringify(filmotekaWatchMovies)
          );
        } else if (buttonText === 'Add to queue') {
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
  } else if (x === 1) {
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

libraryListQ.addEventListener('click', () => {
  watchedListData(0);
});

libraryListW.addEventListener('click', () => {
  watchedListData(1);
});

watchedListData(0);
