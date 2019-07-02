import axios from 'axios'
import Qs from 'qs'

let base = ''
let hospital = 'http://localhost:8081/hospital'

axios.defaults.withCredentials = true

//提交挂号信息
export const register = (isHaveCard, patientName, identityCardNo, gender,
                         birthday, familyAddress, passwd, registeredLevelID,
                         departmentID, doctorID, seeDoctorDate, regSourceID,
                         payID, expense) => {

  let params = 'isHaveCard=' + isHaveCard + '&patientName=' + patientName +
      '&identityCardNo=' + identityCardNo + '&gender=' + gender + '&birthday=' +
      birthday + '&familyAddress=' + familyAddress + '&passwd=' + passwd +
      '&registeredLevelID=' + registeredLevelID + '&departmentID=' +
      departmentID + '&doctorID=' + doctorID + '&seeDoctorDate=' +
      seeDoctorDate +
      '&regSourceID=' + regSourceID + '&payID=' + payID + '&expense=' + expense

  return axios.post(
      `${hospital}/register/reg`, params,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

}

//从后台获取临床科室列表
export const getDeptList = () => {

  return axios.post(`${hospital}/register/getDeptList`)

}

//从后台获取挂号级别列表
export const getRegLevelList = () => {

  return axios.post(`${hospital}/registrationLevel//findAllRegLevNamesAndCodes`)

}

//从后台获取排班医生列表
export const getDoctor = (listParams) => {

  listParams = Qs.stringify(listParams)

  return axios.post(
      `${hospital}/register/getDoctor`, listParams,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

}

//从后台获取挂号来源
export const getRegSource = () => {

  return axios.post(`${hospital}/register/getRegSource`)
}

//从后台获取收费类别
export const getPayCategory = () => {

  return axios.post(`${hospital}/register/getPayCategory`)
}

export const calculateRegFee = (listParams) => {

  listParams = Qs.stringify(listParams)

  return axios.post(`${hospital}/register/calculateExpanse`, listParams,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

//从后台获取所有挂号信息
export const getRegInfoList = (listParams) => {

  listParams = Qs.stringify(listParams)

  return axios.post(`${hospital}/register/allInfo`, listParams,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

//从后台根据病历号获取指定挂号信息
export const getRegInfo = (medRecNo) => {

  let params = 'medRecNo=' + medRecNo

  return axios.post(`${hospital}/register/getSelectRegInfo`, params,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

//从后台获取今日工作量
export const getTodayWorkload = () => {
  kload
  return axios.post(`${hospital}/register/todayWor`)
}

//退号
export const retreat = (regInfoID) => {

  let params = 'regInfoID=' + regInfoID

  return axios.post(`${hospital}/register/retreat`, params,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

}
