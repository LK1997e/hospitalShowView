<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#41cde5;">


      <el-row class="row-bg">
        <el-col :span="2" class="grid-content" style="margin-bottom: 4px">
          <span style="font-size:20px;color: white;">用户管理</span>
        </el-col>
        <el-col class="grid-content" :span="6" :offset="16">
          <el-select v-model="searchValue" @change="userSearchChange"
                     filterable :filter-method="userSearchValuesFilter" clearable placeholder="请输入用户名称">
            <el-option
              v-for="item in userSearchOptions"
              :key="item.id"
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
          <el-col :span="2" class="el-col-display">科室名称</el-col>
          <el-select style="float: left;margin-left: 8px" @change="handleDeptOrUserTypeChange"
                     v-model="listParam.departmentID" filterable :filter-method="deptSearchValuesFilter"
                     clearable placeholder="请选择">
            <el-option
              v-for="item in deptSearchOptions"
              :key="item.code"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
            </el-option>
          </el-select>
          <el-col :span="2" class="el-col-display">用户类型</el-col>
          <el-select style="float: left;margin-left: 8px" @change="handleDeptOrUserTypeChange"
                     v-model="listParam.typeID" filterable :filter-method="userTypeSearchValuesFilter" clearable
                     placeholder="请选择">
            <el-option
              v-for="item in userTypeOptions"
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
              action="http://localhost:8081/hospital/user/upload"
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
            <el-divider content-position="left">用户列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="userList"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="联系方式">
                    <span>{{ props.row.contact }}</span>
                  </el-form-item>
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
            <el-table-column label="登录名" prop="userName">
            </el-table-column>
            <el-table-column label="密码" prop="passwd">
            </el-table-column>
            <el-table-column label="真实名" prop="realName">
            </el-table-column>
            <el-table-column label="所属科室" prop="deptName">
            </el-table-column>
            <el-table-column label="用户类别" prop="type">
            </el-table-column>
            <el-table-column label="医生职称" prop="rank">
            </el-table-column>
            <el-table-column label="是否值班">
              <template slot-scope="props">
                {{props.row.isSchedule==1?'是':(props.row.isSchedule==0?'否':'')}}
              </template>
            </el-table-column>
            <el-table-column label="操作1">
              <template slot-scope="props">
                <el-button icon="el-icon-edit" @click.native.prevent="handleEdit(props.row)" type="text"
                           size="small" >
                  编辑
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作2">
              <template slot-scope="props">
                <el-button icon="el-icon-delete" @click.native.prevent="handleDelete(props.row.id)" type="text"
                           size="small" style="color: #e64242" :disabled="props.row.typeID===112">
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


          <el-dialog title="修改用户信息" :visible.sync="editDialogFormVisible" width="40%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="登录名" prop="userName">
                <el-input v-model="editForm.userName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="真实名" prop="realName">
                <el-input v-model="editForm.realName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passwd">
                <el-input v-model="editForm.passwd" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="所属科室" prop="departmentID">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.departmentID" filterable :filter-method="deptSearchValuesFilter"
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in deptSearchOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="用户类别" prop="typeID" width="30%">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.typeID" filterable :filter-method="userTypeSearchValuesFilter"
                           clearable
                           placeholder="请选择">
                  <el-option
                    v-for="item in userTypeOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="医生职称" prop="rankID"
                            v-if="editForm.typeID===108||editForm.typeID===109">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.rankID" filterable :filter-method="rankSearchValuesFilter"
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in rankSearchOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="是否排班" prop="isSchedule"
                            v-if="editForm.typeID===108||editForm.typeID===109">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.isSchedule" filterable
                           clearable placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">立即修改</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
              </el-form-item>
            </el-form>

          </el-dialog>

          <el-dialog title="添加用户信息" :visible.sync="addDialogFormVisible" width="40%">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="登录名" prop="userName">
                <el-input v-model="addForm.userName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="真实名" prop="realName">
                <el-input v-model="addForm.realName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passwd">
                <el-input v-model="addForm.passwd" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="所属科室" prop="departmentID">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.departmentID" filterable :filter-method="deptSearchValuesFilter"
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in deptSearchOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="用户类别" prop="typeID" width="30%">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.typeID" filterable :filter-method="userTypeSearchValuesFilter"
                           clearable
                           placeholder="请选择">
                  <el-option
                    v-for="item in userTypeOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="医生职称" prop="rankID"
                            v-if="addForm.typeID===108||addForm.typeID===109">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.rankID" filterable :filter-method="rankSearchValuesFilter"
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in rankSearchOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="是否排班" prop="isSchedule"
                            v-if="this.addForm.typeID===108||this.addForm.typeID===109">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.isSchedule" filterable
                           clearable placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
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
    userGetList,
    userGetAllNamesAndIDs,
    userTypeGetAllNamesAndCodes,
    userGetByName,
    userDeleteByID,
    userDeleteByChooses,
    userInfoUpdate,
    userInfoAdd,
    downloadXLS,
    createXLS,
    uploadXLS,
    createXLSTemplate,
    userRankGetAllNamesAndCodes
  } from '../../api/userApi';

  import {
    deptGetAllNamesAndCodes
  } from '../../api/departmentApi';


  export default {
    name: "User",
    data() {
      return {
        //判断是否需要copy
        checkIfCopy: 0,
        //所有用户的名称或编号
        userSearchValues: [],
        //存放入选择列表的用户名称或编号
        userSearchOptions: [],
        //所有所属科室的名称或编号
        deptSearchValues:[],
        //存放入选择列表的科室的名称或编号
        deptSearchOptions: [],
        //所有用户类型的名称或编号
        userTypeValues: [],
        //存放入选择列表的所属科室名称或编号
        userTypeOptions: [],
        //存放选择列表的医生职称的名称或编号
        rankSearchOptions: [],
        //所有医生职称的名称和编号
        rankSearchValues:[],


        listParam: {
          //选择的科室id
          departmentID: '',
          //选择的用户类别id
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
        //存放用户列表
        userList: [],
        //copy部分
        copy: {
          userListCopy: [],
          pageNumCopy: '',
          totalCopy: '',
          //复制的所属科室id
          departmentIDCopy: undefined,
          //复制的用户类别id
          typeIDCopy: undefined

        },

        //用户搜索的名称或编号
        searchValue: '',
        //选中的用户id
        checkList: [],
        //添加用户的对话框是否显示
        addDialogFormVisible: false,
        //修改用户的对话框是否显示
        editDialogFormVisible: false,
        //添加用户的内容
        addForm: {
          userName: '',
          realName: '',
          passwd: '',
          departmentID: '',
          typeID:'',
          rankID:'',
          isSchedule:''
        },
        //修改用户的内容
        editForm: {
          userName: '',
          realName: '',
          passwd: '',
          departmentID: '',
          typeID:'',
          rankID:'',
          isSchedule:''

        },
        //修改用户规则
        rules: {
          userName: [
            {required: true, message: '请输入登录名', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},

          ],
          realName: [
            {required: true, message: '请输入真实名', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
          ],
          passwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          departmentID: [
            {required: true, message: '请选择所属科室', trigger: 'change'}
          ],
          typeID: [
            {required: true, message: '请选择用户类别', trigger: 'change'}
          ],
          rankID:[
            {required: true, message: '请选择医生职称', trigger: 'change'}
          ],
          isSchedule:[
            {required: true, message: '请选择是否排班', trigger: 'change'}
          ],


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
      //获得所有用户列表
      getUserList() {
        let params = {
          deptID: this.listParam.departmentID,
          typeID: this.listParam.typeID,
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize
        };

        userGetList(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.searchValue = '';
              this.userList = data.data.list;
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
        this.copy.userListCopy = this.userList;
        this.copy.pageNumCopy = this.pageParams.pageNum;
        this.copy.totalCopy = this.pageParams.total;
        this.copy.departmentIDCopy = this.listParam.departmentID;
        this.copy.typeIDCopy = this.listParam.typeID;
      },
      //返回复制信息
      returnCopyInfo() {
        this.userList = this.copy.userListCopy;
        this.pageParams.pageNum = this.copy.pageNumCopy;
        this.pageParams.total = this.copy.totalCopy;
        this.listParam.departmentID = this.copy.departmentIDCopy;
        this.listParam.typeID = this.copy.typeIDCopy;
      },
      //获得所有用户名称和编号
      getAllUserNamesAndCodes() {
        userGetAllNamesAndIDs().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.userSearchValues = data.data;
              this.userSearchOptions = data.data;
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
      //获得所有用户类型名称和编号
      getAllUserTypeNamesAndCodes() {
        userTypeGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.userTypeValues = data.data;
              this.userTypeOptions = data.data;
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
      //获得所有所属科室名称和编号
      getAllDeptNamesAndCodes() {
        deptGetAllNamesAndCodes().then((res) => {
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
          } else {
            alert('error');

          }

        });
      },
      //获得所有医生职称的名称和编号
      getAllUserRankNamesAndCodes() {
        userRankGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.rankSearchValues = data.data;
              this.rankSearchOptions = data.data;
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

      userSearchValuesFilter(val) {
        this.userSearchOptions = val ? this.userSearchValues.filter(this.createFilter(val)) : this.userSearchValues;
      },
      userTypeSearchValuesFilter(val) {
        this.userTypeOptions = val ? this.userTypeValues.filter(this.createFilter(val)) : this.userTypeValues;
      },
      deptSearchValuesFilter(val) {
        this.deptSearchOptions = val ? this.deptSearchValues.filter(this.createFilter(val)) : this.deptSearchValues;
      },
      rankSearchValuesFilter(val){
        this.rankSearchOptions=val?this.rankSearchValues.filter(this.createFilter(val)):this.rankSearchValues;
      },

      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
//根据名称或编号查找用户信息

      userSearchChange(val) {
        if (val === '') {
          this.returnCopyInfo();
          this.checkIfCopy = 0;
        } else {
          if (this.checkIfCopy === 0) {
            this.copyInfo();
            this.checkIfCopy = this.checkIfCopy + 1;
          }
          this.listParam.typeID = '';
          this.listParam.departmentID = '';
          this.pageParams.pageNum = 1;
          let params = {
            name: this.searchValue,
            pageNum: this.pageParams.pageNum,
            pageSize: this.pageParams.pageSize
          };
          userGetByName(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.userList = data.data.list;
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

      //用户的选择发生改变
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },

      //处理页大小改变
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.getUserList();
      },

      //处理当前页改变
      handleCurrentChange(val) {
        this.pageParams.pageNum = val;
        this.getUserList();
      },
      //处理选择的渴死类型或所属科室发生改变
      handleDeptOrUserTypeChange() {
        this.pageParams.pageNum = 1;
        this.getUserList();
      },
      //删除对象
      handleDelete(val) {
        let id = {'id': val};
        this.$confirm('确认删除？')
          .then(_ => {
            userDeleteByID(id).then((res) => {
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
          this.getUserList();
        } else {
          this.userSearchChange(this.searchValue);
        }
        this.getAllUserNamesAndCodes();
        this.getAllUserTypeNamesAndCodes();
        this.getAllDeptNamesAndCodes();
      },
      //删除所选用户
      deleteByChoose() {
        this.$confirm('确认批量删除？')
          .then(_ => {
            let params = {"id": this.checkList};
            userDeleteByChooses(params).then((res) => {
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
        this.editForm.userName = propRow.userName;
        this.editForm.realName=propRow.realName;
        this.editForm.passwd=propRow.passwd;
        this.editForm.departmentID = propRow.departmentID;
        this.editForm.typeID = propRow.typeID;
        this.editForm.rankID=propRow.rankID;
        this.editForm.isSchedule=propRow.isSchedule;
        this.editDialogFormVisible = true;
      },
      //点击添加用户
      handleAdd() {
        this.addForm.userName = '';
        this.addForm.realName = '';
        this.addForm.passwd='';
        this.addForm.departmentID = '';
        this.addForm.typeID = '';
        this.addForm.rankID='';
        this.addForm.isSchedule='';
        this.addDialogFormVisible = true;
      },
      //提交（编辑表单）或（添加表单）
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editForm')
              this.$confirm('确认修改用户信息？')
                .then(_ => {
                  userInfoUpdate(this.editForm).then((res) => {
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
              this.$confirm('确认添加用户信息？')
                .then(_ => {
                  userInfoAdd(this.addForm).then((res) => {
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
      //导出用户信息的XLS文件
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
          this.$confirm('用户信息重复是否覆盖？').then(_ => {
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
      this.getUserList();
      this.getAllUserNamesAndCodes();
      this.getAllUserTypeNamesAndCodes();
      this.getAllDeptNamesAndCodes();
      this.getAllUserRankNamesAndCodes();
    }
  }
</script>


