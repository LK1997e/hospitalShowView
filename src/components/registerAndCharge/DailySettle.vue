<template>
  <el-container style="margin-top: 20px">
    <el-header style="background:#a2a8d3;padding: 20px;height: 100px">
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
            v-model="condition.endDate"
            type="datetime"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日 HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            >
          </el-date-picker>


        <el-col :span="2" :offset="20"
                style="padding-bottom: 10px;border-right: solid 1px #eee">
          <el-button type="primary" @click="dailySettle">日结结算</el-button>
        </el-col>
        </el-col>

        <hr>


      </el-row>


      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">日结结果</el-divider>
          </el-header>
          <el-col :span="22" :offset="1" class="grid-content">
            <el-table
              ref="dailySettleViewList"
              :data="dailySettleViewList"
              style="width: 100%">

              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                    :data="dailySettleFeeList[props.$index]"
                    style="width: 100%">
                    <el-table-column label="病历编号" prop="medicalRecordID">
                    </el-table-column>
                    <el-table-column label="项目编号" prop="chargeItemID">
                    </el-table-column>
                    <el-table-column label="费用科目" prop="expName">
                    </el-table-column>
                    <el-table-column label="支付状态" prop="payStatusName">
                    </el-table-column>
                    <el-table-column label="收费时间" prop="tollDate">
                    </el-table-column>
                    <el-table-column label="金额" prop="fee">
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>


              <el-table-column label="日结编号" prop="id">
              </el-table-column>
              <el-table-column label="收费员名字" prop="tollManName">
              </el-table-column>
              <el-table-column label="日结开始时间" prop="startTime">
              </el-table-column>
              <el-table-column label="日结结束时间" prop="endTime">
              </el-table-column>
              <el-table-column label="总金额" prop="amount">
              </el-table-column>
            </el-table>
          </el-col>
          <hr>



        </el-container>

      </el-row>


    </el-main>



  </el-container>

</template>



<script>
  import {
    DailySettle,
    DailySettleFee
  } from "../../api/feeApi";
  import Qs from 'qs';

  export default {
    name: "dailySettle",
    data() {
      return {
        condition:{
          startDate: '',
          endDate: '',
        },

        dailySettleViewList: [],
        dailySettleFeeList: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        }
      }

    },
    methods: {
      dailySettle(){
        let params = Qs.stringify(
          {
            endDate:this.condition.endDate,
          }
        );

        DailySettle(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
               this.dailySettleViewList=data.data;
               this.dailySettleFeeList=[];
               data.data.forEach((item)=>{
                this.dailySettleFee(item.startTime,item.endTime);
              });
              this.$message({
                message: data.msg,
                type: 'success'
              });
            } else if (data.status === 'WARN') {
              this.dailySettleViewList=[];
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
      dailySettleFee(startDate, endDate) {
        let params = 'startDate=' + startDate + '&endDate=' + endDate;
        DailySettleFee(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.dailySettleFeeList.push(data.data);
            } else {
              this.$message({
                message: data.msg,
                type: 'warning'
              });
            }
          }
        });
      },
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

