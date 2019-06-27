import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const expenseclassAdd=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/expenseclass/add`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const expenseclassDeleteByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/expenseclass/deleteById`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const expenseclassDeleteByChooses=params=>{
  return axios.post(`${hospital}/expenseclass/deleteByChoose`,params)
};

export const expenseclassUpdate=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/expenseclass/update`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const expenseclassFind=(code,name,pageNum,pageSize)=>{
  let params='pageNum='+pageNum+'&pageSize='+pageSize
  if((code !== null)&&(code !=='')){
    params = params+'&code='+code;
  }
  if((name !== null)&&(name !=='')){
    params = params+'&name='+name;
  }
  return axios.post(`${hospital}/expenseclass/find`, params);
};

export const createXLS=_=>{
  return axios.post(`${hospital}/department/createXLS`)
};
export const createXLSTemplate=_=> {
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
