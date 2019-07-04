import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const  scheduleGetList = (listParams) =>
{
  // let formData=new URLSearchParams();
  // formData.append("doctor",doctor);
  // formData.append("typeID",typeID)
  // formData.append("pageNum",pageNum);
  // formData.append("pageSize",pageSize);
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/schedule/list`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};





export const scheduleDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/schedule/deleteByID`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};



export const scheduleDeleteByChooses=params=>{
  return axios.post(`${hospital}/schedule/deleteByChoose`,params)
};

export const scheduleInfoUpdate=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/schedule/update`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const scheduleInfoAdd=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/schedule/add`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};
export const generateInfo=_=>{
  return axios.post(`${hospital}/schedule/generate`);
};
export const createXLS=_=>{
  return axios.post(`${hospital}/schedule/createXLS`)
};
export const createXLSTemplate=_=>{
  return axios.post(`${hospital}/schedule/createTemplate`)
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



