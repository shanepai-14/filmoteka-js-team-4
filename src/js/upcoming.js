
import { upcoming } from "./api";
import {movieCardUpcoming} from './utils';



const upcomingList = document.getElementById('swiper-list');


async function upcomingMovies(){
  try {
    const data = await upcoming();
    displayResult(data.results);
  }catch(e) {

  } finally {
    var swiper = new Swiper('.mySwiper', {

      pagination: {
        el: '.swiper-pagination',
      },
      slidesPerView: 8,
      spaceBetween: 18,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        // when window width is >= 320px
        1159: {
          slidesPerView: 8,
        },
        768: {
          slidesPerView: 6,
        },
        1: {
          slidesPerView: 2,
        },
      },
    
    });
  }
}



function displayResult(dataResult) {
  let finalResult = dataResult.map(result => {
    return movieCardUpcoming(
      result.id,
      result.poster_path,
      result.title,
      result.release_date
    );
  });
  upcomingList.innerHTML = finalResult.join('');
}


upcomingMovies();
