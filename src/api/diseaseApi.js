import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const  diseaseGetList = (listParams) =>
{
  // let formData=new URLSearchParams();
  // formData.append("diseaseCategory",diseaseCategory);
  // formData.append("typeID",typeID)
  // formData.append("pageNum",pageNum);
  // formData.append("pageSize",pageSize);
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/disease/list`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const diseaseGetAllNamesAndCodes=_=>{
  alert('start');
  return axios.post(`${hospital}/disease/findAllDiseaseNamesAndCodes`);
};

export const dicaTypeGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/disease/findAllDicaTypeNamesAndCodes`);
};

export const diseaseCategoryGetByDicaTypeID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/disease/findCategoriesByDicaTypeID`,params);
};

export const diseaseCategoryGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/disease/findAllDiseaseCategoryNamesAndCodes`);
};

export const diseaseGetByNameOrCode=(params)=>{
  params=Qs.stringify(params);
  return  axios.post(`${hospital}/disease/findByNameOrCode`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const diseaseDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/disease/deleteByID`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};



export const diseaseDeleteByChooses=params=>{
  return axios.post(`${hospital}/disease/deleteByChoose`,params)
};

export const diseaseInfoUpdate=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/disease/update`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const diseaseInfoAdd=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/disease/add`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};
export const createXLS=_=>{
  return axios.post(`${hospital}/disease/createXLS`)
};
export const createXLSTemplate=_=>{
  return axios.post(`${hospital}/disease/createTemplate`)
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



