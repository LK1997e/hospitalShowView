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
            <el-form  :inline="true" :model="this.indexPatient"label-width="80px">

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
          <!-- 找模板的搜索框-->
          <el-select v-model="searchTempValue" @change="writeTemp" clearable placeholder="请选择">
            <el-option
              v-for="item in medicalRecHomeTemplate"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>

          <el-header>
            <el-divider  >病史内容</el-divider>
          </el-header>
          <div>
            <el-form :label-position="left" label-width="80px" :model="medicalRecordHome">


              <el-row class="row-bg" >
                <el-col :span="20">
                  <div>
                    <el-form-item label="主诉" property="chiefComplaint">
                      <el-input type="textarea"
                                ref="chiefComplaint"
                                v-model="medicalRecordHome.chiefComplaint"
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
                                v-model="medicalRecordHome.currentMedicalHistory"
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
                                v-model="medicalRecordHome.currentTreatmentSituation"
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
                                v-model="medicalRecordHome.pastMedicalHistory"
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
                                v-model="medicalRecordHome.allergies"
                                name="allergies"
                                placeholder="过敏史">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>


            </el-form>

            <el-divider  >检查及结果</el-divider>

            <el-form :label-position="left" label-width="80px" :model="medicalRecordHome">


              <el-row class="row-bg" >
                <el-col :span="20">
                  <div>
                    <el-form-item label="体格检查" property="physicalExamination">
                      <el-input type="textarea"
                                ref="physicalExamination"
                                v-model="medicalRecordHome.physicalExamination"
                                name="physicalExamination"
                                placeholder="体格检查">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>


                <el-col :span="20">
                  <div>
                    <el-form-item label="辅助检查" property="assistantExamination">
                      <el-input type="textarea"
                                ref="currentMedicalHistory"
                                v-model="medicalRecordHome.assistantExamination"
                                name="currentMedicalHistory"
                                placeholder="辅助检查">
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="resetForm('medicalRecordHome')">重置</el-button>
                    </el-form-item>
                  </div>
                </el-col>

              </el-row>


            </el-form>
          </div>
        </el-container>
        <!--两个按钮
        //提交之后进入诊断界面
        //应该也是能改的-->

        <el-button type="primary" @click="add()">提交</el-button>

        <el-button @click="resetForm('medicalRecordHome')">重置</el-button>
        <el-button @click="tempStore()">暂存</el-button>
        <el-button @click="use_TempStore()">使用暂存</el-button>
        <el-button @click="saveTempDialogVisible = true">存为模板</el-button>


        <!-- 做一个框显示所有的模板，写法跟推荐选择框一样-->


        <el-button @click="searchHistoryRec(this.indexPatient.patientID)">找该患者的历史病历</el-button>
        <el-dialog
          title="提示"
          :visible.sync="saveTempDialogVisible"
          width="30%"
          >


          <el-form :inline="true" :model="medicalRecTemp" ref="medicalRecTemp" class="demo-form-inline">
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="medicalRecTemp.name" placeholder="模板名称"></el-input>
            </el-form-item>
            <el-form-item label="适用范围" prop="type">
              <el-select v-model="medicalRecTemp.type" placeholder="适用范围">
                <el-option label="全院" value="104"></el-option>
                <el-option label="本科室" value="105"></el-option>
                <el-option label="个人" value="106"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save_Template()">确 定</el-button>
         </span>
        </el-dialog>



        <el-dialog
          title="未选择需诊断的患者"
          :visible.sync="initDialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>您未选中任何一位患者进行诊治~~</span>
          <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="goSearchPatient">确 定</el-button>
  </span>
        </el-dialog>



      </el-row>
    </el-main>



  </el-container>

</template>

