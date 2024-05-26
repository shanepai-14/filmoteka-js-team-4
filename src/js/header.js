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
``;

//Elements in header2.html
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('input-textbox');
const gallery = document.querySelector('.gallery');
const submitBtn = document.querySelector('button[type="submit"]');
const navLinksHome = document.querySelector('.home');
console.log(navLinksHome);
const navLinksLibrary = document.querySelector('.library');
const navLists = document.querySelectorAll('.nav-list-link');
console.log(navLists);
const activePage = window.location.pathname;
console.log(activePage);
// const navMenuList = document.querySelectorAll('nav-menu-list');

function activeLinkHome(e) {
  e.preventDefault();

  if (navLinksHome.includes(`${activePage}`))
    navLinksLibrary.classList.remove('active');
  navLinksHome.classList.add('active');
}
navLinksHome.addEventListener('click', activeLinkHome);
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
    results: [],
  },
};

function handleSubmit(e) {
  e.preventDefault();
  options.params.query = searchInput.value.toLowerCase().trim();
  console.log(options.params.query);

  if (options.params.query === '')
    return Notify.failure('Please enter correct details');
  MovieController(options.params.query, '');
}
searchForm.addEventListener('submit', handleSubmit);

//Elements in Navigation
/* function activeListLink(e) {
  e.preventDefault();
  alert('Active Link');
    navLists.forEach(navList => {
    // const activePage = new URL(navLink.href).pathname;
    if (navList.href.includes(`{activePage}`)) navList.classList.add('active');
  });
} */

// navLinks.addEventListener('click', activeLink);
// if (navLinksLibrary.href.includes(`${activePage}`))

/*   navLinksHome.classList.remove('active');
  navLinksLibrary.classList.add('active'); */

// navLinksLibrary.addEventListener('click', activeLinkLibrary);

/* function activeLinkHome(e) {
  e.preventDefault();

  if (navLinksHome.href.includes(windowPathname))
    navLinksLibrary.classList.remove('active');
  navLinksHome.classList.add('active');
}
navLinksHome.addEventListener('click', activeLinkHome); */
