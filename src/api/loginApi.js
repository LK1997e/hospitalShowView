import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const LoginCheck = params => {return axios.post(`${hospital}/login/check`, params);};
