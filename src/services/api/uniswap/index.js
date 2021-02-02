import axios from "axios";
import { ServerAPI as api } from '../../../Config';

const BASE_URL = `${api.protocol}://${api.host}:${api.port}`;

export const challenge = () => {
    return axios.get(BASE_URL +'/donut/api/v1/challenge');
}

export const games = () => {
    return axios.get(BASE_URL +'/donut/api/v1/games');
}

export const genres = () => {
    return axios.get(BASE_URL + '/donut/api/v1/genres');
}

export const ranking = () => {
    return axios.get(BASE_URL +'/donut/api/v1/ranking');
}
