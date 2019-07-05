<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#a2a8d3;">


      <el-row class="row-bg">
        <el-col :span="2" class="grid-content" style="margin-bottom: 4px">
          <span style="font-size:20px;color: white;">结算类别管理</span>
        </el-col>
        <el-col class="grid-content" :span="6" :offset="16">
          <el-select v-model="searchValue" @change="setCatSearchChange"
                     filterable :filter-method="setCatSearchValuesFilter" clearable placeholder="请输入结算类别名称">
            <el-option
              v-for="item in setCatSearchOptions"
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
            <el-divider content-position="left">结算类别列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="settlementCategoryList"
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
                  <el-form-item label="区间1" v-if="props.row.thresnold1>=0&&props.row.thresnold2>0 ">
                    <span>{{ props.row.thresnold1+"元  - "+props.row.thresnold2+"元"}}</span>
                  </el-form-item>
                  <el-form-item label="报销比例1" v-if="props.row.thresnold1>=0&&props.row.thresnold2>0 ">
                    <span>{{props.row.proportion1+"%"}}</span>
                  </el-form-item>

                  <el-form-item label="区间2" v-if="props.row.thresnold3>props.row.thresnold2&&props.row.thresnold1>=0&&props.row.thresnold2>0">
                    <span>{{ props.row.thresnold2+"元  - "+props.row.thresnold3+"元"}}</span>
                  </el-form-item>
                  <el-form-item label="报销比例2" v-if="props.row.thresnold3>props.row.thresnold2&&props.row.thresnold1>=0&&props.row.thresnold2>0">
                    <span>{{ "报销比例："+props.row.proportion2+"%"}}</span>
                  </el-form-item>

                  <el-form-item label="区间3" v-if="props.row.thresnold3>props.row.thresnold2&&props.row.thresnold1>=0&&props.row.thresnold2>0">
                    <span>{{props.row.thresnold3+"元以上"}}</span>
                  </el-form-item>
                  <el-form-item label="报销比例3" v-if="props.row.thresnold3>props.row.thresnold2&&props.row.thresnold1>=0&&props.row.thresnold2>0">
                    <span>{{"报销比例："+props.row.proportion3+"%"}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column type="selection" prop="id">

            </el-table-column>
            <el-table-column label="编号" prop="id">
            </el-table-column>
            <el-table-column label="结算类别编码" prop="settleCategoryCode">
            </el-table-column>
            <el-table-column label="结算类别名称" prop="settleCategoryName">
            </el-table-column>
            <el-table-column label="顺序号" prop="sequenceID">
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




          <el-dialog title="修改结算类别详情信息" :visible.sync="editDetailsDialogFormVisible" width="40%">
            <el-form :inline="true" :model="editDetailsForm" :rules="rules"   ref="editDetailsForm"
                     class="demo-ruleForm">
              <el-row>
                <el-col :span="7">
                  <el-form-item label="区间1" prop="thresnold1">
                    <el-input-number size="small" v-model="editDetailsForm.thresnold1"
                                     :precision="2" :step="0.1" :min="0"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-form-item label="至">
                  </el-form-item>
                </el-col>
                <el-col :span="7" :offset="1">
                  <el-form-item  prop="thresnold2">
                    <el-input-number size="small" v-model="editDetailsForm.thresnold2"
                                     :precision="2" :step="0.1" :min="editDetailsForm.thresnold1"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="报销百分比1"  prop="proportion1">
                    <el-input-number size="small" v-model="editDetailsForm.proportion1"
                                     :precision="2" :step="0.1" :min="0" :max="100">
                    </el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="7">
                  <el-form-item label="区间2"  prop="thresnold2">
                    <el-input-number size="small" :precision="2" v-model="editDetailsForm.thresnold2"
                                     :step="0.1" :min="editDetailsForm.thresnold1"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-form-item label="至">
                  </el-form-item>
                </el-col>
                <el-col :span="7" :offset="1">
                  <el-form-item  prop="thresnold3">
                    <el-input-number size="small" v-model="editDetailsForm.thresnold3"
                                     :precision="2" :step="0.1" :min="editDetailsForm.thresnold2"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="报销百分比2" prop="proportion2">
                    <el-input-number size="small" v-model="editDetailsForm.proportion2"
                                     :precision="2" :step="0.1" :min="0" :max="100">
                    </el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="7">
                  <el-form-item label="区间3"  prop="thresnold3">
                    <el-input-number size="small" v-model="editDetailsForm.thresnold3"
                                     :precision="2" :step="0.1" :min="editDetailsForm.thresnold2"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="1">
                  <el-form-item label="报销百分比3" prop="proportion3">
                    <el-input-number size="small" v-model="editDetailsForm.proportion3"
                                     :precision="2" :step="0.1" :min="0" :max="100">
                    </el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>

                <div class="block" align="right">
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('editDetailsForm')">立即修改</el-button>
                    <el-button @click="resetForm('editDetailsForm')">重置</el-button>
                  </el-form-item>
                </div>


              </el-row>
            </el-form>

          </el-dialog>


          <el-dialog title="修改结算类别信息" :visible.sync="editDialogFormVisible" width="30%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="结算类别名称" prop="setCatName">
                <el-input v-model="editForm.setCatName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="结算类别编号" prop="setCatCode">
                <el-input v-model="editForm.setCatCode" style="width: 280px"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">立即修改</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
              </el-form-item>
            </el-form>

          </el-dialog>


          <el-dialog title="添加结算类别信息" :visible.sync="addDialogFormVisible" width="30%">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="结算类别名称" prop="setCatName">
                <el-input v-model="addForm.setCatName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="结算类别编号" prop="setCatCode">
                <el-input v-model="addForm.setCatCode" style="width: 280px"></el-input>
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
    settlementCategoryGetList,
    setCatGetAllNamesAndCodes,
    setCatGetByNameOrCode,
    setCatDeleteByID,
    setCatDeleteByChooses,
    setCatInfoUpdate,
    setCatInfoAdd,
    downloadXLS,
    createXLS,
    setCatDetailsUpdate
  } from '../../api/settlementCategoryApi';

  export default {
    data() {
      return {
        //判断是否需要copy
        checkIfCopy: 0,
        //所有结算类别的名称或编号
        setCatSearchValues: [],
        //存放入选择列表的结算类别名称或编号
        setCatSearchOptions: [],

        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },
        //存放结算类别列表
        settlementCategoryList: [],
        //copy部分
        copy: {
          settlementCategoryListCopy: [],
          pageNumCopy: '',
          totalCopy: '',

        },

        //结算类别搜索的名称或编号
        searchValue: '',
        //选中的结算类别id
        checkList: [],
        //添加结算类别的对话框是否显示
        addDialogFormVisible: false,
        //修改结算类别的对话框是否显示
        editDialogFormVisible: false,
        //修改结算类别详情的对话框是否显示
        editDetailsDialogFormVisible: false,
        //添加结算类别的内容
        addForm: {
          setCatName: '',
          setCatCode: '',
        },
        //修改结算类别的内容
        editForm: {
          id: '',
          setCatName: '',
          setCatCode: '',
        },
        //修改结算类详情的内容
        editDetailsForm: {
          id: '',
          thresnold1: undefined,
          thresnold2: undefined,
          thresnold3: undefined,
          thresnold4: undefined,
          proportion1: undefined,
          proportion2: undefined,
          proportion3: undefined,
        },
        //修改结算类别规则
        rules: {
          setCatName: [
            {required: true, message: '请输入结算类别名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},

          ],
          setCatCode: [
            {required: true, message: '请输入结算类别编号', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          thresnold1: [],
          thresnold2: [],
          thresnold3: [],
          thresnold4: [],
          proportion1: [],
          proportion2: [],
          proportion3: [],


        },

      }

    },
    methods: {
      //获得所有结算类别列表
      getSettleCategoryList() {
        let params = {
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize
        };
        settlementCategoryGetList(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.searchValue = '';
              this.settlementCategoryList = data.data.list;
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
        this.copy.settlementCategoryListCopy = this.settlementCategoryList;
        this.copy.pageNumCopy = this.pageParams.pageNum;
        this.copy.totalCopy = this.pageParams.total;
      },
      //返回复制信息
      returnCopyInfo() {
        this.settlementCategoryList = this.copy.settlementCategoryListCopy;
        this.pageParams.pageNum = this.copy.pageNumCopy;
        this.pageParams.total = this.copy.totalCopy;
      },
      //获得所有结算类别名称和编号
      getAllSetCatNamesAndCodes() {
        setCatGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.setCatSearchValues = data.data;
              this.setCatSearchOptions = data.data;
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

      setCatSearchValuesFilter(val) {
        this.setCatSearchOptions = val ? this.setCatSearchValues.filter(this.createFilter(val)) : this.setCatSearchValues;
      },


      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
//根据名称或编号查找结算类别信息
      setCatSearchChange(val) {
        this.getAllSetCatNamesAndCodes();
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
          setCatGetByNameOrCode(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.settlementCategoryList = data.data.list;
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
      //结算类别的选择发生改变
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },
      //处理页大小改变
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.getSettleCategoryList();
      },
      //处理当前页改变
      handleCurrentChange(val) {
        this.pageParams.pageNum = val;
        this.getSettleCategoryList();
      },

      //删除对象
      handleDelete(val) {
        let id = {'id': val};
        this.$confirm('确认删除？')
          .then(_ => {
            setCatDeleteByID(id).then((res) => {
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
          this.getSettleCategoryList();
        } else {
          this.setCatSearchChange(this.searchValue);
        }
        this.getAllSetCatNamesAndCodes();
      },
      //删除所选结算类别
      deleteByChoose() {
        this.$confirm('确认批量删除？')
          .then(_ => {
            let params = {"id": this.checkList};
            setCatDeleteByChooses(params).then((res) => {
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
        this.editForm.setCatName = propRow.settleCategoryName;
        this.editForm.setCatCode = propRow.settleCategoryCode;
        this.editDialogFormVisible = true;
      },
      //点击编辑详情
      handleEditDetails(propRow) {
        this.editDetailsForm.id = propRow.sequenceID;
        this.editDetailsForm.thresnold1 = propRow.thresnold1;
        this.editDetailsForm.thresnold2 = propRow.thresnold2;
        this.editDetailsForm.thresnold3 = propRow.thresnold3;
        this.editDetailsForm.proportion1=propRow.proportion1;
        this.editDetailsForm.proportion2=propRow.proportion2;
        this.editDetailsForm.proportion3=propRow.proportion3;
        this.editDetailsDialogFormVisible = true;
      },
      //点击添加结算类别
      handleAdd() {
        this.addForm.setCatName = '';
        this.addForm.setCatCode = '';
        this.addDialogFormVisible = true;
      },
      //提交（编辑表单）或（添加表单）
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          //提交结算类别列表详情信息
         if (formName === 'editDetailsForm')
            this.$confirm('确认修改结算类别详情信息？')
              .then(_ => {
                setCatDetailsUpdate(this.editDetailsForm).then((res) => {
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

          if (valid) {
            if (formName === 'editForm')
              this.$confirm('确认修改结算类别信息？')
                .then(_ => {
                  let params = {
                    id: this.editForm.id,
                    constantCode: this.editForm.setCatCode,
                    constantName: this.editForm.setCatName
                  };
                  setCatInfoUpdate(params).then((res) => {
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
              this.$confirm('确认添加结算类别信息？')
                .then(_ => {
                  let params = {
                    constantCode: this.addForm.setCatCode,
                    constantName: this.addForm.setCatName
                  };
                  setCatInfoAdd(params).then((res) => {
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
      //导出结算类别信息的XLS文件
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
      this.getSettleCategoryList();
      this.getAllSetCatNamesAndCodes();
    }
  }
</script>


