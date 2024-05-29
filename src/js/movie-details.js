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
      .join(', ');

  return (
    <div class="modal-movie">
      <a onClick={modalClose} class="button-close" data-dismiss="modal">
        &times;
      </a>
      <div class="img-container">
        <img
          class="image"
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          // width="375"
          // height="478"
        />
      </div>
      <div class="content">
        <h2 class="movie-title">{movieDetails.title}</h2>

        <div class="left-right-container">
          <div class="movie-details-modal">
            <ul class="property">
              <li>
                <div class="left-side">Vote/Votes </div>
                <span class="right-side">
                  <span class="vote">{movieDetails.vote_average.toFixed(1)}</span> <i>/</i>
                  <span class="votes">{movieDetails.vote_count}</span>
                </span>
              </li>
              <li>
                <div class="left-side ">Popularity </div>
                <span class="right-side">
                  {movieDetails.popularity.toFixed(2)}
                </span>
              </li>
              <li>
                <div class="left-side ">Original Title </div>
                <span class="right-side">{movieDetails.original_title}</span>
              </li>
              <li>
                <div class="left-side ">Genre </div>
                <span class="right-side">
                  {getMovieGenresNames(movieDetails.genres)}
                </span>
              </li>
            </ul>
          </div>

          <div class="about">
            <p class="about-title">About</p>
            <div class="overview-container">
              <p class="movie-overview">{movieDetails.overview}</p>
            </div>
          </div>
          <div class="buttons modalBtnContainer" data-id={movieDetails.id}>
            <button class="button-to-watched libraryBtn">Add to watched</button>
            <button class="button-to-queue libraryBtn">Add to queue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const showMovieDetails = movieDetails => {
  console.log('showMovieDetails ->', movieDetails);
  const instance = basicLightbox.create('');
  document.addEventListener('keyup', e => {
    if (e.code === 'Escape') {
      instance.close();
    }
  });
  render(
    <MovieDetails movieDetails={movieDetails} modal={instance} />,
    instance.element()
  );
  instance.show();
};

export { showMovieDetails };
