<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#41cde5;">


      <el-row class="row-bg">
        <el-col :span="2" class="grid-content" style="margin-bottom: 4px">
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
                     @click="handleAdd">添加
            </el-link>
          </el-col>

          <el-col :span="3" class="el-col-display">
            <el-link icon="el-icon-delete-solid" style="font-size: 16px;color: #e64242"
                     @click="deleteByChoose">批量删除
            </el-link>
          </el-col>

        </el-col>

      </el-row>
      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">常用检查检验项目列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="commonInspectionList"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" prop="id">

            </el-table-column>
            <el-table-column label="编号" prop="id">
            </el-table-column>
            <el-table-column label="常用检查检验项目编码" prop="mnemonicCode">
            </el-table-column>
            <el-table-column label="常用检查检验项目名称" prop="name">
            </el-table-column>
            <el-table-column label="规格" prop="format">
            </el-table-column>
            <el-table-column label="价格" prop="price">
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


          <el-dialog title="修改常用检查检验项目信息" :visible.sync="editDialogFormVisible" width="30%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="非药品项目" prop="fMedItemID">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.fMedItemID" filterable :filter-method="fMedItemSearchValuesFilter"
                           clearable placeholder="请选择" @change="getAllFMedItemNamesAndCodes">
                  <el-option
                    v-for="item in fMedItemOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="医生" prop="doctorID" width="30%">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.doctorID" filterable :filter-method="doctorSearchValuesFilter"
                           clearable
                           placeholder="请选择" @change="getAllDoctorNamesAndCodes">
                  <el-option
                    v-for="item in doctorOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">立即修改</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
              </el-form-item>
            </el-form>

          </el-dialog>

          <el-dialog title="添加常用检查检验项目信息" :visible.sync="addDialogFormVisible" width="30%">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="非药品项目" prop="fMedItemID">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.fMedItemID" filterable :filter-method="fMedItemSearchValuesFilter"
                           clearable placeholder="请选择" @change="getAllFMedItemNamesAndCodes">
                  <el-option
                    v-for="item in fMedItemOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('addForm')">立即创建</el-button>
                <el-button @click="resetForm('addForm')">重置</el-button>
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
    listCommonInspection,
    deleteInspection,
    deleteCommonInspectionList,
    updateCommonInspection,
    addCommonInspection,
    fMedItemGetAllNamesAndCodes
  } from '../../api/outPatientApi/commonInspectionApi';

  export default {
    name: "CommonInspection",
    data() {
      return {
        //所有非药品项目的名称或编号
        fMedItemValues: [],
        //存放入选择列表的非药品项目名称或编号
        fMedItemOptions: [],

        //存放常用检查检验项目列表
        commonInspectionList: [],


        //选中的常用检查检验项目id
        checkList: [],
        //添加常用检查检验项目的对话框是否显示
        addDialogFormVisible: false,
        //修改常用检查检验项目的对话框是否显示
        editDialogFormVisible: false,
        //添加常用检查检验项目的内容
        addForm: {
          fMedItemID: ''
        },
        //修改常用检查检验项目的内容
        editForm: {
          id: '',
          fMedItemID: ''
        },
        //修改常用检查检验项目规则
        rules: {
          fMedItemID: [
            {required: true, message: '请选择非药品项目', trigger: 'change'}
          ],


        },


      }

    },
    methods: {
      //获得所有常用检查检验项目列表
      getCommonInspectionList() {
        listCommonInspection().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.searchValue = '';
              this.commonInspectionList = data.data;
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


      //获得所有非药品项目名称和编号
      getAllFMedItemNamesAndCodes() {
        fMedItemGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.fMedItemValues = data.data;
              this.fMedItemOptions = data.data;
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
      },

      fMedItemSearchValuesFilter(val) {
        this.fMedItemOptions = val ? this.fMedItemValues.filter(this.createFilter(val)) : this.fMedItemValues;
      },

      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },

      //常用检查检验项目的选择发生改变
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },


      //删除对象
      handleDelete(val) {
        let id = {'commonInspectionID': val};
        this.$confirm('确认删除？')
          .then(_ => {
            deleteInspection(id).then((res) => {
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
      //刷新页面信息
      freshInfo() {
        this.getCommonInspectionList();
        this.getAllFMedItemNamesAndCodes();
      },
      //删除所选常用检查检验项目
      deleteByChoose() {
        this.$confirm('确认批量删除？')
          .then(_ => {
            let params = {"id": this.checkList};
            deleteCommonInspectionList(params).then((res) => {
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
      //点击编辑
      handleEdit(propRow) {
        this.editForm.id = propRow.id;
        this.editForm.fMedItemID = propRow.fMedItemID;
        this.editDialogFormVisible=true;
      },
      //点击添加常用检查检验项目
      handleAdd() {
        this.addForm.fMedItemID = '';
        this.addDialogFormVisible=true;
      },
      //提交（编辑表单）或（添加表单）
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editForm')
              this.$confirm('确认修改常用检查检验项目信息？')
                .then(_ => {
                  updateCommonInspection(this.editForm).then((res) => {
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
            else if (formName === 'addForm')
              this.$confirm('确认添加常用检查检验项目信息？')
                .then(_ => {
                  let params={inspectionID:this.addForm.fMedItemID};
                  addCommonInspection(params).then((res) => {
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



    },
    mounted() {
      this.getCommonInspectionList();
      this.getAllFMedItemNamesAndCodes();
    }
  }
</script>


