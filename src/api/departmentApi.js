import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const  departmentGetList = (listParams) =>
{
  // let formData=new URLSearchParams();
  // formData.append("deptCategory",deptCategory);
  // formData.append("typeID",typeID)
  // formData.append("pageNum",pageNum);
  // formData.append("pageSize",pageSize);
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/department/list`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const deptGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/department/findAllDeptNamesAndCodes`);
};

export const deptTypeGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/department/findAllDeptTypeNamesAndCodes`);
};

export const deptCategoryGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/department/findAllDeptCategoryNamesAndCodes`);
};

export const deptGetByNameOrCode=(params)=>{
  params=Qs.stringify(params);
  return  axios.post(`${hospital}/department/findByNameOrCode`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const deptDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/department/deleteById`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const deptDeleteByChooses=params=>{
  return axios.post(`${hospital}/department/deleteByChoose`,params)
};

export const deptInfoUpdate=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/department/update`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const deptInfoAdd=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/department/add`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};
export const createXLS=_=>{
  return axios.post(`${hospital}/department/createXLS`)
};
export const createXLSTemplate=_=>{
  return axios.post(`${hospital}/department/createTemplate`)
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



