import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

export const newDisposal =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/newDisposal`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const addDisposalDetailsList =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/addDisposalDetailsList`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const addDisposalDetails =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/addDisposalDetails`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const searchDisposal =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/searchDisposal`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const tempStore =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/tempStore`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const drawDisposalDetails =  (listParams) =>
{

  return axios.post(
    `${hospital}/ApplyDisposal/drawDisposalDetails`);
}

export const addProjectFee =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/addProjectFee`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const deleteDisposalDetails =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/deleteDisposalDetails`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const abolishDisposalDetails =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/abolishDisposalDetails`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const useCommonDisposal =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/useCommonDisposal`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const listDisposal =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/listDisposal`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const listIndexDisposal =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/listIndexDisposal`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}


export const deleteDisposalDetailsByID =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/deleteDisposalDetailsByID`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const listCommonDisposal =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/listCommonDisposal`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const getIndexFMedItem =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/getIndexFMedItem`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}




export const use_Check =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyDisposal/use_Check`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
