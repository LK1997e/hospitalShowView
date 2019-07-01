<template>
  <el-container style="margin-top: 20px">
    <el-header style="background:#41cde5;padding: 20px;height: 100px">
      <el-row class="row-bg" type="flex" align="middle">
        <el-col :span="4" class="grid-content">
          <span style="font-size:30px;color: white;"> <i class="el-icon-search"></i> 处置审核</span>
        </el-col>
      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">


      <el-row class="row-bg show-shadow"  type="flex" align="top">

        <el-col :span="18" style="padding-bottom: 10px;border-right: solid 1px #eee;">
          <el-header>
          <el-divider content-position="left">病史信息</el-divider>
          </el-header>
          <el-form ref="form" :model="medicalRecHome" label-position="left" label-width="150px"
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
            <el-form-item label="体格处置">
              <span v-model="medicalRecHome.physicalExamination">{{medicalRecHome.physicalExamination}}</span>
            </el-form-item>
            <el-form-item label="初步诊断">
              <span v-model="medicalRecHome.initialDiagnosis">{{medicalRecHome.initialDiagnosis}}</span>
            </el-form-item>
            <el-form-item label="处置建议">
              <span v-model="medicalRecHome.inspectRecommend">{{medicalRecHome.inspectRecommend}}</span>
            </el-form-item>
            <el-form-item label="注意事项">
              <span v-model="medicalRecHome.attention">{{medicalRecHome.attention}}</span>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="6" style="padding-bottom: 10px;border-right: solid 1px #eee;">
          <el-header>
          <el-divider content-position="left">患者信息</el-divider>
          </el-header>
          <el-form ref="form" :model="medicalRecHome" label-position="left" label-width="150px"
                   style="padding-left:30px;">
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
            <el-divider content-position="left">处置审核项目</el-divider>
          </el-header>
          <el-col :span="22" :offset="1" class="grid-content">
            <el-table
              ref="multipleTable"
              :data="disposalReviewList"
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

          <el-col :span="24"
                               style=" padding-bottom: 10px;border-left: solid 1px #eee">
          <el-header>
            <el-divider content-position="left">项目药品操作</el-divider>
          </el-header>
          <el-col :span="4" class="el-col-display">
            <el-link icon="el-icon-download" style="font-size: 16px;color: darkkhaki"
                     @click="approvedDrugs">批准药品
            </el-link>
          </el-col>

          <el-col :span="4" class="el-col-display">
            <el-link icon="el-icon-circle-plus" style="font-size: 16px;color: #11b95c"
                     @click="addDrugs">添加药品
            </el-link>
          </el-col>


          <el-col :span="4" class="el-col-display">
            <el-link icon="el-icon-delete-solid" style="font-size: 16px;color: #e64242"
                     @click="deleteDrugsList">批量删除药品
            </el-link>
          </el-col>

        </el-col>

          <el-col :span="22" :offset="1" class="grid-content">
            <el-table
              ref="multipleTable"
              :data="inpectMedList"
              style="width: 100%"
              @selection-change="handleMedSelectionChange">

              <el-table-column type="selection" prop="medMatListID">
              </el-table-column>
              <el-table-column label="编号" prop="medMatListID">
              </el-table-column>
              <el-table-column label="药品名称" prop="drugsName">
              </el-table-column>
              <el-table-column label="药品编码" prop="drugsCode">
              </el-table-column>
              <el-table-column label="药品规格" prop="drugsFormat">
              </el-table-column>
              <el-table-column label="用量" prop="dosage">
              </el-table-column>
              <el-table-column label="操作1">
                <template slot-scope="props">
                  <el-button icon="el-icon-edit" @click.native.prevent="editDrugs(props.row)" type="text"
                             size="small">
                    编辑
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作2">
                <template slot-scope="props">
                  <el-button icon="el-icon-delete" @click.native.prevent="deleteDrugs(props.row)" type="text"
                             size="small" style="color: #e64242">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-col>




          <el-dialog title="修改项目药品信息" :visible.sync="editDrugDialogFormVisible" width="30%">
            <el-form :model="editDrugForm" :rules="rules" ref="editDrugForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="药品搜索" prop="medicinesMaterialsID">
                <el-select  style="float: left;width: 250px"
                            filterable :filter-method="DrugsSearchValuesFilter"
                            v-model="editDrugForm.medicinesMaterialsID"  @change="setDrugs"
                            clearable placeholder="请选择" value="">
                  <el-option
                    v-for="item in DrugOptions"
                    :key="item.id"
                    :label="item.drugsName"
                    :value="item.id">
                    <span style="float: left">{{ item.drugsName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="药品剂量" prop="dosage">
                <el-input v-model="editDrugForm.dosage" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitDrugForm('editDrugForm')">修改</el-button>
                <el-button @click="resetDrugForm('editDrugForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>









          <el-dialog  title="添加项目药品信息" :visible.sync="addDrugDialogFormVisible" width="30%">
            <el-form :model="addDrugForm" :rules="rules" ref="addDrugForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="药品搜索" prop="medicinesMaterialsID">
                <el-select  style="float: left;width: 250px"
                            filterable :filter-method="DrugsSearchValuesFilter"
                            v-model="addDrugForm.medicinesMaterialsID"  @change="setDrugs"
                            clearable placeholder="请选择">
                  <el-option
                    v-for="item in DrugOptions"
                    :key="item.id"
                    :label="item.drugsName"
                    :value="item.id">
                    <span style="float: left">{{ item.drugsName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.drugsID }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="药品剂量" prop="dosage">
                <el-input v-model="addDrugForm.dosage" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitDrugForm('addDrugForm')">添加</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>


          <el-col :span="24"
                  style=" padding-bottom: 10px;border-left: solid 1px #eee">
            <el-header>
              <el-divider content-position="left">项目材料操作</el-divider>
            </el-header>
            <el-col :span="4" class="el-col-display">
              <el-link icon="el-icon-download" style="font-size: 16px;color: darkkhaki"
                       @click="approvedMat">批准材料
              </el-link>
            </el-col>

            <el-col :span="4" class="el-col-display">
              <el-link icon="el-icon-circle-plus" style="font-size: 16px;color: #11b95c"
                       @click="addMat">添加材料
              </el-link>
            </el-col>


            <el-col :span="4" class="el-col-display">
              <el-link icon="el-icon-delete-solid" style="font-size: 16px;color: #e64242"
                       @click="deleteMatList">批量删除材料
              </el-link>
            </el-col>

          </el-col>

          <el-col :span="22" :offset="1" class="grid-content">
            <el-table
              ref="multipleTable"
              :data="inpectMatList"
              style="width: 100%"
              @selection-change="handleMatSelectionChange">

              <el-table-column type="selection" prop="medMatListID">
              </el-table-column>
              <el-table-column label="编号" prop="medMatListID">
              </el-table-column>
              <el-table-column label="材料名称" prop="name">
              </el-table-column>
              <el-table-column label="材料编码" prop="code">
              </el-table-column>
              <el-table-column label="材料规格" prop="format">
              </el-table-column>
              <el-table-column label="用量" prop="dosage">
              </el-table-column>
              <el-table-column label="操作1">
                <template slot-scope="props">
                  <el-button icon="el-icon-edit" @click.native.prevent="editMat(props.row)" type="text"
                             size="small">
                    编辑
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作2">
                <template slot-scope="props">
                  <el-button icon="el-icon-delete" @click.native.prevent="deleteMat(props.row)" type="text"
                             size="small" style="color: #e64242">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-col>




          <el-dialog title="修改项目材料信息" :visible.sync="editMatDialogFormVisible" width="30%">
            <el-form :model="editMatForm" :rules="rules" ref="editMatForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="材料搜索" prop="medicinesMaterialsID">
                <el-select  style="float: left;width: 250px"
                            filterable :filter-method="matSearchValuesFilter"
                            v-model="editMatForm.medicinesMaterialsID"  @change="setMat"
                            clearable placeholder="请选择" value="">
                  <el-option
                    v-for="item in MatOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="材料剂量" prop="dosage">
                <el-input v-model="editMatForm.dosage" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitMatForm('editMatForm')">修改</el-button>
                <el-button @click="resetMatForm('editMatForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>



          <el-dialog  title="添加项目材料信息" :visible.sync="addMatDialogFormVisible" width="30%">
            <el-form :model="addMatForm" :rules="rules" ref="addMatForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="材料搜索" prop="medicinesMaterialsID">
                <el-select  style="float: left;width: 250px"
                            filterable :filter-method="matSearchValuesFilter"
                            v-model="addMatForm.medicinesMaterialsID"  @change="setMat"
                            clearable placeholder="请选择">
                  <el-option
                    v-for="item in MatOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="材料剂量" prop="dosage">
                <el-input v-model="addMatForm.dosage" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitMatForm('addMatForm')">添加</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>


        </el-container>

        <br>
        <br>
        <br>
        <br>
        <el-col :span="2" :offset="11" class="grid-content">
          <el-button type="primary" @click="approveDisposal">完成审核</el-button>
        </el-col>
        <br>
        <br>
        <br>
        <br>

      </el-row>


    </el-main>



  </el-container>

</template>


<script>
  import {
    DisposalReview,DisposalMatReview,DisposalMedReview,DeleteMedMat,DeleteMedMatByList,SearchDrugs,SearchMaterials,InsertMedMat,ApproveMat,ApproveMed,UpdateMedMat,ApproveDisposalDetails
  } from '../../../api/disposalApi';
  import Qs from 'qs';

  export default {
    name: "inpectionCheck",
    data() {
      return {
        condition: {
          disposalDetailsID: ''
        },
        medicalRecHome: {
          cheifComplaint: '',
          currentMedicalHistory: '',
          currentTreatmentSituation: '',
          pastMedicalHistory: '',
          allergies: '',
          physicalExamination: '',
          initialDiagnosis: '',
          disposalRecommend: '',
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


        disposalReviewList: [],
        inpectMatList:[],
        inpectMedList:[],
        DrugList:[],
        DrugOptions:[],
        MatList:[],
        MatOptions:[],

        drugCheckList: [],
        matCheckList: [],

        addDrugDialogFormVisible: false,
        addMatDialogFormVisible: false,

        editDrugDialogFormVisible: false,
        editMatDialogFormVisible: false,


        addDrugForm:{
          itemsType : 119,
          itemsDetailID:'',
          medicinesMaterialsID:'',
          dosage:'',
          matOrMedType:'0'
        },
        editDrugForm:{
          id:'',
          itemsType : 119,
          itemsDetailID:'',
          medicinesMaterialsID:'',
          dosage:'',
          matOrMedType:'0'
        },

        addMatForm:{
          itemsType : 119,
          itemsDetailID:'',
          medicinesMaterialsID:'',
          dosage:'',
          matOrMedType:'1'
        },
        editMatForm:{
          id:'',
          itemsType : 119,
          itemsDetailID:'',
          medicinesMaterialsID:'',
          dosage:'',
          matOrMedType:'1'
        },

        rules: {
          medicinesMaterialsID: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          dosage: [
            {required: true, message: '请输入剂量', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      getDisposalReviewList() {
        this.condition.disposalDetailsID = this.$route.params.disposalDetailsID;
        DisposalReview("disposalDetailsID=" + this.condition.disposalDetailsID).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.disposalReviewList = data.data;
              let arrayLength = 0;
              for (let disposalReview in this.disposalReviewList) {
                arrayLength++;
              }
              if (arrayLength !== 0) {
                let tempData = this.disposalReviewList[0];
                this.getmedicalRecHome(tempData);
                this.getPatient(tempData);
                this.getMed(tempData.disposaldetailsId);
                this.getMat(tempData.disposaldetailsId);
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
      getPatient(data) {
        this.patient.patientId = data.patientId;
        this.patient.patientName = data.patientName;
        this.patient.patientIdentityCardNo = data.patientIdentityCardNo;
        this.patient.patientAge = data.patientAge;
        this.patient.patientGender = data.patientGender;
        this.patient.patientBirthday = data.patientBirthday;
        this.patient.patientFamilyAddress = data.patientFamilyAddress;
      },
      getMed(id){
        let params="itemsDetailID="+id;
        DisposalMedReview(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.inpectMedList = data.data;
            } else {
              alert(data.msg);
            }
          }
        });
      },
      handleMedSelectionChange(items) {
        this.drugCheckList = [];
        items.forEach((item) => {
          this.drugCheckList.push(item.medMatListID);
        });
      },
      approvedDrugs() {
        this.$confirm('确认通过批准？')
          .then(_ => {
            alert(JSON.stringify(this.drugCheckList));
            let params = {id: this.drugCheckList};
            ApproveMed(params).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {
                    this.freshDrugInfo();
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });

                  } else if (data.status === 'NG') {
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
      addDrugs() {
        this.addDrugDialogFormVisible = true;
        this.addDrugForm.itemsDetailID = '';
        this.addDrugForm.medicinesMaterialsID = '';
        this.addDrugForm.dosage = '';
      },
      editDrugs(propRow){
        this.editDrugDialogFormVisible = true;
        this.editDrugForm.id=propRow.medMatListID;
        this.editDrugForm.itemsDetailID = propRow.itemsDetailID;
        this.editDrugForm.medicinesMaterialsID = propRow.medicinesMaterialsID;
        this.editDrugForm.dosage = propRow.dosage;
      },
      deleteDrugs(propRow) {
        let params = 'medMatListID='+propRow.medMatListID;
        this.$confirm('确认删除？')
          .then(_ => {
            DeleteMedMat(params).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {
                    this.freshDrugInfo();
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });
                  } else if (data.status === 'NG') {
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
      deleteDrugsList() {
        this.$confirm('确认批量删除？')
          .then(_ => {

            let params = {"id": this.drugCheckList};
            DeleteMedMatByList(params).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {
                    this.freshDrugInfo();
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });

                  } else if (data.status === 'NG') {
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
      setDrugs(){
        this.getDrugs();
        this.addDrugForm.itemsDetailID=this.disposalReviewList[0].disposaldetailsId;
      },
      freshDrugInfo(){
        this.getMed(this.disposalReviewList[0].disposaldetailsId);
      },
      getDrugs(params){
        SearchDrugs().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.DrugList = data.data;
              this.DrugOptions=data.data;
            } else {
              alert(data.msg);
            }
          }
        });
      },
      DrugsSearchValuesFilter(val) {
          this.DrugOptions = val ? this.DrugList.filter(this.createDrugsFilter(val)) : this.DrugList;
      },

      createDrugsFilter(queryString) {
        return (item) => {
          return (item.drugsName.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.mnemonicCode.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      }, submitDrugForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editDrugForm')
              this.$confirm('确认修改项目药品信息？')
                .then(_ => {
                  UpdateMedMat(this.editDrugForm).then((res) => {
                      if (res.status === 200) {
                        let data = res.data;
                        if (data.status === 'OK') {
                          this.$message({
                            message: data.msg,
                            type: 'success'
                          });
                          this.freshDrugInfo();
                        } else if (data.status === 'NG') {
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
            else if (formName === 'addDrugForm')
              this.$confirm('确认添加项目药品信息？')
                .then(_ => {
                  InsertMedMat(this.addDrugForm).then((res) => {
                      if (res.status === 200) {
                        let data = res.data;
                        if (data.status === 'OK') {
                          this.freshDrugInfo();
                          this.$message({
                            message: data.msg,
                            type: 'success'
                          });
                        } else if (data.status === 'NG') {
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

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetDrugForm(formName) {
        this.$refs[formName].resetFields();
      },

      getMat(id){
        let params="itemsDetailID="+id;
        DisposalMatReview(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.inpectMatList = data.data;
            } else {
              alert(data.msg);
            }
          }
        });
      },
      handleMatSelectionChange(items) {
        this.matCheckList = [];
        items.forEach((item) => {
          this.matCheckList.push(item.medMatListID);
        });
      },
      approvedMat() {
        this.$confirm('确认通过批准？')
          .then(_ => {
            let params = {id: this.matCheckList};
            ApproveMat(params).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {
                    this.freshMatInfo();
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });

                  } else if (data.status === 'NG') {
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
      addMat() {
        this.addMatDialogFormVisible = true;
        this.addMatForm.itemsDetailID = '';
        this.addMatForm.medicinesMaterialsID = '';
        this.addMatForm.dosage = '';
      },
      editMat(propRow){
        this.editMatDialogFormVisible = true;
        this.editMatForm.id=propRow.medMatListID;
        this.editMatForm.itemsDetailID = propRow.itemsDetailID;
        this.editMatForm.medicinesMaterialsID = propRow.medicinesMaterialsID;
        this.editMatForm.dosage = propRow.dosage;
      },
      deleteMat(propRow) {
        let params = 'medMatListID='+propRow.medMatListID;
        this.$confirm('确认删除？')
          .then(_ => {
            DeleteMedMat(params).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {
                    this.freshMatInfo();
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });
                  } else if (data.status === 'NG') {
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
      deleteMatList() {
        this.$confirm('确认批量删除？')
          .then(_ => {

            let params = {"id": this.matCheckList};
            DeleteMedMatByList(params).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {
                    this.freshMatInfo();
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });

                  } else if (data.status === 'NG') {
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
      setMat(){
        this.getMaterials();
        this.addMatForm.itemsDetailID=this.disposalReviewList[0].disposaldetailsId;
      },
      freshMatInfo(){
        this.getMat(this.disposalReviewList[0].disposaldetailsId);
      },
      getMaterials(params){
        SearchMaterials().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.MatList = data.data;
              this.MatOptions=data.data;
            } else {
              alert(data.msg);
            }
          }
        });
      },
      matSearchValuesFilter(val) {
        this.MatOptions = val ? this.MatList.filter(this.createMatFilter(val)) : this.MatList;
      },

      createMatFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      }, submitMatForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editMatForm')
              this.$confirm('确认修改项目材料信息？')
                .then(_ => {
                  UpdateMedMat(this.editMatForm).then((res) => {
                      if (res.status === 200) {
                        let data = res.data;
                        if (data.status === 'OK') {
                          this.$message({
                            message: data.msg,
                            type: 'success'
                          });
                          this.freshMatInfo();
                        } else if (data.status === 'NG') {
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
            else if (formName === 'addMatForm')
              this.$confirm('确认添加项目材料信息？')
                .then(_ => {
                  InsertMedMat(this.addMatForm).then((res) => {
                      if (res.status === 200) {
                        let data = res.data;
                        if (data.status === 'OK') {
                          this.freshMatInfo();
                          this.$message({
                            message: data.msg,
                            type: 'success'
                          });
                        } else if (data.status === 'NG') {
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

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetMatForm(formName) {
        this.$refs[formName].resetFields();
      },

      approveDisposal(){
        ApproveDisposalDetails("disposalDetailsID=" + this.condition.disposalDetailsID).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.$message({
                message: data.msg,
                type: 'success'
              });
            } else {
              this.$message({
                message: data.msg,
                type: 'warning'
              });
            }
          }
        });
      },

    },
    mounted() {
      this.getDisposalReviewList();
      this.getDrugs();
      this.getMaterials();
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

