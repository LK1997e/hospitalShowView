import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const  settlementCategoryGetList = (listParams) =>
{
  // let formData=new URLSearchParams();
  // formData.append("setCatCategory",setCatCategory);
  // formData.append("typeID",typeID)
  // formData.append("pageNum",pageNum);
  // formData.append("pageSize",pageSize);
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/settlementCategory/list`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const setCatGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/settlementCategory/findAllSetCatNamesAndCodes`);
};


export const setCatGetByNameOrCode=(params)=>{
  params=Qs.stringify(params);

  return  axios.post(`${hospital}/settlementCategory/findByCodeOrName`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const setCatDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/settlementCategory/deleteByID`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const setCatDeleteByChooses=params=>{
  return axios.post(`${hospital}/settlementCategory/deleteByChoose`,params)
};

export const setCatInfoUpdate=params=>{
  params=Qs.stringify(params);

  return axios.post(`${hospital}/settlementCategory/update`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const setCatInfoAdd=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/settlementCategory/add`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};
export const setCatDetailsUpdate=params=>{
  params=Qs.stringify(params);
  alert(params);
  return axios.post(`${hospital}/settlementCategory/updateDetails`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const createXLS=_=>{
  return axios.post(`${hospital}/settlementCategory/createXLS`)
};
export const downloadXLS=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/fileManage/downloadXLS`,params,
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'},responseType:'blob'});
};







