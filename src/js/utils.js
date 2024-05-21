import * as basicLightbox from 'basiclightbox'

const genres = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
];

export function getGenreNamesByIds(ids) {
    const names = ids.map(id => {
        const genre = genres.find(genre => genre.id === id);
        return genre ? genre.name : null;
    }).filter(name => name !== null);
    return names.join(', ');
}

export function movieCard(id,poster_path,title,genre_ids,year){
    return `
        <div class="movie-card" data-id="${id}">
          <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
          <p class="movie-title">${title}</p>
          <p class="movie-genre">${getGenreNamesByIds(genre_ids
          )} | ${year[0]}</p>
        </div>
      `
}



export function ModalLightbox(movieDetails){

    const instance = basicLightbox.create(`
    <div class="modal-movie">
      <img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" alt="${movieDetails.title}">
     <div>
     <h1 class="movie-title">${movieDetails.title}</h1>
     <table>
      <tr>
      <td>Vote / Votes</td>
      <td><span>${movieDetails.vote_average}</span> / <span>${movieDetails.vote_count}</span></td>
      </tr>
      <tr>
      <td>Popularity</td>
      <td>${movieDetails.popularity}</td>
      </tr>
      <tr>
      <td>Original Title</td>
      <td>${movieDetails.original_title} </td>
      </tr>
      <tr>
      <td>Genre</td>
      <td> </td>
      </tr>
     </table>
     <p class="movie-overview">${movieDetails.overview}</p>
     <p class="movie-rating">${movieDetails.vote_average}</p>

     <div>
     <button>ADD TO WATCH</button>
     <button>ADD TO QUEUE</button>
    </div>
     </div>
 
      
    </div>
  `)
  
  instance.show()
  }







