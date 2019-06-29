import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const  registrationLevelGetList = (listParams) =>
{
  // let formData=new URLSearchParams();
  // formData.append("regLevCategory",regLevCategory);
  // formData.append("typeID",typeID)
  // formData.append("pageNum",pageNum);
  // formData.append("pageSize",pageSize);
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/registrationLevel/list`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const regLevGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/registrationLevel/findAllRegLevNamesAndCodes`);
};


export const regLevGetByNameOrCode=(params)=>{
  params=Qs.stringify(params);

  return  axios.post(`${hospital}/registrationLevel/findByCodeOrName`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const regLevDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/registrationLevel/deleteByID`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const regLevDeleteByChooses=params=>{
  return axios.post(`${hospital}/registrationLevel/deleteByChoose`,params)
};

export const regLevInfoUpdate=params=>{
  params=Qs.stringify(params);

  return axios.post(`${hospital}/registrationLevel/update`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const regLevInfoAdd=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/registrationLevel/add`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};
export const regLevDetailsUpdate=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/registrationLevel/updateDetails`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const createXLS=_=>{
  return axios.post(`${hospital}/registrationLevel/createXLS`)
};
export const downloadXLS=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/fileManage/downloadXLS`,params,
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'},responseType:'blob'});
};







