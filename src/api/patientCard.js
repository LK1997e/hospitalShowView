import axios from 'axios'
import Qs from 'qs'

let base = ''
let hospital = 'http://localhost:8081/hospital'

axios.defaults.withCredentials = true

//申请就诊卡
export const applyCard = (listParams) => {

  listParams = Qs.stringify(listParams)

  return axios.post(
      `${hospital}/patientCard/apply`, listParams,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

}

//获取所有的就诊卡列表
export const getPatientCardList = (listParams) => {

  listParams = Qs.stringify(listParams)

  return axios.post(`${hospital}/patientCard/getPatientCardList`, listParams,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

//获取指定id的就诊卡信息
export const getPatientCard = (patientCardID) => {

  let params = 'patientCardID=' + patientCardID

  return axios.post(`${hospital}/patientCard/getPatientCard`, params,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

//充值
export const recharge = (listParams) => {

  listParams = Qs.stringify(listParams)

  return axios.post(`${hospital}/patientCard/recharge`, listParams,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}
