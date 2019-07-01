<template>
  <el-container style="margin-top: 20px">
  <el-header style="background:#41cde5;padding: 20px;height: 100px">
    <el-row class="row-bg" type="flex" align="middle">
      <el-col :span="4" class="grid-content">
       <span  style="font-size:30px;color: white;"> <i class="el-icon-search"></i> 检查检验搜索</span>
      </el-col>
      <el-col  class="grid-content" :span="6" :offset="1">
        <el-input v-model="condition.search" @change="handleSearchChange" style="font-size:20px;" clearable placeholder="请输入检查检验相关信息"></el-input>
      </el-col>
    </el-row>

  </el-header>
  <el-main style="border: 1px solid #49cde5;">

    <el-row class="row-bg show-shadow" type="flex" align="middle">

      <el-col :span="24"
              style="padding-bottom: 10px;border-right: solid 1px #eee">

        <el-divider content-position="left">筛选查询</el-divider>

        <el-col :span="2" class="el-col-display">项目名称</el-col>


        <el-select style="float: left;margin-left: 8px"  @change="handleFMedItemChange"
                   v-model="condition.itemID" filterable :filter-method="fMedItemSearchValuesFilter"
                   clearable placeholder="请选择">
          <el-option
            v-for="item in fMedItemSearchOptions"
            :key="item.code"
            :label="item.name"
            :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
          </el-option>
        </el-select>

        <el-col :span="2" class="el-col-display">开设时间</el-col>

        <el-date-picker
          style="float: left;margin-left: 8px"
          v-model="condition.date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          @change="handleDateChange">
        </el-date-picker>

      </el-col>
    </el-row>



    <el-row class="row show-shadow"
            style="padding-bottom: 10px;">
      <el-container>
        <el-col  :span="22" :offset="1" class="grid-content">
        <el-tabs v-model="condition.mark" @tab-click="handleMark">
          <el-tab-pane label="待处置" name="144"></el-tab-pane>
          <el-tab-pane label="待审核" name="142"></el-tab-pane>
          <el-tab-pane label="待登记" name="137"></el-tab-pane>
          <el-tab-pane label="待缴费" name="134"></el-tab-pane>
          <el-tab-pane label="已完成" name="145"></el-tab-pane>
        </el-tabs>
        </el-col>
        <el-header>
          <el-divider content-position="left">检查检验列表</el-divider>
        </el-header>
        <el-col  :span="22" :offset="1" class="grid-content">
        <el-table
          ref="multipleTable"
          :data="inspectFormViewList"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column label="申请编号" prop="inspectionDetailsID">
          </el-table-column>
          <el-table-column label="检查编号" prop="inspectionId">
          </el-table-column>
          <el-table-column label="类型" >
            <template slot-scope="props">
              {{props.row.type===0?"检查":"检验"}}
            </template>
          </el-table-column>
          <el-table-column label="患者名称" prop="patientName">
          </el-table-column>
          <el-table-column label="申请医生" prop="realName">
          </el-table-column>
          <el-table-column label="申请时间" prop="inspectionAppearDate">
          </el-table-column>
          <el-table-column label="项目编号" prop="fmeditemId">
          </el-table-column>
          <el-table-column label="项目名称" prop="fmeditemName">
        </el-table-column>

          <el-table-column label="状态">
            <template slot-scope="props">
              <p v-if="condition.mark==='144'">
                待处置
              </p>
              <p v-else-if="condition.mark==='142'">
                待审核
              </p>
              <p v-else-if="condition.mark==='137'">
                待登记
              </p>
              <p v-else-if="condition.mark==='134'">
                待缴费
              </p>
              <p v-else-if="condition.mark==='145'">
                已完成
              </p>
            </template>
          </el-table-column>
          <el-table-column label="操作">

            <template slot-scope="props">
              <template v-if="condition.mark==='144'">
                <router-link :to="{ name: '检查检验执行', params: { inspectionDetailsID: props.row.inspectionDetailsID}}">
                <el-button icon="el-icon-delete"  type="text"
                           size="small" style="color: #2266e6">开始执行
                </el-button>
                </router-link>
              </template>
              <template v-else-if="condition.mark==='142'">
                <router-link :to="{ name: '检查检验审核', params: { inspectionDetailsID: props.row.inspectionDetailsID}}">
                  <el-button icon="el-icon-delete"  type="text"
                             size="small" style="color: #2266e6">开始审核
                  </el-button>
                </router-link>
              </template>
              <template v-else-if="condition.mark==='137'">
                <el-button icon="el-icon-delete" @click.native.prevent="handleRegistered(props.row.inspectionDetailsID)" type="text"
                           size="small" style="color: #2266e6">开始登记
                </el-button>
              </template>
              <template v-else-if="condition.mark==='134'">
                无
              </template>
              <template v-else-if="condition.mark==='145'">
                无
              </template>
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
  import {
    InspectSearchFMedItem,
    Inspectformview,
    RegisterInspectionDetails
  } from '../../../api/inspectionApi';
  import Qs from 'qs';

  export default {
    name: "inpectionSearch",
    data() {
      return {
        condition:{
          search:'',
          itemID:'',
          date:'',
          mark:'134',
        },
        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0
        },

        fMedItemSearchValues: [],
        fMedItemSearchOptions: [],

        inspectFormViewList: [],


      }

    },
    methods: {

      getInspectFormViewList() {
        let params = Qs.stringify(
          {
              search:this.condition.search,
              itemID:this.condition.itemID,
              date:this.condition.date,
              mark:this.condition.mark,
              pageNum: this.pageParams.pageNum,
              pageSize: this.pageParams.pageSize
          }
        );
        alert(params);
        Inspectformview(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.inspectFormViewList = data.data.list;
              this.pageParams.total = data.data.total;
            } else {
              alert(data.msg);
            }
          }
        });
      },
      //获得非药品项目名称和编号
      getAllFMedItemNamesAndCodes(){
        InspectSearchFMedItem().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.fMedItemSearchValues = data.data;
              this.fMedItemSearchOptions = data.data;
            } else {
              alert(data.msg);
            }
          }
        });
      },

      fMedItemSearchValuesFilter(val) {
        this.fMedItemSearchOptions = val ? this.fMedItemSearchValues.filter(this.createFMedItemFilter(val)) : this.deptCategoryValues;
      },

      createFMedItemFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0||item.mnemonicCode.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },
      handleSizeChange(val) {
        this.pageParams.pageSize=val;
        this.getInspectFormViewList();
      },
      handleCurrentChange(val) {
        this.pageParams.pageNum=val;
        this.getInspectFormViewList();
      },handleSearchChange(){
        this.pageParams.pageNum=1;
        this.getInspectFormViewList();
      },
      handleMark(tab, event){
        this.pageParams.pageNum=1;
        this.getInspectFormViewList();
      },
      handleFMedItemChange(){
        this.getAllFMedItemNamesAndCodes();
        this.pageParams.pageNum=1;
        this.getInspectFormViewList();
      },
      handleDateChange(){
        this.pageParams.pageNum=1;
        this.getInspectFormViewList();
      },
      handleRegistered(propRow){
        let params='inspectionDetailsID='+propRow;
            RegisterInspectionDetails(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.$message({
                    message: data.msg,
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: data.msg,
                    type: 'warning'
                  });
                }
              }
            });
      }
    },
    mounted() {
      this.getAllFMedItemNamesAndCodes();
      this.getInspectFormViewList();
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
