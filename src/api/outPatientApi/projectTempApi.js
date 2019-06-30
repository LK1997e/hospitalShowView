import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

export const addProjectTemp =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/addProjectTemp`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const updateProjectTemp =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/updateProjectTemp`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteProjectTemplate =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/deleteProjectTemplate`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteProjectTemplateList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/deleteProjectTemplateList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const findProjectTemplate =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/findProjectTemplate`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const getThisDoctorTemp =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/getThisDoctorTemp`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const ProjectTemplateDetail =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/ProjectTemplateDetail`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const updateProjectTmpDetails =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/updateProjectTmpDetails`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const deleteProjectTmpDetails =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/deleteProjectTmpDetails`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteProjectTmpDetailsList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/deleteProjectTmpDetailsList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const searchProject =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ProjectTemp/searchProject`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
