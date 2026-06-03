import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1'  ,
    headers: {
        Autorization: `Bearer ${import.meta.env.VITE_APP_TMDB_KEY}`,
    },
});