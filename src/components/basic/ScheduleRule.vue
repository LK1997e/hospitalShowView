<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#41cde5;">

      <el-row class="row-bg">
        <el-col :span="2" class="grid-content" style="margin-bottom: 4px">
          <span style="font-size:20px;color: white;">排班规则管理</span>
        </el-col>
      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <el-row class="row-bg show-shadow">


        <el-col :span="12"
                style="padding-bottom: 10px;border-right: solid 1px #eee">
          <el-divider content-position="left">筛选查询</el-divider>
          <el-col :span="4" class="el-col-display">科室</el-col>
          <el-select style="float: left;margin-left: 8px" @change="getDoctorsByDeptID"
                     v-model="listParam.deptID" filterable :filter-method="deptSearchValuesFilter" clearable
                     placeholder="请选择">
            <el-option
              v-for="item in deptOptions"
              :key="item.code"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
            </el-option>
          </el-select>
          <el-col :span="2" class="el-col-display">医生</el-col>
          <el-select style="float: left;margin-left: 8px" @change="handleDeptOrDoctorChange"
                     v-model="listParam.doctorID"
                     clearable placeholder="请选择">
            <el-option
              v-for="item in doctorOptions"
              :key="item.code"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>

        </el-col>


        <el-col :span="12"
                style=" padding-bottom: 10px;border-left: solid 1px #eee">
          <el-divider content-position="left">管理操作</el-divider>
          <el-col :span="3" class="el-col-display">
            <el-link icon="el-icon-circle-plus" style="font-size: 16px;color: #11b95c"
                     @click="handleAdd">添加
            </el-link>
          </el-col>
          <el-col :span="3" class="el-col-display">

            <el-upload
              name="file"
              action="http://localhost:8081/hospital/scheduleRule/upload"
              :http-request="myUpload"
              :before-upload="handleBeforeUpload"

            >
              <el-link icon="el-icon-upload" style="font-size: 16px;color: #50bfff">导入信息</el-link>

            </el-upload>

          </el-col>
          <el-col :span="3" class="el-col-display">
            <el-link icon="el-icon-s-promotion" style="font-size: 16px;color: darkkhaki"
                     @click="getDownloadXLS">导出信息
            </el-link>
          </el-col>
          <el-col :span="3" class="el-col-display">
            <el-link icon="el-icon-delete-solid" style="font-size: 16px;color: #e64242"
                     @click="deleteByChoose">批量删除
            </el-link>
          </el-col>
          <el-col :span="3" class="el-col-display">
            <el-link icon="el-icon-download" style="font-size: 16px;color: #41cde5"
                     @click="getDownloadXLSTemplate">下载模板
            </el-link>
          </el-col>


        </el-col>

      </el-row>
      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">排班规则列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="scheduleRuleList"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="创建时间">
                    <span>{{ props.row.appearDate }}</span>
                  </el-form-item>
                  <el-form-item label="创建人">
                    <span>{{ props.row.appearUserName }}</span>
                  </el-form-item>
                  <el-form-item label="修改时间">
                    <span>{{ props.row.changeDate }}</span>
                  </el-form-item>
                  <el-form-item label="修改人">
                    <span>{{ props.row.changeUserName }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column type="selection" prop="id">

            </el-table-column>
            <el-table-column label="编号" prop="id">
            </el-table-column>
            <el-table-column label="排班规则助记编码" prop="code">
            </el-table-column>
            <el-table-column label="排班规则名称" prop="name">
            </el-table-column>
            <el-table-column label="国际ICD编码" prop="scheduleRuleIcd">
            </el-table-column>
            <el-table-column label="排班规则所属分类">
              <template slot-scope="props">
                {{props.row.deptIDName+'/'+props.row.doctorName}}
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

          <div class="block" align="center">

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              :current-page="pageParams.pageNum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageParams.total">
            </el-pagination>
          </div>


          <el-dialog title="修改排班规则信息" :visible.sync="editDialogFormVisible" width="40%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="150px" class="demo-ruleForm">
              <el-form-item label="排班规则名称" prop="name">
                <el-input v-model="editForm.name" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="排班规则助记编号" prop="code">
                <el-input v-model="editForm.code" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="国际Icd编码" prop="scheduleRuleIcd">
                <el-input v-model="editForm.scheduleRuleIcd" style="width: 280px"></el-input>
              </el-form-item>


              <el-form-item label="科室" prop="deptID">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.deptID" filterable :filter-method="deptSearchValuesFilter"
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in deptOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="医生" prop="doctorID">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.doctorID" filterable
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in doctorAllOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id"
                    v-if="item.code==editForm.deptID">
                    <span style="float: left">{{ item.name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">立即修改</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
              </el-form-item>
            </el-form>

          </el-dialog>

          <!--添加排班规则信息-->
          <el-dialog title="添加排班规则信息" :visible.sync="addDialogFormVisible" width="40%">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px" class="demo-ruleForm">
              <el-form-item label="排班规则名称" prop="name">
                <el-input v-model="addForm.name" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="排班规则助记编号" prop="code">
                <el-input v-model="addForm.code" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="国际Icd编码" prop="scheduleRuleIcd">
                <el-input v-model="addForm.scheduleRuleIcd" style="width: 280px"></el-input>
              </el-form-item>

              <el-form-item label="科室" prop="deptID">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.deptID" filterable :filter-method="deptSearchValuesFilter"
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in deptOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="医生" prop="doctorID">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.doctorID" filterable
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in doctorAllOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id"
                    v-if="item.code==addForm.deptID">
                    <span style="float: left">{{ item.name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('addForm')">立即新建</el-button>
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
    scheduleRuleGetList,
    deptIDGetAllNamesAndCodes,
    scheduleRuleGetByNameOrCode,
    scheduleRuleDeleteByID,
    scheduleRuleDeleteByChooses,
    scheduleRuleInfoUpdate,
    scheduleRuleInfoAdd,
    downloadXLS,
    createXLS,
    uploadXLS,
    createXLSTemplate,
    doctorGetAllNamesAndCodes,
    doctorGetByDeptID
  } from '../../api/scheduleRuleApi';

  export default {
    name: "ScheduleRule",
    data() {
      return {
        //判断是否需要copy
        checkIfCopy: 0,
        //所有医生的名称或编号
        doctorValues: [],
        //存放入选择列表的医生名称或编号
        doctorOptions: [],
        //所有科室的名称或编号
        deptIDValues: [],
        //存放入选择列表的医生名称或编号
        deptOptions: [],
        doctorAllOptions:[],

        listParam: {
          //选择的医生id
          doctorID: '',
          //选择的排班规则类别id
          deptID: ''

        },
        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },
        //存放排班规则列表
        scheduleRuleList: [],
        //copy部分
        copy: {
          scheduleRuleListCopy: [],
          pageNumCopy: '',
          totalCopy: '',
          //复制的医生id
          doctorIDCopy: undefined,
          //复制的排班规则类别id
          deptIDCopy: undefined

        },

        //排班规则搜索的名称或编号
        searchValue: '',
        //选中的排班规则id
        checkList: [],
        //添加排班规则的对话框是否显示
        addDialogFormVisible: false,
        //修改排班规则的对话框是否显示
        editDialogFormVisible: false,
        //添加排班规则的内容
        addForm: {
          name: '',
          code: '',
          scheduleRuleIcd: '',
          doctorID: '',
          deptID: ''
        },
        //修改排班规则的内容
        editForm: {
          id: '',
          name: '',
          code: '',
          scheduleRuleIcd: '',
          doctorID: '',
          deptID: '',
        },
        //修改排班规则规则
        rules: {
          name: [
            {required: true, message: '请输入排班规则名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},

          ],
          code: [
            {required: true, message: '请输入排班规则编号', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          scheduleRuleIcd: [
            {required: true, message: '请输入排班规则国际Icd编码', trigger: 'blur'},
            {min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur'}
          ],
          deptID: [
            {required: true, message: '请选择科室', trigger: 'change'}
          ],
          doctorID: [
            {required: true, message: '请选择医生', trigger: 'change'}
          ]
        },

        //导入条件选定
        uploadXLSCondition: {
          //遇到错误继续执行
          errorHappenContinue: false,
          //遇到重复的进行覆盖
          repeatCoverage: false
        }


      }

    },
    methods: {
      //获得所有排班规则列表

      getScheduleRuleList() {

        let params = {
          doctorID: this.listParam.doctorID,
          deptID: this.listParam.deptID,
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize
        };
        scheduleRuleGetList(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.searchValue = '';
              this.scheduleRuleList = data.data.list;
              this.pageParams.pages = data.data.pages;
              this.pageParams.total = data.data.total;
              this.copyInfo();
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
      //复制信息
      copyInfo() {
        this.copy.scheduleRuleListCopy = this.scheduleRuleList;
        this.copy.pageNumCopy = this.pageParams.pageNum;
        this.copy.totalCopy = this.pageParams.total;
        this.copy.doctorIDCopy = this.listParam.doctorID;
        this.copy.deptIDCopy = this.listParam.deptID;
      },
      //返回复制信息
      returnCopyInfo() {
        this.scheduleRuleList = this.copy.scheduleRuleListCopy;
        this.pageParams.pageNum = this.copy.pageNumCopy;
        this.pageParams.total = this.copy.totalCopy;
        this.listParam.doctorID = this.copy.doctorIDCopy;
        this.listParam.deptID = this.copy.deptIDCopy;
      },


      //获得所有科室名称和编号
      getAllDeptNamesAndCodes() {
        deptIDGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.deptIDValues = data.data;
              this.deptOptions = data.data;
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
      //获得所有医生名称和编号
      getAllDoctorAndCodes() {
        doctorGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.doctorValues = data.data;
              this.doctorOptions = data.data;
              this.doctorAllOptions=data.data;
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
      searchValueChange() {
        if (this.searchValue === '') {
          this.returnCopyInfo();
          this.checkIfCopy = 0;
        }
      },


      deptSearchValuesFilter(val) {
        this.deptOptions = val ? this.deptIDValues.filter(this.createFilter(val)) : this.deptIDValues;
      },



      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
//根据名称或编号查找排班规则信息
      scheduleRuleSearchChange() {
        if (this.searchValue === '') {
          this.returnCopyInfo();
          this.checkIfCopy = 0;
        } else {
          if (this.checkIfCopy === 0) {
            this.copyInfo();
            this.checkIfCopy = this.checkIfCopy + 1;
          }
          this.listParam.deptID = '';
          this.listParam.doctorID = '';
          this.pageParams.pageNum = 1;
          let params = {
            nameOrCode: this.searchValue,
            pageNum: this.pageParams.pageNum,
            pageSize: this.pageParams.pageSize
          };
          scheduleRuleGetByNameOrCode(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.scheduleRuleList = data.data.list;
                  this.pageParams.total = data.data.total;
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

        }
      },
      //排班规则的选择发生改变
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },
      //处理页大小改变
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.getScheduleRuleList();
      },
      //处理当前页改变
      handleCurrentChange(val) {
        this.pageParams.pageNum = val;
        this.getScheduleRuleList();
      },
      //处理选择的科室或医生发生改变
      handleDeptOrDoctorChange() {
        this.pageParams.pageNum = 1;
        this.searchValue = '';
        this.getScheduleRuleList();
      },
      //删除对象
      handleDelete(val) {
        let id = {'id': val};
        this.$confirm('确认删除？')
          .then(_ => {
            scheduleRuleDeleteByID(id).then((res) => {
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
        if (this.searchValue === '') {
          this.getScheduleRuleList();
        } else {
          this.scheduleRuleSearchChange(this.searchValue);
        }
      },
      //删除所选排班规则
      deleteByChoose() {
        this.$confirm('确认批量删除？')
          .then(_ => {
            let params = {"id": this.checkList};
            scheduleRuleDeleteByChooses(params).then((res) => {
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
      //根据科室获得医生
      getDoctorsByDeptID() {
        if (this.listParam.deptID === '')
          this.getAllDoctorAndCodes();
        else {
          let params = {"id": this.listParam.deptID};
          doctorGetByDeptID(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.doctorOptions = data.data;
                  this.doctorValues = data.data;
                  this.listParam.deptCategoryID='';
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
          ).catch(_ => {
          });
        }
        this.handleDeptOrDoctorChange();
      },
      //点击编辑
      handleEdit(propRow) {
        this.editForm.id = propRow.id;
        this.editForm.name = propRow.name;
        this.editForm.code = propRow.code;
        this.editForm.scheduleRuleIcd=propRow.scheduleRuleIcd;
        this.editForm.deptID = propRow.deptID;
        this.editForm.doctorID = propRow.doctorID;
        this.editDialogFormVisible = true;
      },
      //点击添加排班规则
      handleAdd() {
        this.editForm.id = '';
        this.editForm.name = '';
        this.editForm.code = '';
        this.editForm.scheduleRuleIcd='';
        this.editForm.deptID = '';
        this.editForm.doctorID = '';
        this.addDialogFormVisible = true;
      },
      //提交（编辑表单）或（添加表单）
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editForm')
              this.$confirm('确认修改排班规则信息？')
                .then(_ => {
                  scheduleRuleInfoUpdate(this.editForm).then((res) => {
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
              this.$confirm('确认添加排班规则信息？')
                .then(_ => {
                  scheduleRuleInfoAdd(this.addForm).then((res) => {
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
      //导出排班规则信息的XLS文件
      getDownloadXLS() {
        createXLS().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              let params = {fileName: data.data, pos: 'static/basicXLS'};
              downloadXLS(params).then((res) => {
                if (!res) {
                  return
                }
                let url = window.URL.createObjectURL(res.data)
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', params.fileName);
                document.body.appendChild(link)
                link.click();
              })
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
      //导出XLS模板文件
      getDownloadXLSTemplate() {
        createXLSTemplate().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              let params = {fileName: data.data, pos: 'static/basicXLSTemplate'};
              downloadXLS(params).then((res) => {
                if (!res) {
                  return
                }
                let url = window.URL.createObjectURL(res.data);
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', params.fileName);
                document.body.appendChild(link);
                link.click();
              })
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
      //上传之前
      handleBeforeUpload(file) {
        this.whetherShowList = true;
        const isXLS = file.type === 'application/vnd.ms-excel';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isXLS) {
          this.$message.error('导入文件必须是xls格式!');
        }
        if (!isLt2M) {
          this.$message.error('导入文件大小不能超过 2MB!');
        }
        return (isXLS) && isLt2M;
      },
      //导入信息
      myUpload(content) {
        this.uploadXLSCondition.errorHappenContinue = false;

        this.$confirm('是否确定导入？').then(_ => {
          this.$confirm('遇到错误是否继续？').then(_ => {
            this.uploadXLSCondition.errorHappenContinue = true;
          }).catch(_ => {
            this.uploadXLSCondition.errorHappenContinue = false;
          });
        }).then(_ => {
          this.$confirm('排班规则信息重复是否覆盖？').then(_ => {
            this.uploadXLSCondition.repeatCoverage = true;
          }).catch(_ => {
            this.uploadXLSCondition.repeatCoverage = false;
          }).finally(_ => {
            uploadXLS(content, this.uploadXLSCondition).then(res => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.freshInfo();
                  this.$message({
                    message: data.msg,
                    type: 'success'
                  });
                  content.onSuccess('文件上传成功')

                } else if (data.status === 'WARN') {
                  this.$message({
                    message: data.msg,
                    type: 'warning'
                  });
                } else {
                  this.$message.error(data.msg);
                }
              }
            }).catch(error => {
              content.onError('文件上传失败');
            });
          });
        })
      },


    },
    mounted() {
      this.getScheduleRuleList();
      this.getAllDeptNamesAndCodes();
      this.getAllDoctorAndCodes();
    }
  }
</script>


