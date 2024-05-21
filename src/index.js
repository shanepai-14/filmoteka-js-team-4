import { MovieController, getMoviesPopular } from './js/api.js';
import { API_KEY, BASE_URL } from './js/api.js';

const movieContainer = document.querySelector('.movie-container');

MovieController('spiderman', 2);

async function movieList() {
  try {
    const queryResult = await getMoviesPopular(1);
    console.log(queryResult);
    let finalResult = queryResult.results.map(result => {
      return `
        <div class="movie-card">
          <h3>${result.title}</h3>
          <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}">
          <p> ${result.title}</p>
          <p> ${result.vote_average}</p>
        </div>
      `;
    });
    movieContainer.innerHTML = finalResult.join('');
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

movieList();
