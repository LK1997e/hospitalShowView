<template>
  <el-container style="margin-top: 6px">
    <el-main style="border: 1px solid #49cde5;">
      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="center">诊断</el-divider>
          </el-header>
          <!-- 表格（放该病人的inspectionViewList）-->
          <el-table
            ref="multipleTable"
            :data="indexDiagnosisList"
            highlight-current-row
            @current-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="selection" prop="id" style="width: 10%">
            </el-table-column>
            <el-table-column label="ICD编码" prop="code" style="width: 15%">
            </el-table-column>
            <el-table-column label="疾病名称" prop="name" style="width: 15%">
            </el-table-column>
            <el-table-column label="主诊" prop="subjectMark" style="width: 15%">
              <template slot-scope="props">
                <el-radio value=""></el-radio>

              </template>
            </el-table-column>
            <el-table-column label="疑似" prop="doubtMark" style="width: 15%">
            </el-table-column>
            <el-table-column label="发病日期" prop="diseaseDate" style="width: 15%">
            </el-table-column>
            <el-table-column label="诊断医生" prop="realName" style="width: 15%">
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



          <el-dialog
            title="未选择需诊断的患者"
            :visible.sync="initDialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>您未选中任何一位患者进行诊治~~</span>
            <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="goSearchPatient">确 定</el-button>
  </span>
          </el-dialog>

        </el-container>
      </el-row>
    </el-main>
  </el-container>

    
</template>

<script>
  import {
    getIndexDiagnosis
  }from '../../api/outPatientApi/DiagnosisApi';
    export default {
        name: "Diagnosis",
      data() {
          return {
            indexDiagnosisList :[],
            indexPatient :{
              medicalRecID : '',
              medicalRecordNo : '',
              diagnosisStatus :'',
              patientID : '',
              patientName :'',
              IdentityCardNo : '',
              age : '',
              gender :'',
              birthday :'',
              familyAddress:'',
            },
            listParam: {
              //选择的科室分类id
              deptCategoryID: '',
              //选择的科室类别id
              typeID: ''

            },
            pageParams: {
              //第几页
              pageNum: 1,
              //页大小
              pageSize: 5,
              //总条数
              total: 0,
            },
            //被选中的病人
            medicalRecordID : '',
            initDialogVisible:'false',//初始化时用到的对话框

          }

      },
      methods:
        {
          init(){
            alert("11");
            //this.indexPatient = this.$route.query.indexPatient;
            var index = JSON.parse(sessionStorage.getItem('patient'));

            this.indexPatient = index;
            //alert(this.indexPatient);
            if( this.indexPatient === null){

              this.initDialogVisible = true;
            }
            console.log(this.indexPatient);
            console.log(this.indexPatient.patientID);
            this.medicalRecordID = this.indexPatient.medicalRecID;
            console.log(this.medicalRecordID );
          },
          goSearchPatient() {
            this.$router.push({
              path: '/outPatient/SearchPatient',

            });
          },
          getIndexDiagnosis(){
            let id = {'medicalRecordID' :this.indexPatient.medicalRecID};
            getIndexDiagnosis(id).then((res)=>{
              if (res.status === 200) {
                alert("mb2");
                let data = res.data;
                if (data.status === 'OK') {
                  this.indexDiagnosisList = data.data;
                  alert("该病人诊断长度"+this.indexDiagnosisList.length);
                  console.log(this.indexDiagnosisList);
                  // this.deptSearchOptions = data.data;
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
          handleSelectionChange(items){
            this.checkList = [];
            items.forEach((item) => {
              this.checkList.push(item.id);
            });
          },
          //处理页大小改变
          handleSizeChange(val) {
            this.pageParams.pageSize = val;
            this.getIndexDiagnosis();
          },
          //处理当前页改变
          handleCurrentChange(val) {
            this.pageParams.pageNum = val;
            this.getIndexDiagnosis();
          },
          chu(){
            this.init();
            this.getIndexDiagnosis();
          }
        },
      mounted()
      {
        this.chu();




      }

    }
</script>

<style scoped>

</style>
