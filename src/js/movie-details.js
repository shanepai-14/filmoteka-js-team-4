import { h, render } from 'preact';
import * as basicLightbox from 'basiclightbox';

const MovieDetails = ({ movieDetails = {}, modal }) => {
  const modalClose = () => modal.close();

  // const roundPopularity = Math.round(popularity);
  // const roundVote_average = vote_average.toFixed(2);

  const getMovieGenresNames = genres =>
    genres
      .splice(0, Math.min(2, genres.length))
      .map(genre => genre.name)
      .join(',');

  return (
    <div class="modal-movie">
      <button onClick={modalClose} class="button-close" data-dismiss="modal">
        <svg
          class="icon"
          width="30"
          height="30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m8 8 14 14M8 22 22 8" stroke-width="2"></path>
        </svg>
      </button>

      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      <div class="modal-details">
        <h2 class="movie-title">{movieDetails.title}</h2>

        <div class="movie-details-modal">
          <ul class="property">
            <li>
              <div class="left-side">Vote/Votes </div>{' '}
              <div class="votes-right-side">
                <span class="vote">{movieDetails.vote_average}</span>/{' '}
              </div>
              <span class="votes">{movieDetails.vote_count}</span>{' '}
            </li>
            <li>
              <div class="left-side ">Popularity </div>
              <span class="right-side">{movieDetails.popularity}</span>
            </li>
            <li>
              <div class="left-side ">Original Title </div>
              <span class="right-side">{movieDetails.original_title}</span>
            </li>
            <li>
              <div class="left-side ">Genre </div>
              <span class="right-side">
                {getMovieGenresNames(movieDetails.genres)}
              </span>{' '}
            </li>
          </ul>
        </div>
      </div>
      <div class="about">
        <p class="about-title">About</p>
        <div class="about-container">
          <p class="movie-overview">{movieDetails.overview}</p>
        </div>
      </div>
    </div>
  );
};

const showMovieDetails = movieDetails => {
  console.log('showMovieDetails ->', movieDetails);
  const instance = basicLightbox.create('');
  render(
    <MovieDetails movieDetails={movieDetails} modal={instance} />,
    instance.element()
  );
  instance.show();
};

export { showMovieDetails };
