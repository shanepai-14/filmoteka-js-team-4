import './js/modal.js';
import { MovieController, getMoviesPopular } from './js/api.js';
import { API_KEY, BASE_URL } from './js/api.js';
import { movieCard } from './js/utils.js';
const movieContainer = document.querySelector('.movie-container');

MovieController('spiderman', 2);

async function movieList() {
  try {
    const queryResult = await getMoviesPopular(1);
    console.log(queryResult);
    let finalResult = queryResult.results.map(result => {
      let year = result.release_date.split('-');
      return movieCard(
        result.id,
        result.poster_path,
        result.title,
        result.genre_ids,
        year
      );
    });
    movieContainer.innerHTML = finalResult.join('');
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

movieList();
