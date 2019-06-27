<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#41cde5;">


      <el-row class="row-bg">
        <el-col :span="2" class="grid-content" style="margin-bottom: 4px">
          <span style="font-size:20px;color: white;">科室管理</span>
        </el-col>
        <el-col class="grid-content" :span="6" :offset="16">
          <el-select v-model="searchValue" @change="deptSearchChange"
                     filterable :filter-method="deptSearchValuesFilter" clearable placeholder="请输入科室名称">
            <el-option
              v-for="item in deptSearchOptions"
              :key="item.code"
              :label="item.name"
              :value="item.name">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
            </el-option>
          </el-select>
        </el-col>

      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <el-row class="row-bg show-shadow">


        <el-col :span="12"
                style="padding-bottom: 10px;border-right: solid 1px #eee">
          <el-divider content-position="left">筛选查询</el-divider>
          <el-col :span="2" class="el-col-display">科室分类</el-col>
          <el-select style="float: left;margin-left: 8px" @change="handleDeptTypeOrDeptCategoryChange"
                     v-model="listParam.deptCategoryID" filterable :filter-method="deptCategorySearchValuesFilter"
                     clearable placeholder="请选择">
            <el-option
              v-for="item in deptCategoryOptions"
              :key="item.code"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
            </el-option>
          </el-select>
          <el-col :span="2" class="el-col-display">科室类型</el-col>
          <el-select style="float: left;margin-left: 8px" @change="handleDeptTypeOrDeptCategoryChange"
                     v-model="listParam.typeID" filterable :filter-method="deptTypeSearchValuesFilter" clearable
                     placeholder="请选择">
            <el-option
              v-for="item in deptTypeOptions"
              :key="item.code"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
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
              action="http://localhost:8081/hospital/department/upload"
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
            <el-divider content-position="left">科室列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="departmentList"
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
            <el-table-column label="科室编码" prop="deptCode">
            </el-table-column>
            <el-table-column label="科室名称" prop="deptName">
            </el-table-column>
            <el-table-column label="科室分类" prop="deptCategory">
            </el-table-column>
            <el-table-column label="科室类别" prop="deptType">
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


          <el-dialog title="修改科室信息" :visible.sync="editDialogFormVisible" width="30%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="科室名称" prop="deptName">
                <el-input v-model="editForm.deptName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="科室编号" prop="deptCode">
                <el-input v-model="editForm.deptCode" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="科室分类" prop="deptCategoryID">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.deptCategoryID" filterable :filter-method="deptCategorySearchValuesFilter"
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in deptCategoryOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="科室类别" prop="deptTypeID" width="30%">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.deptTypeID" filterable :filter-method="deptTypeSearchValuesFilter"
                           clearable
                           placeholder="请选择">
                  <el-option
                    v-for="item in deptTypeOptions"
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

          <el-dialog title="添加科室信息" :visible.sync="addDialogFormVisible" width="30%">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="科室名称" prop="deptName">
                <el-input v-model="addForm.deptName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="科室编号" prop="deptCode">
                <el-input v-model="addForm.deptCode" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="科室分类" prop="deptCategoryID">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.deptCategoryID" filterable :filter-method="deptCategorySearchValuesFilter"
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in deptCategoryOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="科室类别" prop="deptTypeID">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.deptTypeID" filterable :filter-method="deptTypeSearchValuesFilter"
                           clearable
                           placeholder="请选择">
                  <el-option
                    v-for="item in deptTypeOptions"
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
    departmentGetList,
    deptGetALLNamesAndCodes,
    deptCategoryGetALLNamesAndCodes,
    deptTypeGetALLNamesAndCodes,
    deptGetByNameOrCode,
    deptDeleteByID,
    deptDeleteByChooses,
    deptInfoUpdate,
    deptInfoAdd,
    downloadXLS,
    createXLS,
    uploadXLS,
    createXLSTemplate
  } from '../../api/departmentApi';
  import Qs from 'qs';

  export default {
    name: "Department",
    data() {
      return {
        //判断是否需要copy
        checkIfCopy: 0,
        //所有科室的名称或编号
        deptSearchValues: [],
        //存放入选择列表的科室名称或编号
        deptSearchOptions: [],
        //所有科室分类的名称或编号
        deptCategoryValues: [],
        //存放入选择列表的科室分类名称或编号
        deptCategoryOptions: [],
        //所有科室类型的名称或编号
        deptTypeValues: [],
        //存放入选择列表的科室分类名称或编号
        deptTypeOptions: [],


        listParam: {
          //选择的科室分类id
          deptCategoryID: '',
          //选择的科室类别id
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
        //存放科室列表
        departmentList: [],
        //copy部分
        copy: {
          departmentListCopy: [],
          pageNumCopy: '',
          totalCopy: '',
          //复制的科室分类id
          deptCategoryIDCopy: undefined,
          //复制的科室类别id
          typeIDCopy: undefined

        },

        //科室搜索的名称或编号
        searchValue: '',
        //选中的科室id
        checkList: [],
        //添加科室的对话框是否显示
        addDialogFormVisible: false,
        //修改科室的对话框是否显示
        editDialogFormVisible: false,
        //添加科室的内容
        addForm: {
          deptName: '',
          deptCode: '',
          deptTypeID: '',
          deptCategoryID: ''
        },
        //修改科室的内容
        editForm: {
          id: '',
          deptName: '',
          deptCode: '',
          deptTypeID: '',
          deptCategoryID: ''

        },
        //修改科室规则
        rules: {
          deptName: [
            {required: true, message: '请输入科室名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},

          ],
          deptCode: [
            {required: true, message: '请输入科室编号', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          deptCategoryID: [
            {required: true, message: '请选择科室分类', trigger: 'change'}
          ],
          deptTypeID: [
            {required: true, message: '请选择科室类别', trigger: 'change'}
          ]


        },
        //是否显示上传列表
        whetherShowList: false,
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
      //获得所有科室列表
      getDepartmentList() {
        let params = {
          deptCategoryID: this.listParam.deptCategoryID,
          typeID: this.listParam.typeID,
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize
        };
        departmentGetList(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.searchValue = '';
              this.departmentList = data.data.list;
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
        this.copy.departmentListCopy = this.departmentList;
        this.copy.pageNumCopy = this.pageParams.pageNum;
        this.copy.totalCopy = this.pageParams.total;
        this.copy.deptCategoryIDCopy = this.listParam.deptCategoryID;
        this.copy.typeIDCopy = this.listParam.typeID;
      },
      //返回复制信息
      returnCopyInfo() {
        this.departmentList = this.copy.departmentListCopy;
        this.pageParams.pageNum = this.copy.pageNumCopy;
        this.pageParams.total = this.copy.totalCopy;
        this.listParam.deptCategoryID = this.copy.deptCategoryIDCopy;
        this.listParam.typeID = this.copy.typeIDCopy;
      },
      //获得所有科室名称和编号
      getAllDeptNamesAndCodes() {
        deptGetALLNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.deptSearchValues = data.data;
              this.deptSearchOptions = data.data;
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
      //获得所有科室类型名称和编号
      getAllDeptTypeNamesAndCodes() {
        deptTypeGetALLNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.deptTypeValues = data.data;
              this.deptTypeOptions = data.data;
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
      //获得所有科室分类名称和编号
      getAllDeptCategoryNamesAndCodes() {
        deptCategoryGetALLNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.deptCategoryValues = data.data;
              this.deptCategoryOptions = data.data;
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

      deptSearchValuesFilter(val) {
        this.deptSearchOptions = val ? this.deptSearchValues.filter(this.createFilter(val)) : this.deptSearchValues;
      },
      deptTypeSearchValuesFilter(val) {
        this.deptTypeOptions = val ? this.deptTypeValues.filter(this.createFilter(val)) : this.deptTypeValues;
      },
      deptCategorySearchValuesFilter(val) {
        this.deptCategoryOptions = val ? this.deptCategoryValues.filter(this.createFilter(val)) : this.deptCategoryValues;
      },

      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
//根据名称或编号查找科室信息
      deptSearchChange(val) {
        if (val === '') {
          this.returnCopyInfo();
          this.checkIfCopy = 0;
        } else {

          if (this.checkIfCopy === 0) {
            this.copyInfo();
            this.checkIfCopy = this.checkIfCopy + 1;
          }
          this.listParam.typeID = '';
          this.listParam.deptCategoryID = '';
          this.pageParams.pageNum = 1;
          let params = {
            nameOrCode: this.searchValue,
            pageNum: this.pageParams.pageNum,
            pageSize: this.pageParams.pageSize
          };
          deptGetByNameOrCode(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.departmentList = data.data.list;
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
      //科室的选择发生改变
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },
      //处理页大小改变
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.getDepartmentList();
      },
      //处理当前页改变
      handleCurrentChange(val) {
        this.pageParams.pageNum = val;
        this.getDepartmentList();
      },
      //处理选择的渴死类型或科室分类发生改变
      handleDeptTypeOrDeptCategoryChange() {
        this.pageParams.pageNum = 1;
        this.getDepartmentList();
      },
      //删除对象
      handleDelete(val) {
        let id = {'id': val};
        this.$confirm('确认删除？')
          .then(_ => {
            deptDeleteByID(id).then((res) => {
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
          this.getDepartmentList();
        } else {
          this.deptSearchChange(this.searchValue);
        }
        this.getAllDeptNamesAndCodes();
        this.getAllDeptTypeNamesAndCodes();
        this.getAllDeptCategoryNamesAndCodes();
      },
      //删除所选科室
      deleteByChoose() {
        this.$confirm('确认批量删除？')
          .then(_ => {
            let params = {"id": this.checkList};
            deptDeleteByChooses(params).then((res) => {
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
        this.editForm.deptName = propRow.deptName;
        this.editForm.deptCode = propRow.deptCode;
        this.editForm.deptCategoryID = propRow.deptCategoryID;
        this.editForm.deptTypeID = propRow.deptTypeID;
        this.editDialogFormVisible = true;
      },
      //点击添加科室
      handleAdd() {
        this.addDialogFormVisible = true;
        this.addForm.deptName = '';
        this.addForm.deptCode = '';
        this.addForm.deptCategoryID = '';
        this.addForm.deptTypeID = '';
      },
      //提交（编辑表单）或（添加表单）
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editForm')
              this.$confirm('确认修改科室信息？')
                .then(_ => {
                  deptInfoUpdate(this.editForm).then((res) => {
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
              this.$confirm('确认添加科室信息？')
                .then(_ => {
                  deptInfoAdd(this.addForm).then((res) => {
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
      //导出科室信息的XLS文件
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
          this.$confirm('科室信息重复是否覆盖？').then(_ => {
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

      handleAvatarSuccess(file) {
        this.whetherShowList = false;
        console.log(file);
      }


    },
    mounted() {
      this.getDepartmentList();
      this.getAllDeptNamesAndCodes();
      this.getAllDeptTypeNamesAndCodes();
      this.getAllDeptCategoryNamesAndCodes();
    }
  }
</script>


