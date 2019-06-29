import axios from 'axios';

let hospital = 'http://localhost:8081/hospital';


export const Takemedicineformview=(params)=>{return axios.post(`${hospital}/TakeMedicineController/takemedicineformview`,params);};
export const Takemeddetailsview=(params)=>{return axios.post(`${hospital}/TakeMedicineController/takemeddetailsview`,params);};
export const WithdrawMedicine=(params)=>{return axios.post(`${hospital}/TakeMedicineController/withdrawMedicine`,params);};
export const Takemeddetailsview=(params)=>{return axios.post(`${hospital}/TakeMedicineController/takemeddetailsview`,params);};

