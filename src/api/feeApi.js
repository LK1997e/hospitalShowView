import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';


export const TollInspection=(params)=>{return axios.post(`${hospital}/Toll/tollInspection`,params);};
export const TollDisposal=(params)=>{return axios.post(`${hospital}/Toll/tolldisposal`,params);};
export const TollMat=(params)=>{return axios.post(`${hospital}/Toll/tollmat`,params);};
export const TollMed=(params)=>{return axios.post(`${hospital}/Toll/tollmed`,params);};
export const TollPres=(params)=>{return axios.post(`${hospital}/Toll/tollpres`,params);};
export const TollReg=(params)=>{return axios.post(`${hospital}/Toll/tollreg`,params);};
