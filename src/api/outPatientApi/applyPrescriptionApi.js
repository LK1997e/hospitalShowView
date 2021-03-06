import axios from 'axios';
import Qs from 'qs';
let base = '';
let hospital = 'http://localhost:8081/hospital';

export const addPrescription =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/addPrescription`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const tempStore =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/tempStore`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const addDetails =  (listParams) =>
{
  return axios.post(
    `${hospital}/ApplyPrescription/addDetails`,listParams);
}

export const searchDrugs =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/searchDrugs`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const drawPrescriptionDetail =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/drawPrescriptionDetail`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const addProjectFee =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/addProjectFee`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deleteDrugs =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/deleteDrugs`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const deletePrescription =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  alert(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/deletePrescription`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const abolishPrescriptionDetail =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/abolishPrescriptionDetail`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const sendPrescription =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/sendPrescription`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const useCommonDrugs =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/useCommonDrugs`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const saveTemplate =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/saveTemplate`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

export const saveTemplateDetails =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/saveTemplateDetails`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const use_Check =  (listParams) =>
{
  listParams=Qs.stringify(listParams);
  return axios.post(
    `${hospital}/ApplyPrescription/use_Check`,listParams,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}
export const listDrugs = _ =>
{
  return axios.post(
    `${hospital}/ApplyPrescription/listDrugs`);
}

export const listPrescription = _ =>
{
  return axios.post(
    `${hospital}/ApplyPrescription/listPrescription`);
}

export const listPrescriptionDetails =params =>
{
  params=Qs.stringify(params);
  return axios.post(
    `${hospital}/ApplyPrescription/listPrescriptionDetail`,params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
}

