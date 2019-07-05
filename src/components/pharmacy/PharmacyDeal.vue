<template>
  <el-container style="margin-top: 20px">
    <el-header style="background:#a2a8d3;padding: 20px;height: 100px">
      <el-row class="row-bg" type="flex" align="middle">
        <el-col :span="4" class="grid-content">
          <span style="font-size:30px;color: white;"> <i class="el-icon-search"></i>处方详情</span>
        </el-col>
      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <el-row class="row-bg show-shadow" type="flex" align="top">
        <el-col :span="22" :offset="1" class="grid-content">
          <el-divider content-position="left">处方详情</el-divider>
          <el-table
            ref="takeMedicineFormViewList"
            :data="takeMedicineFormViewList"
            style="width: 100%">
            <el-table-column label="处方编号" prop="id">
            </el-table-column>
            <el-table-column label="病历编号" prop="medicalRecordID">
            </el-table-column>
            <el-table-column label="患者名称" prop="patientName">
            </el-table-column>
            <el-table-column label="开方医生" prop="realName">
            </el-table-column>
            <el-table-column label="申请时间" prop="appearDate">
            </el-table-column>
          </el-table>
        </el-col>


      </el-row>


      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-col :span="22" :offset="1" class="grid-content">
            <el-tabs v-model="condition.mark" @tab-click="handleMark">
              <el-tab-pane label="未取药" name="139"></el-tab-pane>
              <el-tab-pane label="已取药" name="138"></el-tab-pane>
              <el-tab-pane label="已退药" name="140"></el-tab-pane>
              <el-tab-pane label="待缴费" name="134"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-header>
            <el-divider content-position="left">检查检验列表</el-divider>
          </el-header>
          <el-col :span="4" class="el-col-display">
            <template v-if="condition.mark==='139'">
            <el-link icon="el-icon-download" style="font-size: 16px;color: #23bd24"
                     @click="takeMedicine">批量取药
            </el-link>
            </template>
            <template v-if="condition.mark==='138'">
              <el-link icon="el-icon-download" style="font-size: 16px;color: darkkhaki"
                       @click="withdrawMedicine">批量退药
              </el-link>
            </template>
          </el-col>
          <el-col :span="22" :offset="1" class="grid-content">
            <el-table
              ref="takeMedDetailsviewList"
              :data="takeMedDetailsviewList"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" prop="id">
              </el-table-column>
              <el-table-column label="药品名称" prop="drugsName">
              </el-table-column>
              <el-table-column label="药品编号" prop="drugsCode">
              </el-table-column>
              <el-table-column label="药品规格" prop="drugsFormat">
              </el-table-column>
              <el-table-column label="药品剂型" prop="drugsDosageName">
              </el-table-column>
              <el-table-column label="药品类型" prop="drugsTypeName">
              </el-table-column>
              <el-table-column label="生产厂家" prop="manufacturer">
              </el-table-column>
              <el-table-column label="数量" prop="quantity">
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
    Takemedicineformview,
    WithdrawMedicine,
    TakeMedicine,
    Takemeddetailsview
  } from "../../api/pharmacyApi";
  import Qs from 'qs';

  export default {
    name: "PharmacyDeal",
    data() {
      return {
        condition: {
          prescriptionID: '',
          mark: '139',
        },

        takeMedicineFormViewList: [],
        takeMedDetailsviewList: [],
        checkList: [],

      }

    },
    methods: {
      getTakeMedicineFormViewList() {
        this.condition.prescriptionID = this.$route.params.prescriptionID
        let params = Qs.stringify(
          {
            search: this.condition.prescriptionID,
            pageNum: 1,
            pageSize: 1
          }
        );
        Takemedicineformview(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.takeMedicineFormViewList = data.data.list;
            } else {
              alert(data.msg);
            }
          }
        });
      },
      getTakemeddetailsviewList() {
        let params = Qs.stringify(
          {
            prescriptionID: this.condition.prescriptionID,
            mark: this.condition.mark
          }
        );
        Takemeddetailsview(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.takeMedDetailsviewList = data.data;
            } else {
              alert(data.msg);
            }
          }
        });
      },
      handleMark() {
        this.getTakemeddetailsviewList();
      },
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push(item.id);
        });
      },
      takeMedicine(){
        this.$confirm('确认取药？')
          .then(_ => {
            let params = {id: this.checkList};
            TakeMedicine(params).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {
                    this.getTakemeddetailsviewList();
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });

                  } else if (data.status === 'NG') {
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
      withdrawMedicine(){
        this.$confirm('确认退药？')
          .then(_ => {
            let params = {id: this.checkList};
            WithdrawMedicine(params).then((res) => {
                if (res.status === 200) {
                  let data = res.data;
                  if (data.status === 'OK') {
                    this.getTakemeddetailsviewList();
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });

                  } else if (data.status === 'NG') {
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


      }
    },
    mounted() {
      this.getTakeMedicineFormViewList();
      this.getTakemeddetailsviewList();
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

