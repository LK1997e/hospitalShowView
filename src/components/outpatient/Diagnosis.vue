<template>
  <el-container style="margin-top: 6px">
    <el-main style="border: 1px solid #49cde5;">
      <el-row class="row-bg show-shadow">
        <el-col :span="24"
                style=" padding-bottom: 10px;border-left: solid 1px #eee">
          <el-divider content-position="left">管理操作</el-divider>
          <el-col :span="3" class="el-col-display">
            <el-link icon="el-icon-circle-plus" style="font-size: 16px;color: #11b95c"
                     @click="handleAdd">添加
            </el-link>
          </el-col>
        </el-col>

      </el-row>
      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="center">诊断</el-divider>
          </el-header>
          <!-- 表格（放该病人的inspectionViewList）-->
          <el-table
            ref="multipleTable"
            :data="indexDiagnosisList"
            highlight-current-row
            style="width: 100%">
            <el-table-column label="ICD编码" prop="code" style="width: 15%">
            </el-table-column>
            <el-table-column label="疾病名称" prop="name" style="width: 15%">
            </el-table-column>
            <el-table-column label="主诊" prop="subjectMark" style="width: 15%">
              <template slot-scope="props">
                {{props.row.subjectMark==='1'?'是':'否'}}

              </template>
            </el-table-column>
            <el-table-column label="疑似" prop="doubtMark" style="width: 15%">
              <template slot-scope="props">
                {{props.row.doubtMark==='1'?'是':'否'}}
              </template>
            </el-table-column>
            <el-table-column label="发病日期" prop="diseaseDate" style="width: 15%">
            </el-table-column>
            <el-table-column label="诊断医生" prop="realName" style="width: 15%">
            </el-table-column>

            <el-table-column label="诊断类型">
              <template slot-scope="props">
                {{props.row.diagnosisMark==103?'西医':'中医'}}
              </template>
            </el-table-column>

            <el-table-column label="操作1">
              <template slot-scope="props">
                <el-button icon="el-icon-edit" @click.native.prevent="handleEdit(props.row)" type="text"
                           size="small">
                  编辑
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作2">
              <template slot-scope="props">
                <el-button icon="el-icon-delete" @click.native.prevent="handleDelete(props.row.id)" type="text"
                           size="small" style="color: #e64242">
                  删除
                </el-button>
              </template>
            </el-table-column>

          </el-table>

          <hr>
          <el-dialog title="修改诊断信息" :visible.sync="editDialogFormVisible" width="30%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">

              <el-form-item label="疾病名" prop="diseaseName">
                <el-autocomplete
                  v-model="editForm.diseaseName"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  :trigger-on-change="true"
                  @keyup.enter.native="diseaseSearchChange('0')"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="主诊" prop="subjectMark">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.subjectMark"
                           clearable placeholder="请选择">
                  <el-option key="1" label="是" value="1"></el-option>
                  <el-option key="0" label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="疑似" prop="doubtMark">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.doubtMark"
                           clearable placeholder="请选择">
                  <el-option key="1" label="是" value="1"></el-option>
                  <el-option key="0" label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="诊断类型" prop="diagnosisMark">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.diagnosisMark"
                           clearable placeholder="请选择">
                  <el-option key="ZY" label="西医" value="103"></el-option>
                  <el-option key="XY" label="中医" value="102"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">立即修改</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
              </el-form-item>


            </el-form>

          </el-dialog>

          <el-dialog title="添加诊断信息" :visible.sync="addDialogFormVisible" width="30%">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">

              <el-form-item label="疾病名" prop="diseaseName">
                <el-autocomplete
                  v-model="addForm.diseaseName"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @keyup.enter.native="diseaseSearchChange('1')"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="主诊" prop="subjectMark">

                <el-select style="float: left;width: 250px"
                           v-model="addForm.subjectMark"
                           clearable placeholder="请选择">
                  <el-option key="1" label="是" value="1"></el-option>
                  <el-option key="0" label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="疑似" prop="doubtMark">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.doubtMark"
                           clearable placeholder="请选择">
                  <el-option key="1" label="是" value="1"></el-option>
                  <el-option key="0" label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="诊断类型" prop="diagnosisMark">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.diagnosisMark"
                           clearable placeholder="请选择">
                  <el-option key="ZY" label="西医" value="103"></el-option>
                  <el-option key="XY" label="中医" value="102"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('addForm')">立即添加</el-button>
                <el-button @click="resetForm('addForm')">重置</el-button>
              </el-form-item>
            </el-form>
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
    addDiagnosis,
    getIndexDiagnosis,
    searchDisease,
    updateDiagnosis,
    getDiseaseID, deleteDiagnosis
  } from '../../api/outPatientApi/diagnosisApi';

  export default {
    name: "Diagnosis",
    data() {
      return {
        indexDiagnosisList: [],
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
        listParam: {
          //选择的诊断分类id
          deptCategoryID: '',
          //选择的诊断类别id
          typeID: ''

        },
        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },
        //被选中的病人
        medicalRecordID: '',
        initDialogVisible:false,
        allDiseases: [],
        editForm: {
          id:'',
          diseaseName: '',
          subjectMark: '',
          doubtMark: '',
          diagnosisMark: ''


        },
        addForm: {
          medicalRecordID:this.medicalRecordID,
          diseaseName: '',
          subjectMark: '',
          doubtMark: '',
          diagnosisMark: ''

        },
        editDialogFormVisible: false,
        addDialogFormVisible: false,
        //修改诊断规则


        rules: {
          diseaseName: [
            {required: true, message: '请输入疾病名称', trigger: 'blur'},
          ],
          subjectMark: [
            {required: true, message: '请选择是否主诊', trigger: 'change'},
          ],
          doubtMark: [
            {required: true, message: '请选择是否疑似', trigger: 'change'}
          ],
          diagnosisMark: [
            {required: true, message: '请选择诊断类型', trigger: 'change'}
          ]


        },

      }

    },
    methods:
      {
        init() {
          // alert("11");
          //this.indexPatient = this.$route.query.indexPatient;
          let index = JSON.parse(sessionStorage.getItem('patient'));

          this.indexPatient = index;
          if( this.indexPatient != null){

            ;
          }else{
            this.initDialogVisible = true;
          }
          console.log(this.indexPatient);
          console.log(this.indexPatient.patientID);
          this.medicalRecordID = this.indexPatient.medicalRecID;
          console.log(this.medicalRecordID);
        },
        getIndexDiagnosis() {
          let id = {'medicalRecordID': this.indexPatient.medicalRecID};
          getIndexDiagnosis(id).then((res) => {
            if (res.status === 200) {
              // alert("mb2");
              let data = res.data;
              if (data.status === 'OK') {
                this.indexDiagnosisList = data.data;
                // alert("该病人诊断长度" + this.indexDiagnosisList.length);
                console.log(this.indexDiagnosisList);
                // this.deptSearchOptions = data.data;
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

        //处理页大小改变
        handleSizeChange(val) {
          this.pageParams.pageSize = val;
          this.getIndexDiagnosis();
        },
        //处理当前页改变
        handleCurrentChange(val) {
          this.pageParams.pageNum = val;
          this.getIndexDiagnosis();
        },
        chu() {
          this.init();
          this.getIndexDiagnosis();
        },
        querySearch(queryString, cb) {
          let diseases = this.allDiseases;
          let results = queryString ? diseases.filter(this.createFilter(queryString)) : diseases;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
          };
        },
        diseaseSearchChange(state) {
          this.allDiseases = [];
          let diseaseName='';
          if(state==='0')
              diseaseName=this.editForm.diseaseName;
          else if(state==='1')
            diseaseName=this.addForm.diseaseName;
          if (diseaseName!== '') {
            let params = {str: diseaseName}
            searchDisease(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  data.data.forEach((item) => {
                    this.allDiseases.push({value: item.name})
                  });


                } else if (data.status === 'WARN') {
                  this.$message({
                    message: data.msg,
                    type: 'warning'
                  });
                } else {
                  this.$message.error(data.msg);
                }
              } else {
                alert('error');

              }

            });


          }

        },
        handleEdit(propRow) {

          this.editForm.diseaseName = propRow.name;
          this.editForm.subjectMark = propRow.subjectMark;
          this.editForm.doubtMark = propRow.doubtMark;
          this.editForm.id=propRow.id;
          if (propRow.diagnosisMark == 103)
            this.editForm.diagnosisMark = '103';
          else
            this.editForm.diagnosisMark = '102';


          this.editDialogFormVisible = true;
        },
        handleAdd() {
          this.addDialogFormVisible = true;
          this.addForm.diseaseName='';
          this.addForm.subjectMark= '';
          this.addForm.doubtMark= '';
          this.addForm.diagnosisMark = '';
        },
        //提交（编辑表单）或（添加表单）
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if (formName === 'editForm')
                this.$confirm('确认修改诊断信息？')
                  .then(_ => {
                    let params1={str:this.editForm.diseaseName};
                    let diseaseID='';
                    getDiseaseID(params1).then((res) => {
                        if (res.status === 200) {
                          let data = res.data;
                          if (data.status === 'OK') {
                            diseaseID=data.data;
                            alert(diseaseID);
                            if(diseaseID===null) {
                              this.$message({
                                message: '改疾病不存在',
                                type: 'warning'
                              });
                              return;
                            }
                            alert(diseaseID);
                            let params2={
                              id:this.editForm.id,
                              medicalRecordID:this.medicalRecordID,
                              diseaseID: diseaseID,
                              subjectMark: this.editForm.subjectMark,
                              doubtMark: this.editForm.doubtMark,
                              diagnosisMark: this.editForm.diagnosisMark}
                            updateDiagnosis(params2).then((res) => {
                                if (res.status === 200) {
                                  let data = res.data;
                                  if (data.status === 'OK') {
                                    this.chu();
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


                          } else if (data.status === 'WARN') {
                            this.$message({
                              message: data.msg,
                              type: 'warning'
                            });
                          } else {
                            this.$message({
                              message: "请输入正确的科室信息",
                              type: 'warning'
                            });

                          }

                        }
                      }
                    );


                  })
                  .catch(_ => {
                  });
              else if (formName === 'addForm')
                this.$confirm('确认添加诊断信息？')
                  .then(_ => {
                    let params1={str:this.addForm.diseaseName};
                    let diseaseID='';
                    getDiseaseID(params1).then((res) => {
                        if (res.status === 200) {
                          let data = res.data;
                          if (data.status === 'OK') {
                            diseaseID=data.data;
                            alert(diseaseID);
                            if(diseaseID===null) {
                              this.$message({
                                message: '改疾病不存在',
                                type: 'warning'
                              });
                              return;
                            }
                            alert(diseaseID);
                            let params2={
                              id:this.addForm.id,
                              medicalRecordID:this.medicalRecordID,
                              diseaseID: diseaseID,
                              subjectMark: this.addForm.subjectMark,
                              doubtMark: this.addForm.doubtMark,
                              diagnosisMark: this.addForm.diagnosisMark}
                            addDiagnosis(params2).then((res) => {
                                if (res.status === 200) {
                                  let data = res.data;
                                  if (data.status === 'OK') {
                                    this.chu();
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


                          } else if (data.status === 'WARN') {
                            this.$message({
                              message: data.msg,
                              type: 'warning'
                            });
                          } else {
                            this.$message({
                              message: "请输入正确的科室信息",
                              type: 'warning'
                            });

                          }

                        }
                      }
                    );

                  })
                  .catch(_ => {
                  });

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        goSearchPatient() {
          this.$router.push({
            path: '/outPatient/SearchPatient',

          });
        },
        //重置表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        //删除对象
        handleDelete(val) {
          let id = {diagnosisID: val};
          this.$confirm('确认删除？')
            .then(_ => {
              deleteDiagnosis(id).then((res) => {
                  if (res.status === 200) {
                    let data = res.data;
                    if (data.status === 'OK') {
                      this.chu();
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
      },
    mounted() {
      this.chu();




      }

    }
</script>

<style scoped>

</style>
