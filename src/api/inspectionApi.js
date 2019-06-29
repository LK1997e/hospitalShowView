import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';


export const InspectSearchFMedItem=(params)=>{return axios.post(`${hospital}/inspection/searchFMedItem`,params);};
export const Inspectformview=(params)=>{return axios.post(`${hospital}/inspection/inspectformview`,params);};


export const InspectMedReview=(params)=>{return axios.post(`${hospital}/inspection/inspectmedreview`,params);}
export const InspectMatReview=(params)=>{return axios.post(`${hospital}/inspection/inspectmatreview`,params);}
export const InspectReview=(params)=>{return axios.post(`${hospital}/inspection/inspectreview`,params);}
export const DeleteMedMat=(params)=>{return axios.post(`${hospital}/inspection/deleteMedMat`,params);}
export const DeleteMedMatByList=(params)=>{return axios.post(`${hospital}/inspection/deleteMedMatByList`,params);}
export const UpdateMedMat=(params)=>{return axios.post(`${hospital}/inspection/updateMedMat`,params);}
export const SearchDrugs=(params)=>{return axios.post(`${hospital}/inspection/searchDrugs`,params);}
export const SearchMaterials=(params)=>{return axios.post(`${hospital}/inspection/searchMaterials`,params);}
export const InsertMedMat=(params)=>{return axios.post(`${hospital}/inspection/insertMedMat`,params);}
export const ApproveMat=(params)=>{return axios.post(`${hospital}/inspection/approveMat`,params);}
export const ApproveMed=(params)=>{return axios.post(`${hospital}/inspection/approveMed`,params);}

