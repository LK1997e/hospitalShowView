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

export const uploadXLS=content=>{
  alert(content.action);
  alert(content.file);
  let params=new FormData();
  params.append('file',content.file);
  axios({
    method: 'post',
    url: content.action,
    timeout: 20000,
    data: params,
    headers:{'Content-Type':'multipart/form-data'}
     }).then(res => {
        content.onSuccess('配时文件上传成功')
   }).catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      content.onError('配时文件上传失败(' + error.response.status + ')，' + error.response.data);
      } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      content.onError('配时文件上传失败，服务器端无响应');
     } else {
      // Something happened in setting up the request that triggered an Error
      content.onError('配时文件上传失败，请求封装失败');
     }
  });
}



