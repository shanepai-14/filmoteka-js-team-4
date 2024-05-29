// import { options } from './api.js';
import { BASE_URL, API_KEY } from './api.js';
import {
  getMoviesPopular,
  searchMovies,
  getMovieDetails,
  MovieController,
} from './api.js';
import axios from 'axios';
import basiclightbox from 'basiclightbox';
import { Notify } from 'notiflix';
import { ModalLightbox, getGenreNamesByIds } from './utils.js';
import throttle from 'lodash.throttle';

//Elements in header2.html
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('input-textbox-home');
const gallery = document.querySelector('.gallery');
const submitBtn = document.querySelector('button[type="submit"]');
const navLinkLists = document.querySelectorAll('.nav-list-link');
console.log(navLinkLists);

//Elements in index.html
export const options = {
  params: {
    api_key: API_KEY,
    query: '',
    genre_ids: [],
    id: 786892,
    original_title: '',
    page: '',
    popularity: '',
    adult: '',
    total_results: '',
  },
};

function handleSubmit(e) {
  e.preventDefault();
  options.params.query = searchInput.value.toLowerCase().trim();
  // console.log(options.params.query);
  MovieController(options.params.query, options.params.page);
}
searchForm.addEventListener('submit', handleSubmit);

navLinkLists.forEach(navLinkList => {
  navLinkList.addEventListener('click', e => {
    // e.preventDefault();
    document.querySelector('.active')?.classList.remove('active');
    navLinkList.classList.add('active');
  });
});
