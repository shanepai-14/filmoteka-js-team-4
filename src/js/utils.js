import * as basicLightbox from 'basiclightbox';

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export function getGenreNamesByIds(ids) {
  const names = ids
    .map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : null;
    })
    .filter(name => name !== null);
  return names.join(', ');
}

export function movieCard(id, poster_path, title, genre_ids, year) {
  return `
        <div class="movie-card" data-id="${id}">
          <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
          <p class="movie-title">${title}</p>
          <p class="movie-genre">${getGenreNamesByIds(genre_ids)} | ${
    year[0]
  }</p>
        </div>
      `;
}