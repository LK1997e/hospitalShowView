import axios from 'axios'
import Qs from 'qs'

let base = ''
let hospital = 'http://localhost:8081/hospital'

axios.defaults.withCredentials = true

//从后台获取临床科室列表
export const getDeptList = () => {

  return axios.post(`${hospital}/register/getDeptList`)

}

//从后台获取挂号级别列表
export const getRegLevelList = () => {

  return axios.post(`${hospital}/registrationLevel/list`)

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
