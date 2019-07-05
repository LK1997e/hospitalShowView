import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

export const newInspection =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/newInspection`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const addInspectionDetailsList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/addInspectionDetailsList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const addInspectionDetails =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/addInspectionDetails`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const searchInspection =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/searchInspection`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const tempStore =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/tempStore`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const drawInspectionDetails =  (listParams) =>
{
  return axios.post(
    `${hospital}/ApplyInspection/drawInspectionDetails`,listParams);
}

export const addProjectFee =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/addProjectFee`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteInspectionDetails =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/deleteInspectionDetails`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const abolishInspectionDetails =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/abolishInspectionDetails`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const useCommonInspection =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/useCommonInspection`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const saveTemplate =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/saveTemplate`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const saveTemplateDetails =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/saveTemplateDetails`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const use_Check =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/use_Check`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const lookInspectionRes =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/lookInspectionRes`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const listInspection =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/listInspection`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const listIndexInspection =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/listIndexInspection`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}


export const deleteInspectionDetailsByID =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/deleteInspectionDetailsByID`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const getIndexFMedItem =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyInspection/getIndexFMedItem`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
