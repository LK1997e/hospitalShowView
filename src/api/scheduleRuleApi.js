import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const  scheduleRuleGetList = (listParams) =>
{
  // let formData=new URLSearchParams();
  // formData.append("doctor",doctor);
  // formData.append("typeID",typeID)
  // formData.append("pageNum",pageNum);
  // formData.append("pageSize",pageSize);
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/scheduleRule/list`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};


export const doctorGetByDeptID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/scheduleRule/findDoctorByDeptID`,params);
};


export const doctorGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/scheduleRule/findAllDoctorNamesAndCodes`);
};

export const onDutyTimeGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/scheduleRule/findAllOnDutyTimeNamesAndCodes`);
};



export const scheduleRuleDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/scheduleRule/deleteByID`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};



export const scheduleRuleDeleteByChooses=params=>{
  return axios.post(`${hospital}/scheduleRule/deleteByChoose`,params)
};

export const scheduleRuleInfoUpdate=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/scheduleRule/update`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const scheduleRuleInfoAdd=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/scheduleRule/add`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};
export const createXLS=_=>{
  return axios.post(`${hospital}/scheduleRule/createXLS`)
};
export const createXLSTemplate=_=>{
  return axios.post(`${hospital}/scheduleRule/createTemplate`)
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



