import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

// export const  checkWorkGetList = (listParams) =>{
//   listParams=Qs.stringify(listParams);
//   return axios.post(
//     `${hospital}/Checkwork/findByInfo`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
// };

export const checkWorkGetList = (realName,deptName,dateStart,dateEnd,pageNum,pageSize)=>
{
  let params='realName='+realName+'&deptName='+deptName+'&pageNum='+pageNum+'&pageSize='+pageSize;
  if((dateStart !== null)&&(dateStart !=='')){
    params = params+'&dateStart='+dateStart;
  }
  if((dateEnd !== null)&&(dateEnd !=='')){
    params = params+'&dateEnd='+dateEnd;
  }
  return axios.post(`${hospital}/Checkwork/findByInfo`, params);
};

export const userGetAllNamesAndIDs=_=>{
  return axios.post(`${hospital}/user/findAllUserNamesAndIDs`);
};

export const updateByID=params=>{
  params=Qs.stringify(params);
  return axios.post(`${hospital}/Checkwork/updateById`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
};

export const updateByChooses=params=>{
  return axios.post(`${hospital}/Checkwork/updateByChoose`,params)
};
