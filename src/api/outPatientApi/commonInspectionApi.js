import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';


export const addCommonInspection =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonInspection/addCommonInspection`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const addCommonInspectionList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonInspection/addCommonInspectionList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteCommonInspectionList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonInspection/deleteCommonInspectionList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const updateCommonInspection =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonInspection/updateCommonInspection`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const deleteInspection =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonInspection/deleteInspection`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const listCommonInspection =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonInspection/listCommonInspection`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const fMedItemGetAllNamesAndCodes=_=>{
  return axios.post(`${hospital}/CommonInspection/findAllFMedItemNamesAndCodes`);
};

