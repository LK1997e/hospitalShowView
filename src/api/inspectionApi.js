import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';


export const InspectSearchFMedItem=(params)=>{return axios.post(`${hospital}/inspection/searchFMedItem`,params);};
export const Inspectformview=(params)=>{return axios.post(`${hospital}/inspection/inspectformview`,params);};
