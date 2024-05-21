import axios from "axios";


export const API_KEY = process.env.API_KEY;
export const BASE_URL = process.env.BASE_URL;

export const getMoviesPopular = async (page) => {
  try {
    const { data } = await axios.get(`${BASE_URL}3/movie/popular?api_key=${API_KEY}&page=${page}`, {
      headers: {
        accept: 'application/json',
      },
    });
    console.log(data);
    return data;
   
  } catch (error) {
    throw new Error(`Error fetching popular movies: ${error.message}`);
  }
};

export const searchMovies = async (query, page) => {
  try {
    const { data } = await axios.get(`${BASE_URL}3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`, {
      headers: {
        accept: 'application/json',
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error searching movies: ${error.message}`);
  }
};

export const getMovieDetails = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}3/movie/${id}?api_key=${API_KEY}`);
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