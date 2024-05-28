import axios from 'axios';
export const API_KEY = '7eaa6623d3beea74fe1a17c7d615eb46'
export const BASE_URL = 'https://api.themoviedb.org/'

export const getMoviesPopular = async page => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}3/movie/popular?api_key=${API_KEY}&page=${page}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error fetching popular movies: ${error.message}`);
  }
};

export const searchMovies = async (query, page) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error searching movies: ${error.message}`);
  }
};

export const getMovieDetails = async id => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}3/movie/${id}?api_key=${API_KEY}`
    );
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error fetching movie details: ${error.message}`);
  }
};


export const MovieController = async (query, page) => {
  try {
    if (query !== '') {
      const result = await searchMovies(query, page);
      return result;
    }
    const result = await getMoviesPopular(page);
    return result;
  } catch (error) {
    throw new Error(`Error in MovieController: ${error.message}`);
  }
};
export const upcoming = async () => {
  try {
    const {data} = await axios.get(
      `${BASE_URL}3/movie/upcoming?api_key=${API_KEY}&region=US&language=en-US&page=1`
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error fetching movie details: ${error.message}`);
  }
};

