import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

export const addCommonDrugs =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDrugs/addCommonDrugs`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const addCommonDrugsList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDrugs/addCommonDrugsList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteCommonDrugsList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDrugs/deleteCommonDrugsList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const updateCommonDrugs =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDrugs/updateCommonDrugs`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteCommonDrugs =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDrugs/deleteCommonDrugs`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

