import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

export const addCommonDiagnosis =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDiagnosis/addCommonDiagnosis`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const addCommonDiagnosisList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDiagnosis/addCommonDiagnosisList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteCommonDiagnosisList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDiagnosis/deleteCommonDiagnosisList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const updateCommonDiagnosis =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDiagnosis/updateCommonDiagnosis`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const CommonDiagnosis =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDiagnosis/CommonDiagnosis`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const findCommonDiagnosis =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDiagnosis/findCommonDiagnosis`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const getThisDoctorTemp =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDiagnosis/getThisDoctorTemp`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
