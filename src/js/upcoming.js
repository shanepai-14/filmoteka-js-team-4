
const movieGrid = document.querySelector('.movie-grid');


function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const posterImg = document.createElement('img');
  posterImg.src = movie.poster;
  posterImg.alt = movie.title;

  const title = document.createElement('h2');
  title.textContent = movie.title;

  const releaseDate = document.createElement('p');
  releaseDate.textContent = `Release Date: ${movie.releaseDate}`;

  movieCard.appendChild(posterImg);
  movieCard.appendChild(title);
  movieCard.appendChild(releaseDate);

  return movieCard;
}

movies.forEach(movie => {
  const movieCard = createMovieCard(movie);
  movieGrid.appendChild(movieCard);
});

var swiper = new Swiper('.mySwiper', {
  pagination: {
    el: '.swiper-pagination',
  },
  slidesPerView: 8,
  spaceBetween: 18,
  autoplay: {
    delay: 3000,
  },

});
