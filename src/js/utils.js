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

export function convertDate(date) {
  const inputDate = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const targetDate = new Date('1999-08-23');
  const formattedDate = targetDate.toLocaleString('en-US', options);
  return formattedDate;
}
// export function getGenreNamesByIds(ids) {
//   // Ensure ids is an array before processing
//   if (!Array.isArray(ids)) return '';
//   const names = ids
//     .map(id => {
//       const genre = genres.find(genre => genre.id === id);
//       return genre ? genre.name : null;
//     })
//     .filter(name => name !== null);
//   return names.join(', ');
// }
export function getGenreNamesByIds(ids) {
  // Ensure ids is an array before processing
  if (!Array.isArray(ids)) return '';

  // Get the names of the first three genres
  const firstThreeNames = ids
    .slice(0, 2) // Take the first three ids
    .map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : null;
    })
    .filter(name => name !== null);

  // If there are more than three ids, add 'Other' to the list
  if (ids.length > 3) {
    firstThreeNames.push('Other');
  }

  // Join the genre names with a comma and a space
  return firstThreeNames.join(', ');
}
// Function to create HTML for a movie card
export function movieCard(id, poster_path, title, genre_ids, year,vote) {
  const genres = getGenreNamesByIds(genre_ids);
  const releaseYear = Array.isArray(year) ? year[0] : 'N/A'; // Ensure year is processed correctly
  return `

        <div class="movie-card" data-id="${id}">
          <img src="${poster_path == null ? `https://placehold.co/400x600`:  `https://image.tmdb.org/t/p/w500`+poster_path}" alt="${title}">
          <p class="movie-title">${title}</p>
          <p class="movie-genre">${getGenreNamesByIds(genre_ids)} | ${
    year[0]
  }&nbsp&nbsp&nbsp<span class="vote">${vote.toFixed(1)}</span></p>
        </div>
      `;
}

export function movieCardUpcoming(id, poster_path, title, year) {
  return `
        <div class="movie-card swiper-slide " data-id="${id}">
          <img src="${poster_path == null ? `https://placehold.co/400x600`:  `https://image.tmdb.org/t/p/w500`+poster_path}" alt="${title}">
          <p class="upcoming-title">${title}</p>
          <p class="upcoming-year">${convertDate(year)}</p>
        </div>
      `;
}

