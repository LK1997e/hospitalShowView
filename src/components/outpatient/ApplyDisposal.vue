<template>
  <el-container style="margin-top: 6px">
    <el-main style="border: 1px solid #49cde5;">
      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-col :span="3"
                  style="padding-bottom: 10px">
            <el-button  @click="dialogTableVisible = true">新增</el-button>
            <el-dialog title="新增项目" :visible.sync="dialogTableVisible">

              <!--用标签页表示几种增加方式-->
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="检索增加" name="first">
                  <el-form :model="newProject"  ref="newProject" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="项目" prop="FmedItemID">
                      <!-- 一个查找全部项目的搜索框-->
                      <el-select v-model="newProject.FmedItemID" clearable placeholder="请选择">
                        <el-option
                          v-for="item in fMedItemList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="数量" prop="number">
                      <el-input v-model="newProject.number" style="width: 280px"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="addDisposalDetails()">新增</el-button>
                      <el-button @click="resetForm('newProject')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="模板增加" name="second">模板增加</el-tab-pane>

                <el-tab-pane label="常用检查项目" name="third">
                  <!-- 找常用检查的带建议搜索框-->
                  <el-select v-model="searchCommonValue" clearable placeholder="请选择常用检查">
                    <el-option
                      v-for="item in commonDisposalList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-tab-pane>

              </el-tabs>

            </el-dialog>
          </el-col>
          <el-col :span="3"
                  style="padding-bottom: 10px">
            <el-button  @click="tempStore">暂存</el-button>
          </el-col>
          <el-col :span="3"
                  style="padding-bottom: 10px">
            <el-button  @click="useTemp">使用暂存</el-button>
          </el-col>
          <el-col :span="3"
                  style="padding-bottom: 10px">
            <el-button  @click="saveTemplate">存为组套</el-button>
          </el-col>
        </el-container>

      </el-row>


      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="center">检查项目</el-divider>
          </el-header>
          <!-- 表格（放该病人的disposalViewList）-->
          <el-table
            ref="multipleTable"
            :data="disposalDetailsList"
            highlight-current-row
            @current-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">

                <el-button icon="el-icon-edit" @click.native.prevent="deleteDisposalDetails()" type="text"
                           size="small">
                  删除
                </el-button>
                <el-button icon="el-icon-edit" @click.native.prevent="deleteDisposalDetails()" type="text"
                           size="small">
                  编辑
                </el-button>
                <el-button icon="el-icon-edit" @click.native.prevent="deleteDisposalDetails()" type="text"
                           size="small">
                  开立
                </el-button>
                <el-button icon="el-icon-edit" @click.native.prevent="deleteDisposalDetails()" type="text"
                           size="small">
                  废除
                </el-button>
                <el-popover
                  placement="bottom"

                  width="600"
                  trigger="click">
                  <el-form  :inline="true" :model="this.indexPatient"label-width="80px">

                    <el-form-item label="姓名" property="patientName">
                      <el-input v-model="indexPatient.patientName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="病历编号" property="medicalRecordNo">
                      <el-input v-model="indexPatient.medicalRecordNo" readonly></el-input>
                    </el-form-item>

                    <el-form-item label="年龄" property="age">
                      <el-input v-model="indexPatient.age" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="性别" property="gender">
                      <el-input v-model="indexPatient.gender" readonly></el-input>
                    </el-form-item>

                  </el-form>
                  <el-button slot="reference">详情</el-button>
                </el-popover>


              </template>
            </el-table-column>
            <el-table-column type="index" style="width: 10%">
            </el-table-column>


            <el-table-column label="申请单号" property="disposalID" style="width: 5%">
            </el-table-column>
            <el-table-column label="项目名称" property="name" style="width: 15%">
            </el-table-column>
            <el-table-column label="数量" property="number" style="width: 10%">
            </el-table-column>
            <el-table-column label="单价" property="price" style="width: 10%">
            </el-table-column>
            <el-table-column label="申请人" property="appearUserName" style="width: 10%">
            </el-table-column>
            <el-table-column label="申请时间" property="appearDate" style="width: 10%">
            </el-table-column>
            <el-table-column label="状态" property="isDrawnName" style="width: 10%">
            </el-table-column>
            <el-table-column label="收费状态" property="isPaidName" style="width: 10%">
            </el-table-column>
            <el-table-column label="执行状态" property="isExecutedName" style="width: 10%">
            </el-table-column>
            <el-table-column label="金额" tyle="width: 10%">
              <template slot-scope="props">
                {{props.row.price * props.row.number}}
              </template>
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



      <el-container>














        <!-- 找组套的搜索框-->
        <el-select v-model="searchTempValue" clearable placeholder="请选择">
          <el-option
            v-for="item in fMedItemList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>

        <hr>


        <!-- 提示框，显示该项目的详细信息-->



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

    </el-main>

  </el-container>







</template>

