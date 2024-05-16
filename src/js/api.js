import { BASE_URL, API_KEY } from "./utils";


import axios from "axios";

async  function  getMoviesPopular() {
    try{
        const response  =  await axios.get(`${BASE_URL}3/movie/popular?api_key=${API_KEY}`, {
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}` },
          });
    
        console.log(response);
            return response;
    }catch(e){
        console.log(e);
    }
    }

    console.log(BASE_URL);
    getMoviesPopular

