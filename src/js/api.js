import { BASE_URL, API_KEY } from "./utils";


import axios from "axios";

export async  function  getMoviesPopular(page) {
    try{
        const response  =  await axios.get(`${BASE_URL}3/movie/popular?api_key=${API_KEY}&page=${page}`, {
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}` },
          });
    
        console.log(response);
            return response;
    }catch(error){
        console.log(error);
        return [];
    }


    }
         
export async function searchMovies(query,page){
    try{

        const response  =  await axios.get(`${BASE_URL}3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`, {
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}` },
          });
     ;
    
        console.log(response);
            return response;
    }catch(error) {  
        console.log(error);
        return [];
    }
}

export async function MovieController(query, page = 1){
    if(query !== '' && query !== undefined){
        const result = await searchMovies(query,page);
        return result;
    }
    const result = await getMoviesPopular(page);
     return result;

}

export async function getMovieDetails(id){
    try {
        const response = await axios.get(
          `${BASE_URL}movie/${id}?api_key=${API_KEY}`
        );
  
        console.log(response.data);
  
        return response.data;
      } catch (error) {
        console.log(error);
        return [];
      }

}
