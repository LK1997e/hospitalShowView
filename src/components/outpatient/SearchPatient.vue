<template>
  <el-container>
    <el-header style="background:#41cde5;">
      <el-col span="2" class="grid-content">
        <span style="font-size:20px;color: white;">病人查找</span>
      </el-col>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">
      <el-row class="row-bg">

        <el-col class="grid-content" span="6" offset="1">
          <el-select v-model="searchValue" @change="findPatient"
                     filterable :filter-method="findPatientValuesFilter" clearable placeholder="病历编码或病人姓名">
            <el-option
              v-for="item in patientRecListOptions"
              :key="item.medicalRecordNo"
              :label="item.patientName"
              :value="item.patientName">
              <span style="float: left">{{ item.patientName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.medicalRecordNo }}</span>
            </el-option>
          </el-select>
        </el-col>

      </el-row>


      <el-row class="row show-shadow"
              style="padding-bottom: 10px;" :gutter="20">
        <el-col :span="15">
          <div>
            <el-container>
              <el-header>
                <el-divider content-position="left" >待选择的患者列表</el-divider>
              </el-header>
              <el-table
                ref="singleTable"
                :data="patientRecListOptions"
                highlight-current-row
                @current-change="handleCurrentChange" style="width: 100%">

                <el-table-column type="index" style="width: 10%">
                </el-table-column>


                <el-table-column label="姓名" property="patientName" style="width: 30%">
                </el-table-column>
                <el-table-column label="身份证号" property="identityCardNo" style="width: 30%">
                </el-table-column>
                <el-table-column label="病历编码" property="medicalRecordNo" style="width: 30%">
                </el-table-column>

              </el-table>
              <hr>

              <div class="block">

                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentPageChange"
                  background
                  :current-page="pageParams.pageNum"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="pageParams.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pageParams.total">
                </el-pagination>
              </div>
            </el-container>

          </div>

        </el-col>
        <el-col :span="6" :offset="1" >
          <el-divider content-position="left" >病人详情</el-divider>
          <div>
            <el-form   ref="form" :model="form" label-width="80px">

              <el-form-item label="姓名" property="patientName">
                <el-input v-model="indexPatient.patientName" readonly></el-input>
              </el-form-item>
              <el-form-item label="身份证号" property="identityCardNo">
                <el-input v-model="indexPatient.identityCardNo" readonly></el-input>
              </el-form-item>
              <el-form-item label="病历编号" property="medicalRecordNo">
                <el-input v-model="indexPatient.medicalRecordNo" readonly></el-input>
              </el-form-item>
              <el-form-item label="年龄" property="age">
                <el-input v-model="indexPatient.age" readonly></el-input>
              </el-form-item>

              <el-form-item label="状态" property="diagnosisStatus">
                <el-input v-model="indexPatient.diagnosisStatus" readonly></el-input>
              </el-form-item>


            </el-form>
          </div>
          <el-row style="padding-bottom: 10px;" >


            <el-button size="medium">查看</el-button>

            <el-button @click="goMedicalRecHome">诊治</el-button>

          </el-row>

        </el-col>

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




</style>
<script>
  import {
    findPatient,
    listPatientNoDiagnosis, listSearchValue
  } from '../../api/outPatientApi/medicalRecHomeApi';
  import Qs from 'qs';
  export default {
    name: "SearchPatient",
    data() {
      return {
        //被筛选的（未诊断的
        patientSearchValues: [],
        //筛选出的
        patientSearchOptions : [],
        searchValue: '',
        nameOrMedicalRecNo:'',
        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },

        //patientList :[] ,
        patientRecList :[],
        patientRecListValues :[],
        patientRecListOptions :[],
        indexPatient : {},//被选中的病人
        currentRow: null,
        state1: '',
        state2: ''
      }

    },
    methods: {
      //获取所有未诊断病人
      listPatientNoDiagnosis() {
        this.pageParams.pageNum = 1;
        this.pageParams.pageSize = 5;
        let params = {
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize

        };

        listPatientNoDiagnosis(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.searchValue = '';



              this.patientRecListValues = data.data.list;
              this.patientRecListOptions = data.data.list;
              this.patientRecList = data.data.list;
              this.pageParams.pages = data.data.pages;
              this.pageParams.total = data.data.total;
              console.log(patientRecList.length);
            } else {
              alert(data.msg);
            }
          }




        });
      },
      //获取所有的可检索字段
      listSearchValue() {
        listSearchValue().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.patientSearchValues = data.data;
              this.patientSearchOptions = data.data;
            } else {
              alert(data.msg);
            }
          }

        });
      },


      ////查询患者:通过患者病历号或患者名字
      findPatient() {
        this.pageParams.pageNum = 1;
        this.pageParams.pageSize = 5;
        let params = {
          nameOrMedicalRecNo: this.searchValue,
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize
        };
        if( nameOrMedicalRecNo === ''){
          this.listPatientNoDiagnosis();
        }else{
          findPatient(params).then((res) => {

            if (res.status === 200) {

              let data = res.data;
              if (data.status === 'OK') {
                this.searchValue = '';
                this.patientRecList = data.data.list;
                this.patientRecListOptions = data.data.list;
                this.pageParams.pages = data.data.pages;
                this.pageParams.total = data.data.total;
                console.log(patientRecList.length);


              } else {
                alert(data.msg);
              }
            }
          })
        }

      },
      findPatientValuesFilter(val) {
        this.patientRecListOptions = val ? this.patientRecListValues.filter(this.createFilter(val)) : this.patientRecListValues ;

      },
      createFilter(queryString) {
        return (item) => {
          return (item.medicalRecordNo.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.patientName.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
      //选择发生改变
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;

        this.indexPatient=val;

        console.log(this.indexPatient.patientName);
      },
      //处理页大小改变
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.listPatientNoDiagnosis();
      },
      //处理当前页改变
      handleCurrentPageChange(val) {
        this.pageParams.pageNum = val;
        this.listPatientNoDiagnosis();
      },
      //去选中病人的信息
      getInfo(val){
        indexPatient = this.patientRecListValues[val];

      },
      goMedicalRecHome(){
        this.$router.push({
          path: '/outPatient/MedicalRecHome',
          name: 'MedicalRecHome',
          query: {
            medicalRecID: this.indexPatient.medicalRecID,
            patientID : this.indexPatient.patientID

        }
      })
      }
    },
    mounted() {
      this.listPatientNoDiagnosis();
      // this.listSearchValue();


    }





  }
</script>

