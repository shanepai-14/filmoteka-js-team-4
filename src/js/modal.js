import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio.js';
// import simpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { getMovieDetails } from './api';

// const modalCard = document.querySelector('.modal-card');

async function handleMovieCardClick(event) {
  console.log('clicked');
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
  }
}

// Get the parent container element
var movieContainer = document.querySelector('.movie-container');
console.log(movieContainer);
// Add click event listener to the parent container
movieContainer.addEventListener('click', handleMovieCardClick);

// const closeModalButton = document.querySelector('.button-close');
// const modalContainer = document.querySelector('.modal');

// const lightbox = new simpleLightbox('.lightbox', {
//   captionsData: 'alt',
//   captionsDelay: 250,
// });
