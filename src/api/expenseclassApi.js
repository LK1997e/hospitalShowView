import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const expenseclassAdd=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/expenseclass/add`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const expenseclassDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/expenseclass/deleteById`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const expenseclassDeleteByChooses=params=>{
  return axios.post(`${hospital}/expenseclass/deleteByChoose`,params)
};

export const expenseclassUpdate=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/expenseclass/update`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const expenseclassFind=(code,name,pageNum,pageSize)=>{
  let params='pageNum='+pageNum+'&pageSize='+pageSize
  if((code !== null)&&(code !=='')){
    params = params+'&code='+code;
  }
  if((name !== null)&&(name !=='')){
    params = params+'&name='+name;
  }
  return axios.post(`${hospital}/expenseclass/find`, params);
};

// export const createXLSX=_=>{
//   return axios.post(`${hospital}/expenseclass/createXLSX`)
// };
// export const downloadXLSX=params=>{
//   params=Qs.stringify(params);
//   return axios.post(`${hospital}/download/downloadXLSX`,params,
//     {headers: {'Content-Type': 'application/x-www-form-urlencoded'},responseType:'blob'});
// };
