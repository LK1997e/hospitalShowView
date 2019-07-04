import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;
//获取用户列表
export const  userGetList = (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/user/list`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};
//获得所有用户名和用户id
export const userGetAllNamesAndIDs=_=>{
  return axios.post(`${hospital}/user/findAllUserNamesAndIDs`);
};

export const userTypeGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/user/findAllUserTypeNamesAndCodes`);
};
//获得所有医生职称用户名和编号
export const userRankGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/user/findAllUserRankNamesAndCodes`);
};

export const userGetByName=(params)=>{
  params=Qs.stringify(params);
  return  axios.post(`${hospital}/user/findByName`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const userDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/user/deleteByID`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const userDeleteByChooses=params=>{
  return axios.post(`${hospital}/user/deleteByChoose`,params)
};

export const userInfoUpdate=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/user/update`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const userInfoAdd=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/user/addUser`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};
export const createXLS=_=>{
  return axios.post(`${hospital}/user/createXLS`)
};
export const createXLSTemplate=_=>{
  return axios.post(`${hospital}/user/createTemplate`)
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



