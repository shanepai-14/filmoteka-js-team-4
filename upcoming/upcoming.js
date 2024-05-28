const movieGrid = document.querySelector('.movie-grid');
const movies = [
  {
    title: "THE WATCHERS",
    poster: "https://www.example.com/thewatchers.jpg",
    releaseDate: "2024-06-07"
  },
  {
    title: "IN A VIOLENT NATURE",
    poster: "https://www.example.com/inaviolentnature.jpg",
    releaseDate: "2024-05-31"
  },
  {
    title: "THE DEAD DON'T HURT",
    poster: "https://www.example.com/thedeaddont.jpg",
    releaseDate: "2024-05-31"
  },
  // ... Add more movies
];

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