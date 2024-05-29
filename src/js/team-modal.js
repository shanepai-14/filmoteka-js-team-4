import { h, render } from 'preact';
import * as basicLightbox from 'basiclightbox';
import Databaes from  '../images/databaes.png';
const MovieDetails = ({  modal }) => {
  const modalClose = () => modal.close();

  return (
    <div class="modal-movie">
     <img src={Databaes}></img>
    </div>
  );
};

const showTeam = () => {
  const instance = basicLightbox.create('');
  document.addEventListener('keyup', e => {
    if (e.code === 'Escape') {
      instance.close();
    }
  });
  render(
    <MovieDetails modal={instance} />,
    instance.element()
  );
  instance.show();
};

export { showTeam };
