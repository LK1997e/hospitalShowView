<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#41cde5;">

      <el-row class="row-bg">
        <el-col :span="2" class="grid-content" style="margin-bottom: 4px">
          <span style="font-size:20px;color: white;">处方管理</span>
        </el-col>

      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <el-row class="row-bg show-shadow">


        <el-col :span="24"
                style=" padding-bottom: 10px;border-left: solid 1px #eee">
          <el-divider content-position="left">管理操作</el-divider>
          <el-col :span="3" class="el-col-display">
            <el-link icon="el-icon-circle-plus" style="font-size: 16px;color: #11b95c"
                     @click="handleAdd">添加处方
            </el-link>
          </el-col>
        </el-col>
      </el-row>

      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">处方列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="prescriptionList"
            style="width: 100%"
          >

            <el-table-column label="编号" prop="id">
            </el-table-column>
            <el-table-column label="处方病历号" prop="medicalRecordNo">
            </el-table-column>
            <el-table-column label="状态" prop="medicalRecordNo">
              <template slot-scope="props">
                {{props.row.mark==131?"开立":(props.row.mark==149?"作废":"发送")}}
              </template>
            </el-table-column>
            <el-table-column label="操作1">
              <template slot-scope="props">
                <el-button icon="el-icon-edit" @click.native.prevent="handleEdit(props.row)" type="text"
                           size="small">
                  编辑处方
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作2">
              <template slot-scope="props">
                <el-button icon="el-icon-delete" @click.native.prevent="handleDelete(props.row.id)" type="text"
                           size="small" style="color: #e64242" :disabled="props.row.mark==151">
                  作废
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作3">
              <template slot-scope="props">
                <el-button icon="el-icon-s-promotion" style="color: darkkhaki" @click.native.prevent="handleSend(props.row)" type="text"
                           size="small"  :disabled="props.row.mark==149">
                  发送
                </el-button>
              </template>
            </el-table-column>


          </el-table>
          <hr>


          <el-dialog title="编辑处方信息" :visible.sync="editDialogFormVisible" width="40%">

            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="150px" class="demo-ruleForm">
              <el-row v-for="(detail,index) in editForm" :key="index">

                <el-row>
                  <el-con :span="6">
                    <el-form-item label="药品">
                      <el-select style="float: left;width: 250px"
                                 v-model="detail.drugID" filterable
                                 clearable placeholder="请选择">
                        <el-option
                          v-for="item in drugsOption"
                          :key="item.drugsCode"
                          :label="item.drugsName"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-con>


                  <el-con :span="6">
                    <el-form-item label="用法">
                      <el-input v-model="detail.usage" style="width: 280px"></el-input>
                    </el-form-item>
                  </el-con>

                  <el-col :span="6">
                    <el-form-item label="用量">
                      <el-input-number size="small" v-model="detail.dosage"
                                       :precision="2" :step="0.1" :min="0">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row>
                  <el-col :span="6">
                    <el-form-item label="频次">
                      <el-input-number size="small" v-model="detail.frequency"
                                       :step="1" :min="0">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="数量">
                      <el-input-number size="small" v-model="detail.quantity"
                                       :step="1" :min="0">
                      </el-input-number>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row>
                  <el-con :span="6">
                    <el-form-item label="用药嘱托">
                      <el-input v-model="detail.medication" style="width: 280px"></el-input>
                    </el-form-item>
                  </el-con>

                  <el-form-item label="是否付费">
                    {{detail.isPaid===133?'已缴费':(detail.isPaid===134?'未缴费':'已退费')}}
                  </el-form-item>
                  <el-form-item label="是否已取药">
                    {{detail.isGotDrugs===138?'已取药':(detail.isGotDrugs===139?'未取药':'已退药')}}
                  </el-form-item>

                  <el-form-item>
                    <el-button @click.prevent="removeDomain(detail)">删除</el-button>
                  </el-form-item>

                </el-row>

              </el-row>

              <el-form-item>
                <el-button @click="addDomain" :disabled="pMark==151||pMark==149">添加</el-button>
                <el-button type="primary" :disabled="pMark==151||pMark==149" @click="submitForm('editForm')">提交</el-button>
              </el-form-item>
            </el-form>

          </el-dialog>


        </el-container>


      </el-row>

    </el-main>


  </el-container>


