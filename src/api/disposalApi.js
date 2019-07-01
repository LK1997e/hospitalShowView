import axios from 'axios';
let hospital = 'http://localhost:8081/hospital';


export const DisposalSearchFMedItem=(params)=>{return axios.post(`${hospital}/disposal/searchFMedItem`,params);};
export const Disposalformview=(params)=>{return axios.post(`${hospital}/disposal/disposalformview`,params);};


export const DisposalMedReview=(params)=>{return axios.post(`${hospital}/disposal/disposalmedreview`,params);};
export const DisposalMatReview=(params)=>{return axios.post(`${hospital}/disposal/disposalmatreview`,params);};
export const DisposalReview=(params)=>{return axios.post(`${hospital}/disposal/disposalreview`,params);};
export const DeleteMedMat=(params)=>{return axios.post(`${hospital}/disposal/deleteMedMat`,params);};
export const DeleteMedMatByList=(params)=>{return axios.post(`${hospital}/disposal/deleteMedMatByList`,params);};
export const UpdateMedMat=(params)=>{return axios.post(`${hospital}/disposal/updateMedMat`,params);};
export const SearchDrugs=(params)=>{return axios.post(`${hospital}/disposal/searchDrugs`,params);};
export const SearchMaterials=(params)=>{return axios.post(`${hospital}/disposal/searchMaterials`,params);};
export const InsertMedMat=(params)=>{return axios.post(`${hospital}/disposal/insertMedMat`,params);};
export const ApproveMat=(params)=>{return axios.post(`${hospital}/disposal/approveMat`,params);};
export const ApproveMed=(params)=>{return axios.post(`${hospital}/disposal/approveMed`,params);};
export const ApproveDisposalDetails=(params)=>{return axios.post(`${hospital}/disposal/approveDisposalDetails`,params);};


export const RegisterDisposalDetails=(params)=>{return axios.post(`${hospital}/disposal/registerDisposalDetails`,params);};


export const FinishDisposal=(params)=>{return axios.post(`${hospital}/disposal/finishDisposal`,params);};
