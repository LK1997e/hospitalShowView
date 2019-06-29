import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

export const addMedicalRecHomeTemp =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/MedicalRecHomeTemp/addMedicalRecHomeTemp`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const updateMedicalRecHomeTemp =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/MedicalRecHomeTemp/updateMedicalRecHomeTemp`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteMedicalRecHomeTemp =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/MedicalRecHomeTemp/deleteMedicalRecHomeTemp`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const findMedicalRecHomeTemplate =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/MedicalRecHomeTemp/findMedicalRecHomeTemplate`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const getThisDoctorTemp =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/MedicalRecHomeTemp/getThisDoctorTemp`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

