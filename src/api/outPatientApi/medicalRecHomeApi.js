import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8088/hospital';

export const findPatient =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/medicalRecHome/findPatient`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
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
