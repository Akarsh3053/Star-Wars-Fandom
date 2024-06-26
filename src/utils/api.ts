import axios from 'axios';

const api = axios.create({
    baseURL: 'https://swapi.dev/api',
});

export const getCharacters = async (page: number = 1) => {
    const response = await api.get(`/people/?page=${page}`);
    return response.data;
};

export const getCharacterDetails = async (id: string) => {
    const response = await api.get(`/people/${id}/`);
    return response.data;
};

export const getMovieDetails = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};