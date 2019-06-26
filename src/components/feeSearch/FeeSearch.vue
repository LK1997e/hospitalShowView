<template>
  <el-container style="margin-top: 20px">
    <el-header style="background:#41cde5;padding: 20px;height: 100px">
      <el-row class="row-bg" type="flex" align="middle">
        <el-col :span="4" class="grid-content">
          <span  style="font-size:30px;color: white;"> <i class="el-icon-search"></i> 费用查询</span>
        </el-col>
        <el-col  class="grid-content" :span="6" :offset="1">
          <el-input v-model="condition.search"  style="font-size:20px;" clearable placeholder="请输入费用相关信息"></el-input>
        </el-col>
      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <el-row class="row-bg show-shadow" type="flex" align="middle">

        <el-col :span="24"
                style="padding-bottom: 10px;border-right: solid 1px #eee">
          <el-divider content-position="left">筛选查询</el-divider>



          <el-col :span="2" class="el-col-display">开始时间</el-col>

          <el-date-picker
            style="float: left;margin-left: 8px"
            v-model="condition.startDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="handleStartDateChange">
          </el-date-picker>



        <el-col :span="2" class="el-col-display">结束时间</el-col>

        <el-date-picker
          style="float: left;margin-left: 8px"
          v-model="condition.endDate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          @change="handleEndDateChange">
        </el-date-picker>


        </el-col>
      </el-row>



      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-col  :span="22" :offset="1" class="grid-content">
            <el-tabs v-model="condition.payStatus" @tab-click="handlePayStatusChange">
              <el-tab-pane label="已缴费" name="133"></el-tab-pane>
              <el-tab-pane label="未缴费" name="134"></el-tab-pane>
              <el-tab-pane label="已退费" name="135"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-header>
            <el-divider content-position="left">费用清单</el-divider>
          </el-header>
          <el-col  :span="22" :offset="1" class="grid-content">
            <el-table
              ref="multipleTable"
              :data="tollRegList"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column label="患者费用编号" prop="id">
              </el-table-column>
              <el-table-column label="病历ID" prop="medicalRecordID">
              </el-table-column>

            </el-table>
          </el-col>



        </el-container>

      </el-row>

    </el-main>
  </el-container>

</template>



<script>
  import {
   TollReg
  } from '../../api/feeApi';
  import Qs from 'qs';

  export default {
    name: "FeeSearch",
    data() {
      return {
        condition:{
          search:'',
          payStatus:'133',
          startDate:'',
          endDate:'',
        },
        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0
        },

        //存放科室列表
        tollRegList: [],



      }

    },
    methods: {
      //获得所有科室列表
      getTollReg() {
        let params = Qs.stringify(
          {
            search:this.condition.search,
            startDate: this.condition.startDate,
            endDate: this.condition.endDate,
            payStatus: this.condition.payStatus
          }
        );
        alert(params);
        TollReg(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              alert(data.status);
              this.tollRegList = data.data
            } else {
              alert(data.msg);
            }
          }
        });
      },
      handlePayStatusChange(){
        this.getTollReg();
      },
      handleStartDateChange(){
        this.getTollReg();
      },
      handleEndDateChange(){
        this.getTollReg();
      },
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push({"id": item.id});
        });
      }
    },
    mounted() {

    }


  }
</script>


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
