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
const searchInput = document.getElementById('input-textbox');
const gallery = document.querySelector('.gallery');
const submitBtn = document.querySelector('button[type="submit"]');
const navLinksHome = document.querySelector('.home');
// console.log(navLinksHome);
const navLinksLibrary = document.querySelector('.library');
const navLinks = document.querySelectorAll('.nav-list-link');
console.log(navLinks);
const activePage = window.location.pathname;
console.log(activePage);
const navMenuList = document.querySelectorAll('.nav-bar');

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

//Elements in Navigation

/* function handleNavMenuClick(e) {
  navLinks.forEach(link => {
    if (link.href.includes(`${activePage}`)) {
      console.log(link.href);
      link.classList.add('active');
    }
  });
}

navMenuList.addEventListener('click', handleNavMenuClick); */
