import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const  fMedItemGetList = (listParams) =>
{
  // let formData=new URLSearchParams();
  // formData.append("fMedItemCategory",fMedItemCategory);
  // formData.append("typeID",typeID)
  // formData.append("pageNum",pageNum);
  // formData.append("pageSize",pageSize);
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/fMedItem/list`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const fMedItemGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/fMedItem/findAllFMedItemNamesAndCodes`);
};

export const fMedItemTypeGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/fMedItem/findAllFMedItemTypeNamesAndCodes`);
};

export const expClassGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/fMedItem/findAllExpClassNamesAndCodes`);
};


export const fMedItemGetByNameOrCode=(params)=>{
  params=Qs.stringify(params);
  return  axios.post(`${hospital}/fMedItem/findByNameOrCode`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const fMedItemDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/fMedItem/deleteByID`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const deptGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/fMedItem/findAllDeptNamesAndCodes`);
};

export const fMedItemDeleteByChooses=params=>{
  return axios.post(`${hospital}/fMedItem/deleteByChoose`,params)
};

export const fMedItemInfoUpdate=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/fMedItem/update`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const fMedItemInfoAdd=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/fMedItem/add`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};
export const createXLS=_=>{
  return axios.post(`${hospital}/fMedItem/createXLS`)
};
export const createXLSTemplate=_=>{
  return axios.post(`${hospital}/fMedItem/createTemplate`)
};
export const downloadXLS=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/fileManage/downloadXLS`,params,
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'},responseType:'blob'});
};

export const uploadXLS=(content,conditions)=>{
  let params=new FormData();
  params.append('file',content.file);
  params.append('errorHappenContinue',conditions.errorHappenContinue);
  params.append('repeatCoverage',conditions.repeatCoverage)
  return axios({
    method: 'post',
    url: content.action,
    timeout: 20000,
    data: params,
    headers:{'Content-Type':'multipart/form-data'}
  })
}



