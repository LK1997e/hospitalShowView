<template>
  <el-container>
  <el-button type="text" @click="dialogTableVisible = true">新增</el-button>
  <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
    <el-table :data="indexPatient">
      <el-table-column property="patientID" label="ID" width="150"></el-table-column>
      <el-table-column property="patientName" label="姓名" width="200"></el-table-column>
      <el-table-column property="medicalRecID" label="地址"></el-table-column>
    </el-table>
  </el-dialog>
  </el-container>
</template>

<script>
  import {

    newInspection,
    addInspectionDetailsList,
    addInspectionDetails,
    searchInspection,
    tempStore,
    drawInspectionDetails,
    addProjectFee,
    deleteInspectionDetails,
    abolishInspectionDetails,
    useCommonInspection,
    saveTemplate,
    saveTemplateDetails,
    use_Check,
    lookInspectionRes
  } from '../../api/outPatientApi/applyInspectionApi';
    export default {
      name: "ApplyInspection",
      data() {
        return {
          medicalRecHomeTemplate: {},
          indexPatient :{
            medicalRecID : '',
            medicalRecordNo : '',
            diagnosisStatus :'',
            patientID : '',
            patientName :'',
            IdentityCardNo : '',
            age : '',
            gender :'',
            birthday :'',
            familyAddress:'',
          },
          indexPatientID :'',
          dialogTableVisible: false,
        }
        },
          methods:
        {
          initial(){
            alert("11");
            var indexPatient = sessionStorage.getItem('patient');

            this.indexPatient = indexPatient;
            console.log(this.indexPatient);
            console.log(this.indexPatient.patientID);
          }

        },
        mounted()
        {
          initial();




        }

    }

</script>

<style scoped>

</style>