<script>
  import {

    newDisposal,
    addDisposalDetailsList,
    addDisposalDetails,
    searchDisposal,
    tempStore,
    drawDisposalDetails,
    addProjectFee,
    deleteDisposalDetails,
    abolishDisposalDetails,
    useCommonDisposal,
    saveTemplate,
    saveTemplateDetails,
    use_Check,
    lookDisposalRes,
    listDisposal,
    listIndexDisposal
  } from '../../api/outPatientApi/applyDisposalApi';
  import {
    getThisDoctorTemp
  }from '../../api/outPatientApi/commonDisposalApi';
  export default {
    name: "ApplyDisposal",
    data() {
      return {
        activeName :'first',
        newProject:{},
        newCommon:{},

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
        indexPatientID :'',
        dialogTableVisible: false,
        fMedItemList :[],//存用于检索全部检查检验的项目
        //存组套列表
        //存常用项目列表

        searchItemValue :'',
        searchTempValue:'',
        disposalTempList:[],
        searchCommonValue:'',
        commonDisposalList:[],
        disposalDetailsList:[],
        medicalRecordID:'',
        disposalViewList:[],
        disposal :{
          id:'',
          medicalRecordID: '',
          num:'',
          mark:'',
          appearUserID:'',
          changeUserID:'',
          appearDate:'',
          changeDate:'',

        },
        initDialogVisible:'false',//初始化时用到的对话框
      }
    },
    methods:
      {
        initial(){
          alert("11");
          var indexPatient = sessionStorage.getItem('patient');

          this.indexPatient = indexPatient;
          console.log(this.indexPatient);
          console.log(this.indexPatient.patientID);
        },

        newDisposal(){
          //一进入界面就调用
          this.disposal.medicalRecordID = this.medicalRecordID;
          alert("newDisposal medicalRecordID" +this.disposal.medicalRecordID );
          //let params = {disposal : this.disposal};
          newDisposal(this.disposal).then((res)=> {
            console.log(this.disposal);
            if (res.status === 200) {
              let data = res.data;
              if (data.status === 'OK') {
                alert("建立disposal成功");
                this.disposal = data.data;
                console.log(this.disposal);
                this.$message({
                  message: data.msg,
                  type: 'success'
                });
              } else if (data.status === 'WARN') {
                alert("建立disposalbu成功")
                this.$message({
                  message: data.msg,
                  type: 'warning'
                });
              } else {
                alert("建立disposal失败？？")
                this.$message.error(data.msg);
              }
            }
          });


        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        resetForm(){
          this.searchItemValue = '';
          this.newProject.number = '';
        },
        addDisposalDetailsList(){

        },
        addDisposalDetails(){
          this.$confirm('确认新增该检查项目？')
            .then(_ => {
              this.newProject.disposalID = this.disposal.id;
              this.newProject.medicalRecordID = this.disposal.medicalRecordID;
              console.log(this.newProject);
              addDisposalDetails(this.newProject).then((res)=>{
                  console.log(this.newProject);
                  if (res.status === 200) {
                    let data = res.data;
                    if (data.status === 'OK') {
                      alert("新增成功");
                      this.chu();
                      this.$message({
                        message: data.msg,
                        type: 'success'
                      });
                    } else if (data.status === 'WARN') {
                      this.$message({
                        message: data.msg,
                        type: 'warning'
                      });
                    }else {
                      this.$message.error(data.msg);
                    }
                  }
                }
              )

            })
            .catch(_ => {
            });

        },
        searchDisposal(){

        },
        tempStore(){
          //sessionStorage.setItem('tempStore', JSON.stringify(this.medicalRecordHome));

        },
        drawDisposalDetails(){

        },
        addProjectFee(){

        },
        deleteDisposalDetails(){

        },
        abolishDisposalDetails(){

        },
        useCommonDisposal(){

        },
        saveTemplate(){

        },
        saveTemplateDetails(){

        },
        use_Check(){

        },
        lookDisposalRes(){

        },
        listDisposal(){
          listDisposal().then((res) =>{
            alert("mb");
            if (res.status === 200) {
              alert("mb2");
              let data = res.data;
              if (data.status === 'OK') {
                this.fMedItemList = data.data;
                alert(this.fMedItemList.length);
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

        listIndexDisposal(){
          //存该患者的那些项目（做表格那块）


          let id = {'medicalRecordID' : this.medicalRecordID};
          listIndexDisposal(id).then((res) =>{
            if (res.status === 200) {
              alert("listIndexDisposal");
              let data = res.data;
              if (data.status === 'OK') {
                this.disposalDetailsList = data.data;
                console.log(this.disposalDetailsList.length);
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
            this.checkList.push(item.disposalDetailsID);
          });
        },
        //处理页大小改变
        handleSizeChange(val) {
          this.pageParams.pageSize = val;
          this.listIndexDisposal();
        },
        //处理当前页改变
        handleCurrentChange(val) {
          this.pageParams.pageNum = val;
          this.listIndexDisposal();
        },

        getThisDoctorTemp(){
          //加载该医生的常用诊断
          getThisDoctorTemp().then((res)=>{
            alert("getThisDoctorTemp");
            if (res.status === 200) {
              alert("getThisDoctorTemp200");
              let data = res.data;
              if (data.status === 'OK') {
                this.commonDisposalList = data.data;
                alert("第一个常用处置"+this.commonDisposalList[1].disposalID);
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
        goSearchPatient() {
          this.$router.push({
            path: '/outPatient/SearchPatient',

          });
        },
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
        chu(){
          this.init();
          this.listDisposal();

          this.getThisDoctorTemp();
          this.newDisposal();
          this.listIndexDisposal();
          //this.disposal.id = this.disposalDetailsList[0].disposalID;
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
