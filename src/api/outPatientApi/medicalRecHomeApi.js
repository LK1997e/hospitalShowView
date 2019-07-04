import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

export const findPatient =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/medicalRecHome/findPatient`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const tempStore  = (listParams) =>
{
  listParams = Qs.stringify(listParams);
  return axios.post(
    `${hospital}/medicalRecHome/tempStore`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

}
export const use_TempStore = (listParams) =>
{
  listParams = Qs.stringify(listParams);
  return axios.post(
    `${hospital}/medicalRecHome/use_TempStore`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

}
export const add = (listParams) =>
{
  listParams = Qs.stringify(listParams);
  return axios.post(
    `${hospital}/medicalRecHome/add`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

}
export const save_Template = (listParams) =>
{
  listParams = Qs.stringify(listParams);
  return axios.post(
    `${hospital}/medicalRecHome/save_Template`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

}
export const use_Template = (listParams) =>
{
  listParams = Qs.stringify(listParams);
  return axios.post(
    `${hospital}/medicalRecHome/use_Template`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

}
export const use_CommonDiagnosis = (listParams) =>
{
  listParams = Qs.stringify(listParams);
  return axios.post(
    `${hospital}/medicalRecHome/use_CommonDiagnosis`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

}
export const searchHistoryRec = (listParams) =>
{
  listParams = Qs.stringify(listParams);
  return axios.post(
    `${hospital}/medicalRecHome/searchHistoryRec`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

}


export const listPatientNoDiagnosis =(listParams)=>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/medicalRecHome/listPatientNoDiagnosis`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

}

export const listSearchValue  =_=>
{

  return axios.post(
    `${hospital}/medicalRecHome/listSearchValue` );

}
