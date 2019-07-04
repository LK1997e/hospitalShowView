import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

export const addCommonDisposal =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDisposal/addCommonDisposal`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const addCommonDisposalList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDisposal/addCommonDisposalList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const deleteCommonDisposalList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDisposal/deleteCommonDisposalList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const updateCommonDisposal =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDisposal/updateCommonDisposal`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const deleteCommonDisposal =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDisposal/deleteCommonDisposal`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const findCommonDisposal =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDisposal/findCommonDisposal`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const getThisDoctorTemp =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/CommonDisposal/getThisDoctorTemp`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

