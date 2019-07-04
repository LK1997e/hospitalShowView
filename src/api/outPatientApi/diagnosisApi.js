import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

export const addDiagnosis =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/Diagnosis/addDiagnosis`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const addDiagnosisList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/Diagnosis/addDiagnosisList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const searchDisease =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/Diagnosis/searchDisease`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteDiagnosis =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/Diagnosis/deleteDiagnosis`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteDiagnosisList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/Diagnosis/deleteDiagnosisList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const updateDiagnosis =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/Diagnosis/updateDiagnosis`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const searchDiagnosis =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/Diagnosis/searchDiagnosis`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const defineDiagnose =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/Diagnosis/defineDiagnose`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}