</template>

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

<script>
  import {
    addPrescription,
    listDrugs,
    listPrescription,
    abolishPrescriptionDetail,
    addDetails,
    listPrescriptionDetails,
    drawPrescriptionDetail,
    sendPrescription
  } from '../../api/outPatientApi/applyPrescriptionApi';

  export default {
    name: "Prescription",
    data() {
      return {
        pMark:'',

        indexPatient: {
          medicalRecID: '',
          medicalRecordNo: '',
          diagnosisStatus: '',
          patientID: '',
          patientName: '',
          IdentityCardNo: '',
          age: '',
          gender: '',
          birthday: '',
          familyAddress: '',
        },


        drugsOption: [],

        //存放处方列表
        prescriptionList: [],

        //修改处方的对话框是否显示
        editDialogFormVisible: false,

        //编辑处方的内容
        editForm: [],
        //病历号
        medicalRecordID: '',
        editPrescriptionID: ''


      }

    },
    methods: {
      //获得所有处方列表
      init() {
        let index = JSON.parse(sessionStorage.getItem('patient'));

        this.indexPatient = index;
        console.log(this.indexPatient);
        console.log(this.indexPatient.patientID);
        this.medicalRecordID = this.indexPatient.medicalRecID;
        console.log(this.medicalRecordID);
      },

      getPrescriptionList() {
        listPrescription().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.prescriptionList = data.data;
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


      //获得所有药品的名称和编号
      getAllDrugNamesAndCodes() {
        listDrugs().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.drugsOption = data.data;
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

      //刷新页面信息
      freshInfo() {
        this.getPrescriptionList();
      },


      //删除对象
      handleDelete(val) {
        alert(val);
        let id = {prescriptionID: val};
        this.$confirm('确认作废？')
          .then(_ => {
            abolishPrescriptionDetail(id).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {
                    this.freshInfo();
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


      //点击添加处方
      handleAdd() {
        let params = {medicalRecordID: this.medicalRecordID, mark: 132};
        if (this.medicalRecordID === '') {
          this.$message({
            message: '请先诊断病人',
            type: 'warning'
          });
        }
        else {
          this.$confirm('确认添加？')
            .then(_ => {
              addPrescription(params).then((res) => {
                  if (res.status === 200) {
                    let data = res.data;
                    if (data.status === 'OK') {
                      this.$message({
                        message: data.msg,
                        type: 'success'
                      });
                      this.freshInfo();
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
              );

            });

        }
      },
      //提交（编辑表单）或（添加表单）
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editForm')
              this.$confirm('确认提交处方信息？')
                .then(_ => {
                  let params={data:this.editForm};
                  addDetails(params).then((res) => {
                      if (res.status === 200) {
                        let data = res.data;
                        if (data.status === 'OK') {
                          this.$message({
                            message: data.msg,
                            type: 'success'
                          });
                          this.freshInfo();
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },


      removeDomain(item) {
        let index = this.editForm.indexOf(item);
        if (index !== -1) {
          this.editForm.splice(index, 1)
        }
      },
      addDomain() {
        this.editForm.push({
          prescriptionID: this.editPrescriptionID,
          drugID: '',
          usage: '',
          dosage: '',
          frequency: '',
          quantity: '',
          medication: '',
          isPaid: 134,
          isGotDrugs: 139,
        });
      },
      handleEdit(propRow) {
        this.editPrescriptionID = propRow.id;
        this.editDialogFormVisible = true;
        this.pMark=propRow.mark;
        let params = {prescriptionID: propRow.id}
        listPrescriptionDetails(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.editForm=data.data;
            } else if (data.status === 'WARN') {
              this.$message({
                message: data.msg,
                type: 'warning'
              });
            } else {
              this.$message.error(data.msg);
            }

          }

        })
      },
      handleSend(propRow){
        let params={prescriptionID:propRow.id}
        sendPrescription(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.$message({
                message: data.msg,
                type: 'success'
              });
              this.freshInfo();

            } else if (data.status === 'WARN') {
              this.$message({
                message: data.msg,
                type: 'warning'
              });
            } else {
              this.$message.error(data.msg);
            }

          }

        })

      }



    },
    mounted() {
      this.init();
      this.getPrescriptionList();
      this.getAllDrugNamesAndCodes();
    }
  }
</script>


