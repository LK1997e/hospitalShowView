<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#a2a8d3;">


      <el-row class="row-bg">
        <el-col :span="2" class="grid-content" style="margin-bottom: 4px">
          <span style="font-size:20px;color: white;">挂号级别管理</span>
        </el-col>
        <el-col class="grid-content" :span="6" :offset="16">
          <el-select v-model="searchValue" @change="regLevSearchChange"
                     filterable :filter-method="regLevSearchValuesFilter" clearable placeholder="请输入挂号级别名称">
            <el-option
              v-for="item in regLevSearchOptions"
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
        <el-col :span="24"
                style=" padding-bottom: 10px;border-left: solid 1px #eee">
          <el-divider content-position="left">管理操作</el-divider>
          <el-col :span="3" class="el-col-display">
            <el-link icon="el-icon-circle-plus" style="font-size: 16px;color: #11b95c"
                     @click="handleAdd">添加
            </el-link>
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
        </el-col>

      </el-row>

      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">挂号级别列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="registrationLevelList"
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
            <el-table-column label="挂号级别编码" prop="registeredCode">
            </el-table-column>
            <el-table-column label="挂号级别名称" prop="registeredName">
            </el-table-column>
            <el-table-column label="顺序号" prop="sequenceID">
            </el-table-column>
            <el-table-column label="是否默认">
              <template slot-scope="props">
                {{props.row.isDefault==1?'是':'否'}}
              </template>
            </el-table-column>
            <el-table-column label="挂号费" prop="registrationFee">
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
                <el-button icon="el-icon-edit" @click.native.prevent="handleEditDetails(props.row)" type="text"
                           size="small">
                  编辑详情
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作3">
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




          <el-dialog title="修改挂号级别详情信息" :visible.sync="editDetailsDialogFormVisible" width="40%">
            <el-form  :model="editDetailsForm" :rules="rules" label-width="120px"   ref="editDetailsForm"
                     class="demo-ruleForm">
              <el-form-item label="是否默认" prop="isDefault">
                <el-select style="float: left;width: 250px"
                           v-model="editDetailsForm.isDefault"
                           clearable placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="挂号级别费用" prop="regLevFee">
              <el-input-number v-model.number="editDetailsForm.regLevFee" :precision="2" style="width: 250px" :step="0.1" :min="0"></el-input-number>
            </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('editDetailsForm')">立即修改</el-button>
                <el-button @click="resetForm('editDetailsForm')">重置</el-button>
              </el-form-item>

            </el-form>

          </el-dialog>


          <el-dialog title="修改挂号级别信息" :visible.sync="editDialogFormVisible" width="30%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="挂号级别名称" prop="regLevName">
                <el-input v-model="editForm.regLevName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="挂号级别编号" prop="regLevCode">
                <el-input v-model="editForm.regLevCode" style="width: 280px"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">立即修改</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
              </el-form-item>
            </el-form>

          </el-dialog>


          <el-dialog title="添加挂号级别信息" :visible.sync="addDialogFormVisible" width="30%">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="挂号级别名称" prop="regLevName">
                <el-input v-model="addForm.regLevName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="挂号级别编号" prop="regLevCode">
                <el-input v-model="addForm.regLevCode" style="width: 280px"></el-input>
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
    registrationLevelGetList,
    regLevGetAllNamesAndCodes,
    regLevGetByNameOrCode,
    regLevDeleteByID,
    regLevDeleteByChooses,
    regLevInfoUpdate,
    regLevInfoAdd,
    downloadXLS,
    createXLS,
    regLevDetailsUpdate
  } from '../../api/registrationLevelApi';

  export default {
    data() {
      return {
        //判断是否需要copy
        checkIfCopy: 0,
        //所有挂号级别的名称或编号
        regLevSearchValues: [],
        //存放入选择列表的挂号级别名称或编号
        regLevSearchOptions: [],

        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },
        //存放挂号级别列表
        registrationLevelList: [],
        //copy部分
        copy: {
          registrationLevelListCopy: [],
          pageNumCopy: '',
          totalCopy: '',
        },

        //挂号级别搜索的名称或编号
        searchValue: '',
        //选中的挂号级别id
        checkList: [],
        //添加挂号级别的对话框是否显示
        addDialogFormVisible: false,
        //修改挂号级别的对话框是否显示
        editDialogFormVisible: false,
        //修改挂号级别详情的对话框是否显示
        editDetailsDialogFormVisible: false,
        //添加挂号级别的内容
        addForm: {
          regLevName: '',
          regLevCode: '',
        },
        //修改挂号级别的内容
        editForm: {
          id: '',
          regLevName: '',
          regLevCode: '',
        },
        //修改挂号级别类详情的内容
        editDetailsForm: {
          id: '',
          regLevFee:undefined,
          isDefault:''
        },
        //修改挂号级别规则
        rules: {
          regLevName: [
            {required: true, message: '请输入挂号级别名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},

          ],
          regLevCode: [
            {required: true, message: '请输入挂号级别编号', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          regLevFee: [
            {required: true, message: '请输入挂号级别费用', trigger: 'blur'},
            { type: 'number', message: '挂号级别费用必须为数字值'}
          ],
          isDefault:[
            {required: true, message: '请选择是否默认', trigger: 'change'},
          ]


        },

      }

    },
    methods: {
      //获得所有挂号级别列表
      getRegistrationLevelList() {
        let params = {
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize
        };
        registrationLevelGetList(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.searchValue = '';
              this.registrationLevelList = data.data.list;
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
        this.copy.registrationLevelListCopy = this.registrationLevelList;
        this.copy.pageNumCopy = this.pageParams.pageNum;
        this.copy.totalCopy = this.pageParams.total;
      },
      //返回复制信息
      returnCopyInfo() {
        this.registrationLevelList = this.copy.registrationLevelListCopy;
        this.pageParams.pageNum = this.copy.pageNumCopy;
        this.pageParams.total = this.copy.totalCopy;
      },
      //获得所有挂号级别名称和编号
      getAllRegLevNamesAndCodes() {
        regLevGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.regLevSearchValues = data.data;
              this.regLevSearchOptions = data.data;
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

      regLevSearchValuesFilter(val) {
        this.regLevSearchOptions = val ? this.regLevSearchValues.filter(this.createFilter(val)) : this.regLevSearchValues;
      },


      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
//根据名称或编号查找挂号级别信息
      regLevSearchChange(val) {
        this.getAllRegLevNamesAndCodes();
        if (val === '') {
          this.returnCopyInfo();
          this.checkIfCopy = 0;
        } else {

          if (this.checkIfCopy === 0) {
            this.copyInfo();
            this.checkIfCopy = this.checkIfCopy + 1;
          }
          this.pageParams.pageNum = 1;
          let params = {
            codeOrName: this.searchValue,
            pageNum: this.pageParams.pageNum,
            pageSize: this.pageParams.pageSize
          };
          regLevGetByNameOrCode(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.registrationLevelList = data.data.list;
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
      //挂号级别的选择发生改变
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },
      //处理页大小改变
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.getRegistrationLevelList();
      },
      //处理当前页改变
      handleCurrentChange(val) {
        this.pageParams.pageNum = val;
        this.getRegistrationLevelList();
      },

      //删除对象
      handleDelete(val) {
        let id = {'id': val};
        this.$confirm('确认删除？')
          .then(_ => {
            regLevDeleteByID(id).then((res) => {
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
          this.getRegistrationLevelList();
        } else {
          this.regLevSearchChange(this.searchValue);
        }
        this.getAllRegLevNamesAndCodes();
      },
      //删除所选挂号级别
      deleteByChoose() {
        this.$confirm('确认批量删除？')
          .then(_ => {
            let params = {"id": this.checkList};
            regLevDeleteByChooses(params).then((res) => {
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
        this.editForm.regLevName = propRow.registeredName;
        this.editForm.regLevCode = propRow.registeredCode;
        this.editDialogFormVisible = true;
      },
      //点击编辑详情
      handleEditDetails(propRow) {
        this.editDetailsForm.id = propRow.sequenceID;
        this.editDetailsForm.isDefault = propRow.isDefault;
        this.editDetailsForm.regLevFee = propRow.registrationFee;
        this.editDetailsDialogFormVisible = true;
      },
      //点击添加挂号级别
      handleAdd() {
        this.addForm.regLevName = '';
        this.addForm.regLevCode = '';
        this.addDialogFormVisible = true;
      },
      //提交（编辑表单）或（添加表单）
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editForm')
              this.$confirm('确认修改挂号级别信息？')
                .then(_ => {
                  let params = {
                    id: this.editForm.id,
                    constantCode: this.editForm.regLevCode,
                    constantName: this.editForm.regLevName
                  };
                  regLevInfoUpdate(params).then((res) => {
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
              this.$confirm('确认添加挂号级别信息？')
                .then(_ => {
                  let params = {
                    constantCode: this.addForm.regLevCode,
                    constantName: this.addForm.regLevName
                  };
                  regLevInfoAdd(params).then((res) => {
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

            else if (formName === 'editDetailsForm')
              this.$confirm('确认修改挂号级别详情信息？')
                .then(_ => {
                  let params = {
                    id: this.editDetailsForm.id,
                    isDefault: this.editDetailsForm.isDefault,
                    registrationFee: this.editDetailsForm.regLevFee
                  };
                  regLevDetailsUpdate(params).then((res) => {
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

          }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //导出挂号级别信息的XLS文件
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

    },
    mounted() {
      this.getRegistrationLevelList();
      this.getAllRegLevNamesAndCodes();
    }
  }
</script>


