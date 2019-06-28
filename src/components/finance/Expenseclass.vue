<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#41cde5;">


      <el-row class="row-bg">
        <el-col :span="2" class="grid-content" style="margin-bottom: 4px">
          <span style="font-size:20px;color: white;">费用类型管理</span>
        </el-col>

      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <el-row class="row-bg show-shadow">


        <el-col :span="12"
                style="padding-bottom: 10px;border-right: solid 1px #eee">
          <el-divider content-position="left">筛选查询</el-divider>
          <el-col :span="1.5" class="el-col-display" style="margin-left: 40px;">费用类型编码</el-col>
          <el-col :span="4">
            <el-input
              ref="Code"
              v-model="expenseclass.Code"
              name="Code"
              placeholder="费用类型编码">
            </el-input>
          </el-col>
          <el-col :span="1.5" class="el-col-display">费用类型名称</el-col>
          <el-col :span="4">
            <el-input
              ref="Name"
              v-model="expenseclass.Name"
              name="Name"
              placeholder="费用类型名称"
            >
            </el-input>
          </el-col>
          <el-col :span="1"
                  style="margin-left: 40px;">
            <el-button type="primary" @click="getExpenseclassList">查找费用类型</el-button>
          </el-col>
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
              action="http://localhost:8081/hospital/expenseclass/upload"
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
                     @click.native.prevent="deleteByChoose">批量删除
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
            <el-divider content-position="left">费用类型列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="expenseclassList"
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
            <el-table-column label="费用类型编码" prop="code">
            </el-table-column>
            <el-table-column label="费用类型名称" prop="name">
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


          <el-dialog title="修改费用类型信息" :visible.sync="editDialogFormVisible" width="30%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="费用类型名称" prop="name">
                <el-input v-model="editForm.name" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="费用类型编号" prop="code">
                <el-input v-model="editForm.code" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">立即修改</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
              </el-form-item>
            </el-form>

          </el-dialog>

          <el-dialog title="添加费用类型信息" :visible.sync="addDialogFormVisible" width="30%">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="费用类型名称" prop="name">
                <el-input v-model="addForm.name" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="费用类型编号" prop="code">
                <el-input v-model="addForm.code" style="width: 280px"></el-input>
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
    margin-left: 20px;
    margin-top: 6px;
    margin-right: 20px;
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
    expenseclassAdd,
    expenseclassFind,
    expenseclassUpdate,
    expenseclassDeleteByChooses,
    expenseclassDeleteByID,
    downloadXLS,
    createXLS,
    uploadXLS,
    createXLSTemplate
  } from '../../api/expenseclassApi';
  import Qs from 'qs';

  export default {
    inject:['reload'],
    name: "Expenseclass",
    data() {
      return {
        expenseclass:{
          Code:'',
          Name:'',
        },
        //判断是否需要copy
        checkIfCopy: 0,

        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },
        //存放费用类型列表
        expenseclassList: [],
        //选中的费用类型id
        checkList: [],
        //添加费用类型的对话框是否显示
        addDialogFormVisible: false,
        //修改费用类型的对话框是否显示
        editDialogFormVisible: false,
        //添加费用类型的内容
        addForm: {
          name: '',
          code: '',
        },
        //修改费用类型的内容
        editForm: {
          id: '',
          name: '',
          code: '',

        },
        //修改费用类型规则
        rules: {
          name: [
            {required: true, message: '请输入费用类型名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},

          ],
          code: [
            {required: true, message: '请输入费用类型编号', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
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
      //获得所有费用类型列表
      getExpenseclassList() {
        expenseclassFind(this.expenseclass.Code,this.expenseclass.Name,this.pageParams.pageNum,this.pageParams.pageSize).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.expenseclassList = data.data.list;
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

      //费用类型的选择发生改变
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },
      //处理页大小改变
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.getExpenseclassList();
      },
      //处理当前页改变
      handleCurrentChange(val) {
        this.pageParams.pageNum = val;
        this.getExpenseclassList();
      },
      //删除对象
      handleDelete(val) {
        let id = {'id': val};
        this.$confirm('确认删除？')
          .then(_ => {
            expenseclassDeleteByID(id).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });
                    this.reload();
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
      //删除所选费用类型
      deleteByChoose() {
        this.$confirm('确认批量删除？')
          .then(_ => {
            let params = {"id": this.checkList};
            expenseclassDeleteByChooses(params).then((res) => {
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
      },
      //点击编辑
      handleEdit(propRow) {
        this.editForm.id = propRow.id;
        this.editForm.name = propRow.name;
        this.editForm.code = propRow.code;
        this.editDialogFormVisible = true;
      },
      //点击添加费用类型
      handleAdd() {
        this.addDialogFormVisible = true;
        this.addForm.name = '';
        this.addForm.code = '';
      },
      //提交（编辑表单）或（添加表单）
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editForm')
              this.$confirm('确认修改费用类型信息？')
                .then(_ => {
                  expenseclassUpdate(this.editForm).then((res) => {
                      if (res.status === 200) {
                        let data = res.data;
                        if (data.status === 'OK') {
                          this.$message({
                            message: data.msg,
                            type: 'success'
                          });
                          this.reload();
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
              this.$confirm('确认添加费用类型信息？')
                .then(_ => {
                  expenseclassAdd(this.addForm).then((res) => {
                      if (res.status === 200) {
                        let data = res.data;
                        if (data.status === 'OK') {
                          this.$message({
                            message: data.msg,
                            type: 'success'
                          });
                          this.reload();
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
      //导出费用类型信息的XLS文件
      getDownloadXLS() {
        createXLS().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              let params = {fileName: data.data, pos: 'static/financeExcle'};
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
              let params = {fileName: data.data, pos: 'static/financeExcle'};
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
          this.$confirm('费用类型信息重复是否覆盖？').then(_ => {
            this.uploadXLSCondition.repeatCoverage = true;
          }).catch(_ => {
            this.uploadXLSCondition.repeatCoverage = false;
          }).finally(_ => {
            uploadXLS(content, this.uploadXLSCondition).then(res => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.$message({
                    message: data.msg,
                    type: 'success'
                  });
                  this.reload();
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
      this.getExpenseclassList();
    }
  }
</script>