<script>
  import {

    add,tempStore,use_CommonDiagnosis,searchHistoryRec,save_Template

  } from '../../api/outPatientApi/medicalRecHomeApi';
  import{
    getThisDoctorTemp,findMedicalRecHomeTemplate
  } from '../../api/outPatientApi/medicalRecHomeTempApi';
  import Qs from 'qs';
  export default {
    name: "MedicalRecHome",
    data() {
      return {
        searchTempValue:'',
        medicalRecHomeTemplate : [],
        medicalRecordHomePart1 :{},
        medicalRecordHome :{
          chiefComplaint:'',
          currentMedicalHistory :'',
          currentTreatmentSituation:'',
          pastMedicalHistory:'',
          allergies:'',
          physicalExamination:'',
          assistantExamination:''
        },
        medicalRecordHomePart2 :{},
        indexPatientID:'',
        indexMedicalRecID:'',

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
        },//被选中的病人
        input: '',
        textarea: '',
        medicalRecTemp:{
          name:'',
          type:'',
        },
        saveTempDialogVisible:false,
        initDialogVisible:'false',//初始化时用到的对话框

      }

    },
    methods: {

      add() {

        this.$confirm('确认提交？')
          .then(_ => {
            add(this.medicalRecordHome).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {

                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });
                  } else if (data.status === 'WARN') {
                    this.$message({
                      message: data.msg,
                      type: 'warning'
                    });
                  } else {
                    this.$message.error(data.msg);
                  }
                }
              }
            )

          })
          .catch(_ => {
          });
      },

      //重置表单

      resetForm(formName) {
        this.$refs[formName].resetFields();
        //this.$refs[medicalRecordHomePart2].resetFields();
      },

      tempStore(){
        sessionStorage.setItem('tempStore', JSON.stringify(this.medicalRecordHome));

      },
      use_TempStore(){
        this.medicalRecordHome = JSON.parse(sessionStorage.getItem('tempStore'));

      },
      //存为模板
      save_Template(){
alert(this.medicalRecTemp.name);
        this.medicalRecTemp.allergies =  this.medicalRecordHome.allergies;
        this.medicalRecTemp.chiefCompliant = this.medicalRecordHome.chiefComplaint;
        this.medicalRecTemp.currentMedicalHistory = this.medicalRecordHome.currentMedicalHistory;
        this.medicalRecTemp.currentTreatmentSituation =this.medicalRecordHome.currentTreatmentSituation;
        this.medicalRecTemp.pastMedicalHistory =this.medicalRecordHome.pastMedicalHistory;
        this.medicalRecTemp.physicalExamination =this.medicalRecordHome.physicalExamination;
        this.medicalRecTemp.assistantExamination =this.medicalRecordHome.assistantExamination;
        let temp = this.medicalRecTemp;
        save_Template(temp).then( (res) =>{
          alert("存模板");
          if (res.status === 200) {

            let data = res.data;
            if (data.status === 'OK') {
              alert("存储模板成功");

            } else if (data.status === 'WARN') {
              this.$message({
                message: data.msg,
                type: 'warning'
              });
            } else {
              this.$message.error(data.msg);
            }
          }

        });


      },
      //使用组套(可以弄一个检索框，根据组套的名字使用)
      use_Template(){
        getThisDoctorTemp().then((res) => {
          alert("111");
          if (res.status === 200) {
            alert("1111");
            let data = res.data;
            if (data.status === 'OK') {
              this.medicalRecHomeTemplate = data.data;

            } else if (data.status === 'WARN') {
              this.$message({
                message: data.msg,
                type: 'warning'
              });
            } else {
              this.$message.error(data.msg);
            }
          }

        });


      },
      writeTemp(){
        let str = this.searchTempValue;

        findMedicalRecHomeTemplate(str).then((res) =>{
          alert(str);
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              //this.searchValue = '';
              this.medicalRecTemp = data.data[0];

              this.medicalRecordHome.allergies =  this.medicalRecTemp.allergies;
              this.medicalRecordHome.chiefComplaint = this.medicalRecTemp.chiefCompliant;
              this.medicalRecordHome.currentMedicalHistory = this.medicalRecTemp.currentMedicalHistory;
              this.medicalRecordHome.currentTreatmentSituation =this.medicalRecTemp.currentTreatmentSituation;
              this.medicalRecordHome.pastMedicalHistory =this.medicalRecTemp.pastMedicalHistory;
              this.medicalRecordHome.physicalExamination =this.medicalRecTemp.physicalExamination;
              this.medicalRecordHome.assistantExamination =this.medicalRecTemp.assistantExamination;


              //this.pageParams.pages = data.data.pages;
              //this.pageParams.total = data.data.total;
              console.log(this.medicalRecTemp);
            } else {
              alert(data.msg);
            }
          }


        });

      },

      //在显示病人信息那块加一个查找历史病例
      searchHistoryRec(){

      },
      goSearchPatient() {
        this.$router.push({
          path: '/outPatient/SearchPatient',

        });
      },
      init(){
        alert("11");
        //this.indexPatient = this.$route.query.indexPatient;
        this.indexPatient= JSON.parse(sessionStorage.getItem('patient'));

        //this.indexPatient = index;
        //alert(this.indexPatient);
        if( this.indexPatient === null){

          this.initDialogVisible = true;
        }
        console.log(this.indexPatient);
        console.log(this.indexPatient.patientID);
        this.medicalRecordHome.medicalRecId =  this.indexPatient.medicalRecID;
      }



    },
    mounted(){
      this.init();
      this.use_Template();



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
