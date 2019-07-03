import axios from 'axios'
import Qs from 'qs'

let base = ''
let hospital = 'http://localhost:8081/hospital'

axios.defaults.withCredentials = true

export const applyCard = (listParams) => {

  listParams = Qs.stringify(listParams)

  return axios.post(
      `${hospital}/patientCard/apply`, listParams,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

}
