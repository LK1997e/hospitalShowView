<template>
  <el-container style="margin-top: 20px">
    <el-header style="background:#41cde5;padding: 20px;height: 100px">
      <el-row class="row-bg" type="flex" align="middle">
        <el-col :span="4" class="grid-content">
          <span  style="font-size:30px;color: white;"> <i class="el-icon-search"></i> 药房搜索</span>
        </el-col>
        <el-col  class="grid-content" :span="6" :offset="1">
          <el-input v-model="condition.search" @change="handleSearchChange" style="font-size:20px;" clearable placeholder="请输入处方相关信息"></el-input>
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
            <el-divider content-position="left">处方列表</el-divider>
          </el-header>
          <el-col  :span="22" :offset="1" class="grid-content">
            <el-table
              ref="multipleTable"
              :data="takeMedicineFormViewList"
              style="width: 100%">
              <el-table-column label="处方编号" prop="id">
              </el-table-column>
              <el-table-column label="病历编号" prop="medicalRecordID">
              </el-table-column>
              <el-table-column label="患者姓名" prop="patientName">
              </el-table-column>
              <el-table-column label="开方医生" prop="realName">
              </el-table-column>
              <el-table-column label="申请时间" prop="appearDate">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="props">
                    <router-link :to="{ name: '药房处理', params: { prescriptionID: props.row.id}}">
                      <el-button icon="el-icon-delete"  type="text"
                                 size="small" style="color: #2266e6"> 查看处方详情
                      </el-button>
                    </router-link>
                </template>
              </el-table-column>

            </el-table>
          </el-col>
          <hr>



          <div class="block"  style="text-align: center">
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
  import {Takemedicineformview,} from "../../api/pharmacyApi";
  import Qs from 'qs';

  export default {
    name: "PharmacySearch",
    data() {
      return {
        condition:{
          search:'',
          startDate:'',
          endDate:''
        },
        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0
        },
        takeMedicineFormViewList: [],


      }

    },
    methods: {

      getTakeMedicineFormViewList() {
        let params = Qs.stringify(
          {
            search: this.condition.search,
            startDate: this.condition.startDate,
            endDate: this.condition.endDate,
            pageNum: this.pageParams.pageNum,
            pageSize: this.pageParams.pageSize
          }
        );
        Takemedicineformview(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.takeMedicineFormViewList = data.data.list;
              this.pageParams.total = data.data.total;
            } else {
              alert(data.msg);
            }
          }
        });
      },
      handleSizeChange(val) {
        this.pageParams.pageSize=val;
        this. getTakeMedicineFormViewList();
      },
      handleCurrentChange(val) {
        this.pageParams.pageNum=val;
        this. getTakeMedicineFormViewList();
      },
      handleSearchChange(){
        this.pageParams.pageNum=1;
        this.getTakeMedicineFormViewList();
      },
      handleStartDateChange(){
        this.pageParams.pageNum=1;
        this.getTakeMedicineFormViewList();
      },
      handleEndDateChange(){
        this.pageParams.pageNum=1;
        this.getTakeMedicineFormViewList();
      },
    },
    mounted() {
      this.getTakeMedicineFormViewList();
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
