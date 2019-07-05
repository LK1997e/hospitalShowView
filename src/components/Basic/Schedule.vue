<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#a2a8d3;">

      <el-row class="row-bg">
        <el-col :span="2" class="grid-content" style="margin-bottom: 4px">
          <span style="font-size:20px;color: white;">排班信息管理</span>
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
                     @click="generate">生成信息
            </el-link>
          </el-col>
          <el-col :span="3" class="el-col-display">
            <el-link icon="el-icon-circle-plus" style="font-size: 16px;color: #11b95c"
                     @click="handleAdd">添加
            </el-link>
          </el-col>
          <el-col :span="3" class="el-col-display">

            <el-upload
              name="file"
              action="http://localhost:8081/hospital/schedule/upload"
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

      <el-row class="row-bg show-shadow">


        <el-col :span="24"
                style="padding-bottom: 10px;border-right: solid 1px #eee">
          <el-divider content-position="left">筛选查询</el-divider>
          <el-col :span="1" class="el-col-display">开始日期</el-col>
          <el-col :span="4">
            <el-date-picker
              style="float: left;margin-left: 8px" @change="handleDateOrDoctorChange"
              v-model="listParam.startDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              >
            </el-date-picker>
          </el-col>
          <el-col :span="1" class="el-col-display">结束日期</el-col>
          <el-col :span="4">
            <el-date-picker
              style="float: left;margin-left: 8px" @change="handleDateOrDoctorChange"
              v-model="listParam.endDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="1" class="el-col-display">排班科室</el-col>
          <el-col :span="4">
            <el-select style="float: left;margin-left: 8px" @change="getDoctorsByDeptID('0')"
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
          </el-col>
          <el-col :span="1" class="el-col-display">排班医生</el-col>
          <el-col :span="4">
            <el-select style="float: left;margin-left: 8px" @change="handleDateOrDoctorChange"
                       v-model="listParam.doctorID" filterable
                       clearable placeholder="请选择">
              <el-option
                v-for="item in doctorOptions"
                :key="item.code"
                :label="item.name"
                :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
              </el-option>
            </el-select>
          </el-col>

        </el-col>
      </el-row>

      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">排班信息列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="scheduleList"
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
            <el-table-column label="排班日期" prop="onDutyDate">

            </el-table-column>
            <el-table-column label="排班科室" prop="deptName">
            </el-table-column>
            <el-table-column label="排班医生" prop="userName">
            </el-table-column>
            <el-table-column label="号别" prop="levelName">
            </el-table-column>
            <el-table-column label="午别" prop="onDutyTimeName">
            </el-table-column>
            <el-table-column label="排班限额" prop="limitNumber">
            </el-table-column>
            <el-table-column label="剩余号数" prop="remainingAmount">
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


          <el-dialog title="修改排班信息信息" :visible.sync="editDialogFormVisible" width="40%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="150px" class="demo-ruleForm">
              <el-form-item label="排班日期" prop="onDutyDate">
                <el-date-picker
                  style="float: left;width: 250px"
                  v-model="editForm.onDutyDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions0">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="排班科室" prop="deptID">
                <el-select style="float: left;width: 250px" @change="getDoctorsByDeptID('1')"
                           v-model="editForm.deptID" filterable :filter-method="deptSearchValuesFilter" clearable
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
              </el-form-item>

              <el-form-item label="排班医生" prop="onDutyDoctorID">
                <el-select style="float: left;width: 250px" @change="refreshByDoctorChange('1')"
                           v-model="editForm.onDutyDoctorID" filterable :filter-method="editDoctorSearchValuesFilter"
                           clearable placeholder="请选择">
                  <el-option
                    v-for="item in editDoctorOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="号别" prop="levelNameID">
                <el-select v-model="editForm.levelNameID"
                           filterable :filter-method="regLevSearchValuesFilter" clearable
                           @change="getAllRegLevNamesAndCodes">
                  <el-option
                    v-for="item in regLevSearchOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="午别" prop="onDutyDoctorID">
                <el-select v-model="editForm.onDutyTimeID" @change="getAllOnDutyTimeAndCodes"
                           filterable :filter-method="onDutyTimeSearchValuesFilter" clearable>
                  <el-option
                    v-for="item in onDutyTimeSearchOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="排班限额" prop="limitNumber">
                <el-input-number v-model.number="editForm.limitNumber" style="width: 250px" :step="0.1"
                                 :min="0"></el-input-number>
              </el-form-item>


              <el-form-item>
                <el-button type="primary" @click="submitForm('editForm')">立即修改</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
              </el-form-item>
            </el-form>

          </el-dialog>

          <!--添加排班信息信息-->
          <el-dialog title="添加排班信息信息" :visible.sync="addDialogFormVisible" width="40%">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px" class="demo-ruleForm">
              <el-form-item label="排班日期" prop="onDutyDate" :formatter="dateFormat">
                <el-date-picker
                  style="float: left;width: 250px"
                  v-model="addForm.onDutyDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions0">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="排班科室" prop="deptID">
                <el-select style="float: left;width: 250px" @change="getDoctorsByDeptID('2')"
                           v-model="addForm.deptID" filterable :filter-method="deptSearchValuesFilter" clearable
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
              </el-form-item>

              <el-form-item label="排班医生" prop="onDutyDoctorID">
                <el-select style="float: left;width: 250px" @change="refreshByDoctorChange('2')"
                           v-model="addForm.onDutyDoctorID" filterable :filter-method="addDoctorSearchValuesFilter"
                           clearable placeholder="请选择" clearable>
                  <el-option
                    v-for="item in addDoctorOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="号别" prop="levelNameID">
                <el-select v-model="addForm.levelNameID" @change="getAllRegLevNamesAndCodes"
                           filterable :filter-method="regLevSearchValuesFilter" clearable>
                  <el-option
                    v-for="item in regLevSearchOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="午别" prop="onDutyDoctorID">
                <el-select v-model="addForm.onDutyTimeID" @change="getAllOnDutyTimeAndCodes"
                           filterable :filter-method="onDutyTimeSearchValuesFilter" clearable>
                  <el-option
                    v-for="item in onDutyTimeSearchOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="排班限额" prop="limitNumber">
                <el-input-number v-model.number="addForm.limitNumber" style="width: 250px" :step="0.1"
                                 :min="0"></el-input-number>
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
    scheduleGetList,
    scheduleDeleteByID,
    scheduleDeleteByChooses,
    scheduleInfoUpdate,
    scheduleInfoAdd,
    downloadXLS,
    createXLS,
    uploadXLS,
    createXLSTemplate,
    generateInfo
  } from '../../api/scheduleApi';
  import {deptGetAllNamesAndCodes} from '../../api/departmentApi';
  import {regLevGetAllNamesAndCodes} from '../../api/registrationLevelApi';
  import {
    doctorGetAllNamesAndCodes,
    doctorGetByDeptID,
    onDutyTimeGetAllNamesAndCodes
  } from '../../api/scheduleRuleApi'
  import feCha from 'fecha'


  export default {
    name: "Schedule",
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        //所有医生的名称或编号
        doctorValues: [],
        //存放入选择列表的医生名称或编号
        doctorOptions: [],
        //所有科室的名称或编号
        deptValues: [],
        //存放入选择列表的医生名称或编号
        deptOptions: [],
        //所有挂号级别的名称或编号
        regLevSearchValues: [],
        //存放入选择列表的挂号级别名称或编号
        regLevSearchOptions: [],
        //全部医生的名称和编号
        doctorAllOptions: [],
        //存放入选择列表的午别名称或编号
        onDutyTimeSearchOptions: [],
        //所有午别的名称或编号
        onDutyTimeSearchValues: [],

        editDoctorOptions: [],
        addDoctorOptions: [],
        editDoctorValues: [],
        addDoctorValues: [],

        listParam: {
          startDate: '',
          endDate: '',
          //选择的医生id
          doctorID: '',
          //选择的排班信息类别id
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
        //存放排班信息列表
        scheduleList: [],
        //选中的排班信息id
        checkList: [],
        //添加排班信息的对话框是否显示
        addDialogFormVisible: false,
        //修改排班信息的对话框是否显示
        editDialogFormVisible: false,
        //添加排班信息的内容
        addForm: {
          onDutyDate: '',
          deptID: '',
          onDutyDoctorID: '',
          levelNameID: '',
          onDutyTimeID: '',
          limitNumber: ''
        },
        //修改排班信息的内容
        editForm: {
          id: '',
          onDutyDate: '',
          deptID: '',
          onDutyDoctorID: '',
          levelNameID: '',
          onDutyTimeID: '',
          limitNumber: ''
        },
        //修改排班信息规则
        rules: {
          onDutyDate: [
            {required: true, message: '请选择排班日期', trigger: 'change'}
          ],
          deptID: [
            {required: true, message: '请选择排班科室', trigger: 'change'}
          ],
          onDutyDoctorID: [
            {required: true, message: '请选择排班医生', trigger: 'change'}
          ],
          levelNameID: [
            {required: true, message: '请选择号别', trigger: 'change'}
          ],
          onDutyTimeID: [
            {required: true, message: '请选择午别', trigger: 'change'}
          ],
          limitNumber: [
            {required: true, message: '请输入排班限额', trigger: 'blur'},
            {type: 'number', message: '排班限额必须为数字值'}
          ]
        },

        //导入条件选定
        uploadXLSCondition: {
          //遇到错误继续执行
          errorHappenContinue: false,
          //遇到重复的进行覆盖
          repeatCoverage: false
        },


      }

    },
    methods: {
      // 日期显示转换
      dateFormat(row, column, cellValue) {
        return cellValue ? feCha.format(new Date(cellValue), 'YYYY-MM-DD') : '';
      },
      //获得所有排班信息列表

      getScheduleList() {

        let params = {
          doctorID: this.listParam.doctorID,
          deptID: this.listParam.deptID,
          startDate: this.listParam.startDate,
          endDate:this.listParam.endDate,
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize
        };
        scheduleGetList(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.searchValue = '';
              this.scheduleList = data.data.list;
              this.pageParams.pages = data.data.pages;
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
        });
      },


      //获得所有科室名称和编号
      getAllDeptNamesAndCodes() {
        deptGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.deptValues = data.data;
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
      getAllDoctorNamesAndCodes(state) {
        doctorGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              if (state === '0') {
                this.doctorValues = data.data;
                this.doctorOptions = data.data;
              } else if (state === '1') {
                this.editDoctorValues = data.data;
                this.editDoctorOptions = data.data;
              } else if (state === '2') {
                this.addDoctorOptions = data.data;
                this.addDoctorValues = data.data;
              }
              this.doctorAllOptions = data.data;
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
      //获得所有午别
      getAllOnDutyTimeAndCodes() {
        onDutyTimeGetAllNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.onDutyTimeSearchValues = data.data;
              this.onDutyTimeSearchOptions = data.data;
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

      //根据排班规则自动生成排班信息
      generate() {
        generateInfo().then((res) => {
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

        });
      },




      deptSearchValuesFilter(val) {
        this.deptOptions = val ? this.deptValues.filter(this.createFilter(val)) : this.deptValues;
      },
      doctorSearchValuesFilter(val) {
        this.doctorOptions = val ? this.doctorValues.filter(this.createFilter(val)) : this.doctorValues;
      },
      onDutyTimeSearchValuesFilter(val) {
        this.onDutyTimeSearchOptions = val ? this.onDutyTimeSearchValues.filter(this.createFilter(val)) : this.onDutyTimeSearchValues;
      },
      regLevSearchValuesFilter(val) {
        this.regLevSearchOptions = val ? this.regLevSearchValues.filter(this.createFilter(val)) : this.regLevSearchValues;
      },
      editDoctorSearchValuesFilter(val) {
        this.editDoctorOptions = val ? this.editDoctorValues.filter(this.createFilter(val)) : this.editDoctorValues;
      },
      addDoctorSearchValuesFilter(val) {
        this.addDoctorOptions = val ? this.addDoctorValues.filter(this.createFilter(val)) : this.addDoctorValues;
      },

      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },

      //排班信息的选择发生改变
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },
      //处理页大小改变
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.getScheduleList();
      },
      //处理当前页改变
      handleCurrentChange(val) {
        this.pageParams.pageNum = val;
        this.getScheduleList();
      },
      refreshByDoctorChange(state) {
        if (state === '1') {
          if (this.editForm.deptID === '')
            this.getAllDoctorNamesAndCodes('1');
          else
            this.getDoctorsByDeptID('4');
        } else if (state === '2') {
          if (this.addForm.deptID === '')
            this.getAllDoctorNamesAndCodes('2');
          else
            this.getDoctorsByDeptID('5');
        }

      },
      //处理选择的科室或医生发生改变
      handleDateOrDoctorChange() {
        if (this.listParam.deptID === '')
          this.getAllDoctorNamesAndCodes('0');
        else
          this.getDoctorsByDeptID('3');
        this.pageParams.pageNum = 1;
        this.getScheduleList();
      },
      //删除对象
      handleDelete(val) {
        let id = {'id': val};
        this.$confirm('确认删除？')
          .then(_ => {
            scheduleDeleteByID(id).then((res) => {
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
        this.getScheduleList();
      },
      //删除所选排班信息
      deleteByChoose() {
        this.$confirm('确认批量删除？')
          .then(_ => {
            let params = {"id": this.checkList};
            scheduleDeleteByChooses(params).then((res) => {
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
      getDoctorsByDeptID(state) {
        this.getAllDeptNamesAndCodes();
        if (state === '0')
          this.listParam.doctorID = '';
        else if (state === '1')
          this.editForm.onDutyDoctorID = '';
        else if (state === '2')
          this.addForm.onDutyDoctorID = '';
        if (this.listParam.deptID === '' && state === '0') {
          this.getAllDoctorNamesAndCodes(state);
          this.freshInfo();
        }
        else {
          let params = {};
          if (state === '0' || state === '3')
            params = {"id": this.listParam.deptID};
          else if (state === '1' || state === '4')
            params = {"id": this.editForm.deptID};
          else if (state === '2' || state === '5')
            params = {"id": this.addForm.deptID};
          doctorGetByDeptID(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  if (state === '0' || state === '3') {
                    this.doctorOptions = data.data;
                    this.doctorValues = data.data;
                    if (state === '0')
                      this.listParam.doctorID = '';
                    this.freshInfo();
                  } else if (state === '1' || state === '4') {
                    this.editDoctorOptions = data.data;
                    this.editDoctorValues = data.data;
                    if (state === '1')
                      this.editForm.onDutyDoctorID = '';
                  } else if (state === '2' || state === '5') {
                    this.addDoctorOptions = data.data;
                    this.addDoctorValues = data.data;
                    if (state === '2')
                      this.addForm.onDutyDoctorID = '';
                  }

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

      },
      //点击编辑
      handleEdit(propRow) {
        this.editForm.id = propRow.id;
        this.editForm.onDutyDate = propRow.onDutyDate;
        this.editForm.deptID = propRow.deptID;
        this.editForm.onDutyDoctorID = propRow.onDutyDoctorID;
        this.editForm.levelNameID = propRow.levelNameID;
        this.editForm.onDutyTimeID = propRow.onDutyTimeID;
        this.editForm.limitNumber = propRow.limitNumber;
        this.editDialogFormVisible = true;
      },
      //点击添加排班信息
      handleAdd() {
        this.addForm.onDutyDate = '';
        this.addForm.deptID = '';
        this.addForm.onDutyDoctorID = '';
        this.addForm.levelNameID = '';
        this.addForm.onDutyTimeID = '';
        this.addForm.limitNumber = '';
        this.addDialogFormVisible = true;
      },
      //提交（编辑表单）或（添加表单）
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'editForm')
              this.$confirm('确认修改排班信息信息？')
                .then(_ => {
                  scheduleInfoUpdate(this.editForm).then((res) => {
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
              this.$confirm('确认添加排班信息信息？')
                .then(_ => {
                  scheduleInfoAdd(this.addForm).then((res) => {
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
      //导出排班信息信息的XLS文件
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
          this.$confirm('排班信息信息重复是否覆盖？').then(_ => {
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
      this.getScheduleList();
      this.getAllDeptNamesAndCodes();
      this.getAllDoctorNamesAndCodes('0');
      this.getAllDoctorNamesAndCodes('1');
      this.getAllDoctorNamesAndCodes('2');
      this.getAllRegLevNamesAndCodes();
      this.getAllOnDutyTimeAndCodes();

    }
  }
</script>


