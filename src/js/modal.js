import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio.js';

import { getMovieDetails } from './api';
import { showMovieDetails } from './movie-details';
import { showTeam } from './team-modal';
async function handleMovieCardClick(event) {
  var movieCard = event.target.closest('.movie-card');

  if (movieCard) {
    var dataId = movieCard.getAttribute('data-id');

    // console.log('Clicked movie-card data-id:', dataId);
    const movieDetails = await getMovieDetails(dataId);
    showMovieDetails(movieDetails);
  }
}


const upcomingList = document.getElementById('swiper-list');
const movieContainer = document.querySelector('.movie-container');
const teamModal = document.querySelector('.footer-section-button');
if(teamModal) teamModal.addEventListener('click', showTeam);
if(upcomingList) upcomingList.addEventListener('click', handleMovieCardClick);
if(movieContainer) movieContainer.addEventListener('click', handleMovieCardClick);



