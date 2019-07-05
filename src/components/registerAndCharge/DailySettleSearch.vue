<template>
  <el-container style="margin-top: 20px">
    <el-header style="background:#a2a8d3;padding: 20px;height: 100px">
      <el-row class="row-bg" type="flex" align="middle">
        <el-col :span="4" class="grid-content">
          <span style="font-size:30px;color: white;"> <i class="el-icon-search"></i>日结查询</span>
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
          <el-header>
            <el-divider content-position="left">日结列表</el-divider>
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

          <div class="block" style="text-align: center">
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


<script>
  import {DailySettleFee, DailySettleSearch} from "../../api/feeApi";
  import Qs from 'qs';

  export default {
    name: "dailySettleSearch",
    data() {
      return {
        condition: {
          startDate: '',
          endDate: '',
        },
        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0
        },

        dailySettleViewList: [],
        dailySettleFeeList: [],

      }

    },
    methods: {
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.dailySettleSearch();
      },
      handleCurrentChange(val) {
        this.pageParams.pageNum = val;
        this.dailySettleSearch();
      },
      handleStartDateChange() {
        this.pageParams.pageNum = 1;
        this.dailySettleSearch();
      },
      handleEndDateChange() {
        this.pageParams.pageNum = 1;
        this.dailySettleSearch();
      },
      dailySettleSearch() {
        let params = Qs.stringify(
          {
            startDate: this.condition.startDate,
            endDate: this.condition.endDate,
            pageNum: this.pageParams.pageNum,
            pageSize: this.pageParams.pageSize
          }
        );
        DailySettleSearch(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.dailySettleViewList = data.data.list;
              this.dailySettleFeeList=[];
              data.data.list.forEach((item)=>{
                this.dailySettleFee(item.startTime,item.endTime);
              });
            } else {
              this.$message({
                message: data.msg,
                type: 'warning'
              });
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
      this.dailySettleSearch();
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

