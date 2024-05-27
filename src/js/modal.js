import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio.js';

import { getMovieDetails } from './api';
import { showMovieDetails } from './movie-details';

// const modalCard = document.querySelector('.modal-card');

async function handleMovieCardClick(event) {
  // console.log('clicked');
  // Check if the clicked element has the class 'movie-card'
  var movieCard = event.target.closest('.movie-card');

  // Check if the closest .movie-card exists
  if (movieCard) {
    // Get the data-id attribute of the movie-card
    var dataId = movieCard.getAttribute('data-id');

    // Log the data-id to the console
    console.log('Clicked movie-card data-id:', dataId);
    // Call the getMovieDetails function with the data-id
    const movieDetails = await getMovieDetails(dataId);
    showMovieDetails(movieDetails);
  }
}

// Get the parent container element
var movieContainer = document.querySelector('.movie-container');
// console.log(movieContainer);

movieContainer.addEventListener('click', handleMovieCardClick);
