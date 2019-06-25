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

export const deptGetALLNamesAndCodes=_=>{
  return axios.post(`${hospital}/department/findAllDeptNamesAndCodes`);
};

export const deptTypeGetALLNamesAndCodes=_=>{
  return axios.post(`${hospital}/department/findAllDeptTypeNamesAndCodes`);
};

export const deptCategoryGetALLNamesAndCodes=_=>{
  return axios.post(`${hospital}/department/findAllDeptCategoryNamesAndCodes`);
};

export const deptGetByNameOrCode=(params)=>{
  params=Qs.stringify(params);
  return  axios.post(`${hospital}/department/findByNameOrCode`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deptDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/department/deleteById`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deptDeleteByChooses=params=>{
  return axios.post(`${hospital}/department/deleteByChoose`,params)
}
