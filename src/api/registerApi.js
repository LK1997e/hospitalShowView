import axios from 'axios'

let base = ''
let hospital = 'http://localhost:8081/hospital'

axios.defaults.withCredentials = true

//从后台获取临床科室列表
export const getDeptList = () => {

  return axios.post(`${hospital}/register/getDeptList`)

}

//从后台获取挂号级别列表
export const getRegLevelList = () => {

}
