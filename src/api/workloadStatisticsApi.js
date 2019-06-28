import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const workloadStatisticsGetList = (realName,deptName,dateStart,dateEnd,pageNum,pageSize)=>
{
  let params='pageNum='+pageNum+'&pageSize='+pageSize;
  if((realName !== null)&&(realName !=='')){
    params = params+'&realName='+realName;
  }
  if((deptName !== null)&&(deptName !=='')){
    params = params+'&deptName='+deptName;
  }
  if((dateStart !== null)&&(dateStart !=='')){
    params = params+'&dateStart='+dateStart;
  }
  if((dateEnd !== null)&&(dateEnd !=='')){
    params = params+'&dateEnd='+dateEnd;
  }
  return axios.post(`${hospital}/WorkloadStatistics/findByInfo`, params);
};

export const userGetALLNamesAndIDs=_=>{
  return axios.post(`${hospital}/user/findAllUserNamesAndIDs`);
};
