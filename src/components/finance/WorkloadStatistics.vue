<template>
  <el-container>
    <el-header style="background:#41cde5;">
      <el-row class="row-bg">
        <el-col span="2" class="grid-content">
          <span style="font-size:20px;color: white;">工作量统计</span>
        </el-col>

      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <el-row class="row-bg show-shadow">


        <el-col :span="24"
                style="padding-bottom: 10px;border-right: solid 1px #eee">
          <el-divider content-position="left">筛选查询</el-divider>
          <el-row>
            <el-col :span="1.2" class="el-col-display" style="margin-left: 100px">医生姓名</el-col>
            <el-col :span="3.8">


              <el-select  style="float: left;margin-left: 8px" @change="deptSearchChange"
                          v-model="list.realName" filterable :filter-method="userSearchValuesFilter"
                          clearable placeholder="请选择">
                <el-option
                  v-for="item in userSearchOptions"
                  :key="item.id"
                  :label="item.code"
                  :value="item.code">
                  <span style="float: left">{{ item.code }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1.2" class="el-col-display">科室名称</el-col>

            <el-col :span="3.8">
              <el-select  style="float: left;margin-left: 8px" @change="deptSearchChange"
                          v-model="list.deptName" filterable :filter-method="deptSearchValuesFilter" clearable
                          placeholder="请选择">
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
            <el-col :span="1.2" class="el-col-display">开始日期</el-col>
            <el-col :span="3.8">
              <el-date-picker
                v-model="list.dateStart"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                @change="deptSearchChange">
              </el-date-picker>
            </el-col>
            <el-col :span="1.2" class="el-col-display">结束日期</el-col>
            <el-col :span="3.8">
              <el-date-picker
                v-model="list.dateEnd"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                @change="deptSearchChange">
              </el-date-picker>
            </el-col>
          </el-row>

        </el-col>



      </el-row>
      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">工作量统计列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="workloadStatisticsList"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="费用时间">
                    <span>{{ props.row.feeAppearDate }}</span>
                  </el-form-item>
                  <el-form-item label="缴费状态">
                    <span>{{ props.row.paystatusName }}</span>
                  </el-form-item>
                  <el-form-item label="日结状态">
                    <span>{{ props.row.datestatusName }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column label="费用编号" prop="feeID">
            </el-table-column>
            <el-table-column label="医生姓名" prop="realName">
            </el-table-column>
            <el-table-column label="科室名称" prop="deptName">
            </el-table-column>
            <el-table-column label="患者姓名" prop="patientName">
            </el-table-column>
            <el-table-column label="费用类型" prop="feeTypeName">
            </el-table-column>
            <el-table-column label="费用" prop="fee">
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
        </el-container>
      </el-row>
    </el-main>
  </el-container>
</template>



<style>
  .el-col-display {
    float: left;
    margin-left: 30px;
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
    deptGetAllNamesAndCodes,
  } from '../../api/departmentApi';
  import {
    workloadStatisticsGetList,
    userGetALLNamesAndIDs,
  } from '../../api/workloadStatisticsApi';

  import Qs from 'qs';

  export default {
    name: "WorkloadStatistics",
    data() {
      return {

        //存放工作量列表
        workloadStatisticsList: [],
        //存放筛选的医生姓名
        realNameOptions: [],
        //存放筛选的科室名称
        deptNameOptions:[],
        //所有科室的名称或编号
        deptSearchValues: [],
        //存放入选择列表的科室名称或编号
        deptSearchOptions: [],
        userSearchValues: [],
        userSearchOptions: [],

        list:{
          realName:'',
          deptName:'',
          dateStart:'',
          dateEnd:'',
        },
        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },
        //copy部分
        copy: {
          workloadStatisticsListCopy: [],
          pageNumCopy: '',
          totalCopy: '',
          realNameCopy: '',
          deptNameCopy: '',
          dateStartCopy:'',
          dateEndCopy:'',

        },

      }

    },
    methods: {
      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
      deptSearchValuesFilter(val) {

        this.deptSearchOptions = val ? this.deptSearchValues.filter(this.createFilter(val)) : this.deptSearchValues;
      },
      userSearchValuesFilter(val) {
        this.userSearchOptions = val ? this.userSearchValues.filter(this.createFilter(val)) : this.userSearchValues;
      },
      //复制信息
      copyInfo() {
        this.copy.workloadStatisticsListCopy = this.workloadStatisticsList;
        this.copy.pageNumCopy = this.pageParams.pageNum;
        this.copy.totalCopy = this.pageParams.total;
        this.copy.realNameCopy = this.list.realName;
        this.copy.deptNameCopy = this.list.deptName;
        this.copy.dateStartCopy = this.list.dateStart;
        this.copy.dateEndCopy = this.list.dateEnd;
      },
      //返回复制信息
      returnCopyInfo() {
        this.workloadStatisticsList = this.copy.workloadStatisticsListCopy;
        this.pageParams.pageNum = this.copy.pageNumCopy;
        this.pageParams.total = this.copy.totalCopy;
        // this.list.realName = this.copy.realNameCopy;
        // this.list.deptName = this.copy.deptNameCopy;
        // this.list.dateStart = this.copy.dateStartCopy;
        // this.list.dateEnd = this.copy.dateEndCopy;
      },
      //获得工作量列表
      getworkloadStatisticsList(){
        workloadStatisticsGetList(this.list.realName,this.list.deptName,this.list.dateStart,this.list.dateEnd,this.pageParams.pageNum,this.pageParams.pageSize).then((res) =>{
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.workloadStatisticsList = data.data.list;
              this.pageParams.pages = data.data.pages;
              this.pageParams.total = data.data.total;
            } else {
              alert(data.msg);
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
              this.deptSearchValues = data.data;
              this.deptSearchOptions = data.data;
            } else {
              alert(data.msg);
            }
          }

        });
      },
      //获得所有医生姓名和编号
      getAllUserNamesAndCodes() {
        userGetALLNamesAndIDs().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.userSearchValues = data.data;
              this.userSearchOptions = data.data;
            } else {
              alert(data.msg);
            }
          }

        });
      },
      deptSearchChange(val) {
        this.getAllDeptNamesAndCodes();
        this.getAllUserNamesAndCodes();
        // if (val === '') {
        //   this.returnCopyInfo();
        // } else {
        this.copyInfo();
        this.pageParams.pageNum = 1;

        workloadStatisticsGetList(this.list.realName,this.list.deptName,this.list.dateStart,this.list.dateEnd,this.pageParams.pageNum,this.pageParams.pageSize).then((res) =>{
            if (res.status === 200) {
              let data = res.data;
              if (data.status === 'OK') {
                this.workloadStatisticsList = data.data.list;
                this.pageParams.pages = data.data.pages;
                this.pageParams.total = data.data.total;
              } else {
                alert(data.msg);
              }
            }
          }
        );
        // }
      },
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push( item.feeID);
        });
      },
      handleSizeChange(val) {
        this.pageParams.pageSize=val;
        this.getworkloadStatisticsList();
      },
      handleCurrentChange(val) {
        this.pageParams.pageNum=val;
        this.getworkloadStatisticsList();
      },

      //刷新页面信息
      freshInfo() {
        this.getworkloadStatisticsList();
        this.getAllDeptNamesAndCodes();
        this.getAllUserNamesAndCodes();
      },

    },
    mounted() {
      this.getworkloadStatisticsList();
      this.getAllDeptNamesAndCodes();
      this.getAllUserNamesAndCodes();
    }


  }
</script>
