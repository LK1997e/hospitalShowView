<template>
  <el-container style="margin-top: 20px">
    <el-header style="background:#41cde5;padding: 20px;height: 100px">
      <el-row class="row-bg" type="flex" align="middle">
        <el-col :span="4" class="grid-content">
          <span style="font-size:30px;color: white;"> <i class="el-icon-search"></i> 检查检验审核</span>
        </el-col>
      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">


      <el-row class="row-bg show-shadow" :gutter="20" type="flex" align="top">

        <el-col :span="18" style="padding-bottom: 10px;border-right: solid 1px #eee;">
          <el-divider content-position="left">病史信息</el-divider>
          <el-form ref="form" :model="medicalRecHome" label-position="left" label-width="100px"
                   style="padding-left:50px;">
            <el-form-item label="主诉">
              <span v-model="medicalRecHome.cheifComplaint">{{medicalRecHome.cheifComplaint}}</span>
            </el-form-item>
            <el-form-item label="现病史">
              <span v-model="medicalRecHome.currentMedicalHistory">{{medicalRecHome.currentMedicalHistory}}</span>
            </el-form-item>
            <el-form-item label="当前治疗状况">
              <span v-model="medicalRecHome.currentTreatmentSituation">{{medicalRecHome.currentTreatmentSituation}}</span>
            </el-form-item>
            <el-form-item label="既往病史">
              <span v-model="medicalRecHome.pastMedicalHistory">{{medicalRecHome.pastMedicalHistory}}</span>
            </el-form-item>
            <el-form-item label="过敏">
              <span v-model="medicalRecHome.allergies">{{medicalRecHome.allergies}}</span>
            </el-form-item>
            <el-form-item label="体格检查">
              <span v-model="medicalRecHome.physicalExamination">{{medicalRecHome.physicalExamination}}</span>
            </el-form-item>
            <el-form-item label="初步诊断">
              <span v-model="medicalRecHome.initialDiagnosis">{{medicalRecHome.initialDiagnosis}}</span>
            </el-form-item>
            <el-form-item label="检查建议">
              <span v-model="medicalRecHome.inspectRecommend">{{medicalRecHome.inspectRecommend}}</span>
            </el-form-item>
            <el-form-item label="注意事项">
              <span v-model="medicalRecHome.attention">{{medicalRecHome.attention}}</span>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="6" style="padding-bottom: 10px;border-right: solid 1px #eee;">
          <el-divider content-position="left">患者信息</el-divider>
          <el-form ref="form" :model="medicalRecHome" label-position="left" label-width="100px"
                   style="padding-left:20px;padding-top: 20px">
            <el-form-item label="患者名称">
              <span v-model="patient.patientName">{{patient.patientName}}</span>
            </el-form-item>
            <el-form-item label="患者身份证号">
              <span v-model="patient.patientIdentityCardNo">{{patient.patientIdentityCardNo}}</span>
            </el-form-item>
            <el-form-item label="患者年龄">
              <span v-model="patient.patientAge">{{patient.patientAge}}</span>
            </el-form-item>
            <el-form-item label="患者性别">
              <span v-model="patient.patientGender">{{patient.patientGender}}</span>
            </el-form-item>
            <el-form-item label="患者生日">
              <span v-model="patient.patientBirthday">{{patient.patientBirthday}}</span>
            </el-form-item>
            <el-form-item label="患者地址">
              <span v-model="patient. patientFamilyAddress">{{patient. patientFamilyAddress}}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>


      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">检查检验审核项目</el-divider>
          </el-header>
          <el-col :span="22" :offset="1" class="grid-content">
            <el-table
              ref="multipleTable"
              :data="inspectReviewList"
              style="width: 100%">
              <el-table-column label="项目编码" prop="fmeditemCode">
              </el-table-column>
              <el-table-column label="项目名称" prop="fmeditemName">
              </el-table-column>
              <el-table-column label="申请医生" prop="realName">
              </el-table-column>
              <el-table-column label="申请时间" prop="appearDate">
              </el-table-column>
              <el-table-column label="项目规格" prop="fmeditemFormat">
              </el-table-column>
              <el-table-column label="项目数量" prop="number">
              </el-table-column>

            </el-table>
          </el-col>
          <hr>




        </el-container>

      </el-row>

    </el-main>
  </el-container>

</template>


<script>
  import {
    InspectReview
  } from '../../../api/inspectionApi';
  import Qs from 'qs';

  export default {
    name: "inpectionCheck",
    data() {
      return {
        condition: {
          inspectionDetailsID: '1'
        },
        medicalRecHome: {
          cheifComplaint: '',
          currentMedicalHistory: '',
          currentTreatmentSituation: '',
          pastMedicalHistory: '',
          allergies: '',
          physicalExamination: '',
          initialDiagnosis: '',
          inspectRecommend: '',
          attention: ''
        },
        patient: {
          patientId: '',
          patientName: '',
          patientIdentityCardNo: '',
          patientAge: '',
          patientGender: '',
          patientBirthday: '',
          patientFamilyAddress: ''
        },


        inspectReviewList: [],


      }

    },
    methods: {
      getInspectReviewList() {
        InspectReview("inspectionDetailsID=" + this.condition.inspectionDetailsID).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.inspectReviewList = data.data;
              let arrayLength = 0;
              for (let inspectReview in this.inspectReviewList) {
                arrayLength++;
              }
              if (arrayLength !== 0) {
                let tempData=this.inspectReviewList[0];
                this.getmedicalRecHome(tempData);
                this.getPatient(tempData);

              }
            } else {
            }
          }
        });
      },
      getmedicalRecHome(data) {


          this.medicalRecHome.cheifComplaint = data.cheifComplaint;
          this.medicalRecHome.currentMedicalHistory = data.currentMedicalHistory;
          this.medicalRecHome.currentTreatmentSituation = data.currentTreatmentSituation;
          this.medicalRecHome.pastMedicalHistory = data.pastMedicalHistory;
          this.medicalRecHome.allergies = data.allergies;
          this.medicalRecHome.physicalExamination = data.physicalExamination;
          this.medicalRecHome.initialDiagnosis = data.initialDiagnosis;
          this.medicalRecHome.inspectRecommend = data.inspectRecommend;
          this.medicalRecHome.attention = data.attention;

      },
      getPatient(data){
          this.patient.patientId = data.patientId;
          this.patient.patientName = data.patientName;
          this.patient.patientIdentityCardNo = data.patientIdentityCardNo;
          this.patient.patientAge = data.patientAge;
          this.patient.patientGender = data.patientGender;
          this.patient.patientBirthday = data.patientBirthday;
          this.patient.patientFamilyAddress = data.patientFamilyAddress;
      }
    }
      ,
      mounted() {
        this.getInspectReviewList();


    }
  }
</script>


<style>
  .el-col-display {
    float: left;
    margin-left: 46px;
    margin-top: 6px;
    height: 40px
  }

  .el-row {
    margin-bottom: 10px;
  }

  .show-shadow {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .row-bg {
    padding: 10px 0;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

