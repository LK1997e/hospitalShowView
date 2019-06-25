import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

axios.defaults.withCredentials = true;

export const UpdateUserInfo = (userName,realName,contact)=> { let params='userName='+userName+'&realName='+realName+'&contact='+contact; return axios.post(`${hospital}/UserInfo/updateUserInfo`, params);};

export const UpdatePasswd = (oldPasswd,newPasswd)=> { let params='oldPasswd='+oldPasswd+'&newPasswd='+newPasswd; return axios.post(`${hospital}/UserInfo/updatePasswd`, params);};
