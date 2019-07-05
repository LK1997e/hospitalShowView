<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#a2a8d3;">

      <el-row class="row-bg">
        <el-col :span="2" class="grid-content" style="margin-bottom: 4px">
          <span style="font-size:20px;color: white;">项目管理</span>
        </el-col>
        <el-col class="grid-content" :span="6" :offset="16">
          <el-select v-model="searchValue" @change="fMedItemSearchChange"
                     filterable :filter-method="fMedItemSearchValuesFilter" clearable placeholder="请输入项目名称">
            <el-option
              v-for="item in fMedItemSearchOptions"
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
          <el-col :span="2" class="el-col-display">科室名称</el-col>
          <el-select style="float: left;margin-left: 8px" @change="handleFMedItemTypeOrDeptChange"
                     v-model="listParam.deptID" filterable :filter-method="departmentSearchValuesFilter"
                     clearable placeholder="请选择">
            <el-option
              v-for="item in departmentOptions"
              :key="item.code"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
            </el-option>
          </el-select>
          <el-col :span="2" class="el-col-display">项目类型</el-col>
          <el-select style="float: left;margin-left: 8px" @change="handleFMedItemTypeOrDeptChange"
                     v-model="listParam.recordType" filterable :filter-method="fMedItemTypeSearchValuesFilter" clearable
                     placeholder="请选择">
            <el-option
              v-for="item in fMedItemTypeOptions"
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
              action="http://localhost:8081/hospital/fMedItem/upload"
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
            <el-link icon="el-icon-download" style="font-size: 16px;color: #a2a8d3"
                     @click="getDownloadXLSTemplate">下载模板
            </el-link>
          </el-col>


        </el-col>

      </el-row>
      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">项目列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="fMedItemList"
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
            <el-table-column label="项目编码" prop="mnemonicCode">
            </el-table-column>
            <el-table-column label="项目名称" prop="name">
            </el-table-column>
            <el-table-column label="项目规格" prop="format">
            </el-table-column>
            <el-table-column label="价格" prop="price">
            </el-table-column>
            <el-table-column label="所属费用科目" prop="expClassName">
            </el-table-column>
            <el-table-column label="执行科室" prop="deptName">
            </el-table-column>
            <el-table-column label="项目类型" prop="typeName">
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


          <el-dialog title="修改项目信息" :visible.sync="editDialogFormVisible" width="40%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="150px" class="demo-ruleForm">
              <el-form-item label="项目名称" prop="name">
                <el-input v-model="editForm.name" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="项目编号" prop="mnemonicCode">
                <el-input v-model="editForm.mnemonicCode" style="width: 280px"></el-input>
              </el-form-item>

              <el-form-item label="项目规格" prop="format">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.format" filterable
                           clearable placeholder="请选择">
                  <el-option label="日"></el-option>
                  <el-option label="小时"></el-option>
                  <el-option label="次"></el-option>
                  <el-option label="疗程"></el-option>
                  <el-option label="每个部位"></el-option>
                  <el-option label="半小时"></el-option>
                  <el-option label="单侧"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="价格" prop="price">
                <el-input-number v-model.number="editForm.price" :precision="2" style="width: 250px" :step="0.1"
                                 :min="0"></el-input-number>
              </el-form-item>

              <el-form-item label="所属费用科目" prop="expClassID">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.expClassID" filterable :filter-method="expClassSearchValuesFilter"
                           clearable placeholder="请选择" @change="this.getAllExpClassNamesAndCodes">
                  <el-option
                    v-for="item in expClassOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="执行科室" prop="deptID">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.deptID" filterable :filter-method="departmentSearchValuesFilter"
                           clearable placeholder="请选择" @change="this.getAllDeptNamesAndCodes">
                  <el-option
                    v-for="item in departmentOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="项目类别" prop="recordType" width="30%">
                <el-select style="float: left;width: 250px"
                           v-model="editForm.recordType" filterable :filter-method="fMedItemTypeSearchValuesFilter"
                           clearable
                           placeholder="请选择" @change="this.getAllFMedItemTypeNamesAndCodes">
                  <el-option
                    v-for="item in fMedItemTypeOptions"
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

          <!--添加项目信息-->
          <el-dialog title="添加项目信息" :visible.sync="addDialogFormVisible" width="40%">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px" class="demo-ruleForm">
              <el-form-item label="项目名称" prop="name">
                <el-input v-model="addForm.name" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="项目编号" prop="mnemonicCode">
                <el-input v-model="addForm.mnemonicCode" style="width: 280px"></el-input>
              </el-form-item>

              <el-form-item label="项目规格" prop="format">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.format" filterable=""
                           clearable placeholder="请选择">
                  <el-option label="日" key="日" value="日"></el-option>
                  <el-option label="小时" key="小时" value="小时"></el-option>
                  <el-option label="次" key="次" value="次"></el-option>
                  <el-option label="疗程" key="疗程" value="疗程"></el-option>
                  <el-option label="每个部位" key="每个部位" value="每个部位"></el-option>
                  <el-option label="半小时" key="半小时" value="半小时"></el-option>
                  <el-option label="单侧" key="单侧" value="单侧"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="价格" prop="price">
                <el-input-number v-model.number="addForm.price" :precision="2" style="width: 250px" :step="0.1"
                                 :min="0"></el-input-number>
              </el-form-item>

              <el-form-item label="所属费用科目" prop="expClassID">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.expClassID" filterable :filter-method="expClassSearchValuesFilter"
                           clearable placeholder="请选择" @change="this.getAllExpClassNamesAndCodes">
                  <el-option
                    v-for="item in expClassOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="执行科室" prop="deptID">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.deptID" filterable :filter-method="departmentSearchValuesFilter"
                           clearable placeholder="请选择" @change="this.getAllDeptNamesAndCodes">
                  <el-option
                    v-for="item in departmentOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="项目类别" prop="recordType" width="30%">
                <el-select style="float: left;width: 250px"
                           v-model="addForm.recordType" filterable :filter-method="fMedItemTypeSearchValuesFilter"
                           clearable
                           placeholder="请选择" @change="this.getAllFMedItemTypeNamesAndCodes">
                  <el-option
                    v-for="item in fMedItemTypeOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('addForm')">立即添加</el-button>
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
    fMedItemGetList,
    fMedItemGetAllNamesAndCodes,
    fMedItemTypeGetAllNamesAndCodes,
    fMedItemGetByNameOrCode,
    fMedItemDeleteByID,
    fMedItemDeleteByChooses,
    fMedItemInfoUpdate,
    fMedItemInfoAdd,
    downloadXLS,
    createXLS,
    uploadXLS,
    createXLSTemplate,
    deptGetAllNamesAndCodes,
    expClassGetAllNamesAndCodes
  } from '../../api/fMedItemApi';

  export default {
    name: "FMedItem",
    data() {
      return {
        //判断是否需要copy
        checkIfCopy: 0,
        //所有项目的名称或编号
        fMedItemSearchValues: [],
        //存放入选择列表的项目名称或编号
        fMedItemSearchOptions: [],
        //所有科室名称的名称或编号
        departmentValues: [],
        //存放入选择列表的科室名称名称或编号
        departmentOptions: [],
        //所有项目类型的名称或编号
        fMedItemTypeValues: [],
        //存放入选择列表的科室名称名称或编号
        fMedItemTypeOptions: [],
        expClassOptions: [],
        expClassValues: [],

        listParam: {
          //选择的科室名称id
          deptID: '',
          //选择的项目类别id
          recordType: ''

        },
        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },
        //存放项目列表
        fMedItemList: [],
        //copy部分
        copy: {
          fMedItemListCopy: [],
          pageNumCopy: '',
          totalCopy: '',
          //复制的科室名称id
          deptIDCopy: undefined,
          //复制的项目类别id
          recordTypeCopy: undefined

        },

        //项目搜索的名称或编号
        searchValue: '',
        //选中的项目id
        checkList: [],
        //添加项目的对话框是否显示
        addDialogFormVisible: false,
        //修改项目的对话框是否显示
        editDialogFormVisible: false,
        //添加项目的内容
        addForm: {
          name:'',
          mnemonicCode: '',
          format:'',
          price:undefined,
          expClassID:'',
          deptID:'',
          recordType:''
        },
        //修改项目的内容
        editForm: {
          id: '',
          name:'',
          mnemonicCode: '',
          format:'',
          price:undefined,
          expClassID:'',
          deptID:'',
          recordType:''

        },
        //修改项目规则
        rules: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},

          ],
          mnemonicCode: [
            {required: true, message: '请输入项目编号', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          format: [
            {required: true, message: '请选择项目规格', trigger: 'change'}
          ],
          price: [
            {required: true, message: '请输入项目价格', trigger: 'blur'},
            { type: 'number', message: '项目价格必须为数字值'}
          ],
          expClassID: [
            {required: true, message: '请选择费用科目类别', trigger: 'change'}
          ],
          deptID: [
            {required: true, message: '请选择科室名称', trigger: 'change'}
          ],
          recordType: [
            {required: true, message: '请选择项目类别', trigger: 'change'}
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
      //获得所有项目列表

      getFMedItemList() {

        let params = {
          deptID: this.listParam.deptID,
          recordType: this.listParam.recordType,
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize
        };
        fMedItemGetList(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.searchValue = '';
              this.fMedItemList = data.data.list;
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
        this.copy.fMedItemListCopy = this.fMedItemList;
        this.copy.pageNumCopy = this.pageParams.pageNum;
        this.copy.totalCopy = this.pageParams.total;
        this.copy.deptIDCopy = this.listParam.deptID;
        this.copy.recordTypeCopy = this.listParam.recordType;
      },
      //返回复制信息
      returnCopyInfo() {
        this.fMedItemList = this.copy.fMedItemListCopy;
        this.pageParams.pageNum = this.copy.pageNumCopy;
        this.pageParams.total = this.copy.totalCopy;
        this.listParam.deptID = this.copy.deptIDCopy;
        this.listParam.recordType = this.copy.recordTypeCopy;
      },
      //获得所有项目名称和编号
      getAllFMedItemNamesAndCodes() {
        fMedItemGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.fMedItemSearchValues = data.data;
              this.fMedItemSearchOptions = data.data;
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
      //获得所有费用科目的名称和编号
      getAllExpClassNamesAndCodes() {
        expClassGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.expClassValues= data.data;
              this.expClassOptions = data.data;
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
      //获得所有项目类型名称和编号
      getAllFMedItemTypeNamesAndCodes() {
        fMedItemTypeGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.fMedItemTypeValues = data.data;
              this.fMedItemTypeOptions = data.data;
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
      //获得所有科室名称名称和编号
      getAllDeptNamesAndCodes() {
        deptGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.departmentValues = data.data;
              this.departmentOptions = data.data;
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
        this.fMedItemSearchOptions = val ? this.fMedItemSearchValues.filter(this.createFilter(val)) : this.fMedItemSearchValues;
      },
      fMedItemTypeSearchValuesFilter(val) {
        this.fMedItemTypeOptions = val ? this.fMedItemTypeValues.filter(this.createFilter(val)) : this.fMedItemTypeValues;
      },
      departmentSearchValuesFilter(val) {
        this.departmentOptions = val ? this.departmentValues.filter(this.createFilter(val)) : this.departmentValues;
      },
      expClassSearchValuesFilter(val) {
        this.expClassOptions = val ? this.expClassValues.filter(this.createFilter(val)) : this.expClassValues;
      },

      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
//根据名称或编号查找项目信息
      fMedItemSearchChange(val) {
        this.getAllFMedItemNamesAndCodes();
        if (val === '') {
          this.returnCopyInfo();
          this.checkIfCopy = 0;
        } else {

          if (this.checkIfCopy === 0) {
            this.copyInfo();
            this.checkIfCopy = this.checkIfCopy + 1;
          }
          this.listParam.recordType = '';
          this.listParam.deptID = '';
          this.pageParams.pageNum = 1;
          let params = {
            nameOrCode: this.searchValue,
            pageNum: this.pageParams.pageNum,
            pageSize: this.pageParams.pageSize
          };
          fMedItemGetByNameOrCode(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.fMedItemList = data.data.list;
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
      //项目的选择发生改变
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },
      //处理页大小改变
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.getFMedItemList();
      },
      //处理当前页改变
      handleCurrentChange(val) {
        this.pageParams.pageNum = val;
        this.getFMedItemList();
      },
      //处理选择的项目类型或科室名称发生改变
      handleFMedItemTypeOrDeptChange() {
        this.getAllFMedItemTypeNamesAndCodes();
        this.getAllDeptNamesAndCodes();
        this.pageParams.pageNum = 1;
        this.getFMedItemList();
      },
      //删除对象
      handleDelete(val) {
        let id = {'id': val};
        this.$confirm('确认删除？')
          .then(_ => {
            fMedItemDeleteByID(id).then((res) => {
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
          this.getFMedItemList();
        } else {
          this.fMedItemSearchChange(this.searchValue);
        }
        this.getAllFMedItemNamesAndCodes();
        this.getAllFMedItemTypeNamesAndCodes();
        this.getAllDeptNamesAndCodes();
      },
      //删除所选项目
      deleteByChoose() {
        this.$confirm('确认批量删除？')
          .then(_ => {
            let params = {"id": this.checkList};
            fMedItemDeleteByChooses(params).then((res) => {
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
        this.editForm.name=propRow.name;
        this.editForm.mnemonicCode = propRow.mnemonicCode;
        this.editForm.format=propRow.format;
        this.editForm.price=propRow.price;
        this.editForm.expClassID=propRow.expClassID;
        this.editForm.deptID = propRow.deptID;
        this.editForm.recordType = propRow.recordType;
        this.editDialogFormVisible = true;
      },
      //点击添加项目
      handleAdd() {
        this.editForm.id ='';
        this.editForm.name='';
        this.editForm.mnemonicCode = '';
        this.editForm.format='';
        this.editForm.expClassID='';
        this.editForm.price='';
        this.editForm.deptID = '';
        this.editForm.recordType = '';
        this.addDialogFormVisible = true;
      },
      //提交（编辑表单）或（添加表单）
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editForm')
              this.$confirm('确认修改项目信息？')
                .then(_ => {
                  fMedItemInfoUpdate(this.editForm).then((res) => {
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
              this.$confirm('确认添加项目信息？')
                .then(_ => {
                  fMedItemInfoAdd(this.addForm).then((res) => {
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
      //导出项目信息的XLS文件
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
          this.$confirm('项目信息重复是否覆盖？').then(_ => {
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
      this.getFMedItemList();
      this.getAllFMedItemNamesAndCodes();
      this.getAllFMedItemTypeNamesAndCodes();
      this.getAllDeptNamesAndCodes();
      this.getAllExpClassNamesAndCodes();
    }
  }
</script>


