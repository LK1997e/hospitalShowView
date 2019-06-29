<template>
  <el-container>
    <el-header style="background:#41cde5;">
      <el-col span="2" class="grid-content">
        <span style="font-size:20px;color: white;">病例首页</span>
      </el-col>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">
      <el-row class="row show-shadow"
              style="padding-bottom: 10px;" :gutter="18">

        <el-container class="show-shadow">
          <el-header>
            <el-divider >患者简要信息</el-divider>
          </el-header>
          <div>
            <el-form  :inline="true" :model="indexPatient"label-width="80px">

              <el-form-item label="姓名" property="patientName">
                <el-input v-model="indexPatient.patientName" readonly></el-input>
              </el-form-item>
              <el-form-item label="病历编号" property="medicalRecordNo">
                <el-input v-model="indexPatient.medicalRecordNo" readonly></el-input>
              </el-form-item>

              <el-form-item label="年龄" property="age">
                <el-input v-model="indexPatient.age" readonly></el-input>
              </el-form-item>
              <el-form-item label="性别" property="gender">
                <el-input v-model="indexPatient.gender" readonly></el-input>
              </el-form-item>

            </el-form>
          </div>

        </el-container>
        <br>


        <el-container class="show-shadow">
          <el-header>
            <el-divider  >病史内容</el-divider>
          </el-header>
          <div>
            <el-form :label-position="left" label-width="80px" :model="medicalRecordHomePart1">


              <el-row class="row-bg" >
                <el-col :span="20">
                  <div>
                    <el-form-item label="主诉" property="chiefComplaint">
                      <el-input type="textarea"
                                ref="chiefComplaint"
                                v-model="medicalRecordHomePart1.chiefComplaint"
                                name="chiefComplaint"
                                placeholder="主诉">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>


                <el-col :span="20">
                  <div>
                    <el-form-item label="现病史" property="currentMedicalHistory">
                      <el-input type="textarea"
                                ref="currentMedicalHistory"
                                v-model="medicalRecordHomePart1.currentMedicalHistory"
                                name="currentMedicalHistory"
                                placeholder="现病史">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div>
                    <el-form-item label="目前治疗情况" property="currentTreatmentSituation">
                      <el-input type="textarea"
                                ref="currentTreatmentSituation"
                                v-model="medicalRecordHomePart1.currentTreatmentSituation"
                                name="currentTreatmentSituation"
                                placeholder="目前治疗情况">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div>
                    <el-form-item label="既往史" property="pastMedicalHistory">
                      <el-input type="textarea"
                                ref="pastMedicalHistory"
                                v-model="medicalRecordHomePart1.pastMedicalHistory"
                                name="pastMedicalHistory"
                                placeholder="既往史">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div>
                    <el-form-item label="过敏史" property="allergies">
                      <el-input type="textarea"
                                ref="allergies"
                                v-model="medicalRecordHomePart1.allergies"
                                name="allergies"
                                placeholder="过敏史">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>


            </el-form>
          </div>
        </el-container>
        <el-container class="show-shadow">
          <el-header>
            <el-divider  >检查及结果</el-divider>
          </el-header>
          <div>
            <el-form :label-position="left" label-width="80px" :model="medicalRecordHomePart2">


              <el-row class="row-bg" >
                <el-col :span="20">
                  <div>
                    <el-form-item label="体格检查" property="physicalExamination">
                      <el-input type="textarea"
                                ref="physicalExamination"
                                v-model="medicalRecordHomePart2.physicalExamination"
                                name="physicalExamination"
                                placeholder="体格检查">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>


                <el-col :span="20">
                  <div>
                    <el-form-item label="辅助检查" property="currentMedicalHistory">
                      <el-input type="textarea"
                                ref="currentMedicalHistory"
                                v-model="medicalRecordHomePart2.currentMedicalHistory"
                                name="currentMedicalHistory"
                                placeholder="辅助检查">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>

              </el-row>


            </el-form>
          </div>
        </el-container>
        <!--两个按钮 -->
        //提交之后进入诊断界面
        //应该也是能改的

        <el-button type="primary" @click="add('medicalRecordHome')">提交</el-button>

        <el-button @click="resetForm()">重置</el-button>
        <el-button @click="tempStore()">暂存</el-button>

        <el-button @click="save_Template()">存为模板</el-button>

        <el-button @click="use_Template()">使用模板</el-button>
        <el-button @click="searchHistoryRec()">找该患者的历史病历</el-button>








      </el-row>
    </el-main>



  </el-container>

</template>

<script>
  import {
    findPatient,
    listPatientNoDiagnosis
  } from '../../api/outPatientApi/medicalRecHomeApi';
  export default {
    name: "MedicalRecHome",
    data() {
      return {
        medicalRecordHomePart1 :{},
        medicalRecordHomePart2 :{},
        indexPatientID:'',
        indexMedicalRecID:'',

        indexPatient :{},//被选中的病人
        input: '',
        textarea: ''

      }

    },
    methods: {
      //取患者信息
      getPatient(){

      },
      //添加
      add(){

      },
      //重置表单

      resetForm() {
        this.$refs[medicalRecordHomePart1].resetFields();
        this.$refs[medicalRecordHomePart2].resetFields();
      },

      tempStore(){

      },
      use_TempStore(){

      },
      //存为模板
      save_Template(){

      },
      //使用组套(可以弄一个检索框，根据组套的名字使用)
      use_Template(){

      },

      //在显示病人信息那块加一个查找历史病例
      searchHistoryRec(){

      },

      mounted(){
        alert("11");
        this.indexPatientID = this.$route.query.patientID;
        this.indexMedicalRecID = this.$route.query.medicalRecID;

      }

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
