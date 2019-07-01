<template>
  <el-container style="margin-top: 20px">
    <el-header style="background:#41cde5;padding: 20px;height: 100px">
      <el-row class="row-bg" type="flex" align="middle">
        <el-col :span="4" class="grid-content">
          <span  style="font-size:30px;color: white;"> <i class="el-icon-search"></i> 收费员日结</span>
        </el-col>
      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <el-row class="row-bg show-shadow" type="flex" align="middle">

        <el-col :span="24" style="padding-bottom: 10px;border-right: solid 1px #eee">

          <el-divider content-position="left">日结操作</el-divider>


          <el-col :span="2" class="el-col-display">统计截止时间</el-col>

          <el-date-picker
            style="float: left;margin-left: 8px"
            v-model="condition.date"
            type="datetime"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日 HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="handleDateChange">
          </el-date-picker>


        <el-col :span="2" :offset="20"
                style="padding-bottom: 10px;border-right: solid 1px #eee">
          <el-button type="primary" @click="dailySettle">日结结算</el-button>
        </el-col>
        </el-col>

        <hr>


      </el-row>



    </el-main>
  </el-container>

</template>



<script>
  import {
    DailySettle,
    DailySettleSearch,
    DailySettleFee
  } from "../../api/feeApi";
  import Qs from 'qs';

  export default {
    name: "inpectionSearch",
    data() {
      return {
        condition:{
          date:'',
        },
      }

    },
    methods: {
      handleDateChange(){
        this.pageParams.pageNum=1;
      },
      dailySettle(){
        let params = Qs.stringify(
          {
            endDate:this.condition.date,
          }
        );
        DailySettle(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
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

