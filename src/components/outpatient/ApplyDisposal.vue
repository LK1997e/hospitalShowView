<template>
  <el-container style="margin-top: 6px">
    <el-header style="background:#a2a8d3;">
    </el-header>
    <el-main style="border: 1px solid #a2a8d3;">
      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-col :span="3"
                  style="padding-bottom: 10px">
            <el-button @click="dialogTableVisible = true">新增</el-button>
            <el-dialog title="新增项目" :visible.sync="dialogTableVisible">

              <!--用标签页表示几种增加方式-->
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="检索增加" name="first">
                  <el-form :model="newProject" ref="newProject" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="项目" prop="FmedItemID">
                      <!-- 一个查找全部项目的搜索框-->
                      <el-select v-model="newProject.FMedItemID" clearable placeholder="请选择">
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


                <el-tab-pane label="组套增加" name="second">
                  <!-- 找常用处置的带建议搜索框-->
                  <el-select v-model="templateID" clearable placeholder="请选择组套">
                    <el-option
                      v-for="item in projectTemplateList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-button type="primary" @click="use_Check()">新增</el-button>
                </el-tab-pane>

                <el-tab-pane label="常用处置项目" name="third">
                  <!-- 找常用处置的带建议搜索框-->
                  <el-select v-model="searchCommonValue" clearable placeholder="请选择常用处置">
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
            <el-button @click="tempStore">暂存</el-button>
          </el-col>
          <el-col :span="3"
                  style="padding-bottom: 10px">
            <el-button @click="useTemp">使用暂存</el-button>
          </el-col>
          <el-col :span="3"
                  style="padding-bottom: 10px">
            <el-button @click="tempDialogVisible = true">存为组套</el-button>
          </el-col>




        </el-container>


      </el-row>


      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="center">处置项目</el-divider>
          </el-header>
          <!-- 表格（放该病人的DisposalViewList）-->
          <el-table
            ref="multipleTable"
            :data="disposalDetailsList"
            highlight-current-row
            @current-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">

                <el-button icon="el-icon-edit"
                           @click.native.prevent="deleteDisposalDetailsByID(props.row.disposalDetailsID)"
                           type="text"
                           size="small">
                  删除
                </el-button>



                <el-button icon="el-icon-edit"
                           @click.native.prevent="drawDisposalDetails(props.row.disposalDetailsID)"
                           type="text"
                           size="small">
                  开立
                </el-button>


                <el-button icon="el-icon-edit"
                           @click.native.prevent="abolishDisposalDetails(props.row.disposalDetailsID)"
                           type="text"
                           size="small">
                  废除
                </el-button>

                <!--<el-button icon="el-icon-edit" @click.native.prevent="deleteDisposalDetails()" type="text"-->
                <!--size="small">-->
                <!--开立-->
                <!--</el-button>-->
                <!--<el-button icon="el-icon-edit" @click.native.prevent="deleteDisposalDetails()" type="text"-->
                <!--size="small">-->
                <!--废除-->
                <!--</el-button>-->

                <!--<el-button icon="el-icon-edit" @click.native.prevent="lookDisposalRes()" type="text"-->
                <!--size="small">-->
                <!--看结果-->
                <!--</el-button>-->
                <el-popover
                  placement="bottom"

                  width="600"
                  trigger="click">
                  <el-form  :inline="true" :model="indexFMedItem"label-width="80px">

                    <el-form-item label="项目名称" property="name">
                      <el-input v-model="indexFMedItem.name" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="单位" property="format">
                      <el-input v-model="indexFMedItem.format" readonly></el-input>
                    </el-form-item>

                    <el-form-item label="科室" property="deptName">
                      <el-input v-model="indexFMedItem.deptName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="收费类别" property="expClassName">
                      <el-input v-model="indexFMedItem.expClassName" readonly></el-input>
                    </el-form-item>

                  </el-form>
                  <el-button slot="reference" @click="getIndexFMedItem(props.row)">详情</el-button>
                </el-popover>


              </template>
            </el-table-column>

            <el-table-column type="selection" style="width: 10%">
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


        <hr>
        <!-- 提示框，显示该项目的详细信息-->
        <el-dialog title="存为组套信息" :visible.sync="tempDialogVisible" width="30%">
          <el-form :model="newTemplate" :rules="rules" ref="newTemplate" label-width="100px" class="demo-ruleForm">
            <el-form-item label="组套名称" prop="name">
              <el-input v-model="newTemplate.name" style="width: 280px"></el-input>

            </el-form-item>
            <el-form-item label="组套编码" prop="templateCode">
              <el-input v-model="newTemplate.templateCode" style="width: 280px"></el-input>

            </el-form-item>
            <el-form-item label="适用范围" prop="area">
              <el-select v-model="newTemplate.area" placeholder="请选择适用范围">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>

            <el-form-item label="临床印象" prop="impression">
              <el-input v-model="newTemplate.impression" style="width: 280px"></el-input>

            </el-form-item>
            <el-form-item label="临床诊断" prop="diagnosis">
              <el-input v-model="newTemplate.diagnosis" style="width: 280px"></el-input>

            </el-form-item>
            <el-form-item label="目的要求" prop="goal">
              <el-input v-model="newTemplate.goal" style="width: 280px"></el-input>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveTemplate">存为组套</el-button>
              <el-button @click="resetForm('newTemplate')">重置</el-button>
            </el-form-item>


          </el-form>

        </el-dialog>


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
    getIndexFMedItem,
    newDisposal,
    adddisposalDetailsList,
    addDisposalDetails,
    searchDisposal,
    tempStore,
    drawDisposalDetails,
    addProjectFee,
    deleteDisposalDetails,
    abolishDisposalDetails,
    useCommonDisposal,
    use_Check,
    listDisposal,
    listIndexDisposal,
    deleteDisposalDetailsByID
  } from '../../api/outPatientApi/applyDisposalApi';
  import {
    listCommonDisposal
  } from '../../api/outPatientApi/commonDisposalApi';
  import {
    getThisDoctorTemp
  } from '../../api/outPatientApi/projectTempApi'

  export default {
    name: "ApplyDisposal",
    data() {
      return {

        options: [{
          value: '104',
          label: '全院'
        }, {
          value: '105',
          label: '科室'
        }, {
          value: '106',
          label: '个人'
        }],
        value: '',


        templateID: '',
        projectTemplate: {},
        projectTemplateDetails: [],
        activeName: 'first',
        newProject: {},
        newCommon: {},

        indexPatient: {
          medicalRecID: '',
          medicalRecordNo: '',
          diagnosisStatus: '',
          patientID: '',
          patientName: '',
          IdentityCardNo: '',
          age: '',
          gender: '',
          birthday: '',
          familyAddress: '',
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
        indexPatientID: '',
        dialogTableVisible: false,
        fMedItemList: [],//存用于检索全部处置的项目
        //存组套列表
        //存常用项目列表

        indexFMedItem:{},

        searchItemValue: '',
        searchTempValue: '',
        DisposalTempList: [],
        searchCommonValue: '',

        commonDisposalList: [],


        projectTemplateList: [],
        disposalDetailsList: [],
        medicalRecordID: '',
        DisposalViewList: [],
        indexDisposalView: {},
        indexList: [],
        disposal: {
          id: '',
          medicalRecordID: '',
          mark: '',
          appearUserID: '',
          changeUserID: '',
          appearDate: '',
          changeDate: '',

        },
        checkList: [],

        rules: {
          name: [
            {required: true, message: '请输入科室名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},

          ],
        },

        tempDialogVisible: false,//存为组套问名字啥的的对话框
        newTemplate: {
          name: ''
        },//新增的组套
        newTemplateID :'' ,
        newTemplateDetails: [],//新增的组套详细


        initDialogVisible: false ,//初始化时用到的对话框
      }
    },
    methods:
      {
        initial() {
          // alert("11");
          var indexPatient = sessionStorage.getItem('patient');

          this.indexPatient = indexPatient;
          console.log(this.indexPatient);
          console.log(this.indexPatient.patientID);
        },
        getIndexFMedItem(val){
          getIndexFMedItem(val).then((res) =>{
            if (res.status === 200) {
              let data = res.data;
              if (data.status === 'OK') {
                // alert("建立Disposal成功");
                this.indexFMedItem = data.data;
                console.log(this.indexFMedItem);
                this.$message({
                  message: data.msg,
                  type: 'success'
                });
              } else if (data.status === 'WARN') {
                // alert("建立Disposalbu成功")
                this.$message({
                  message: data.msg,
                  type: 'warning'
                });
              } else {
                // alert("建立Disposal失败？？")
                this.$message.error(data.msg);
              }
            }
          });



        },

        newDisposal() {
          //一进入界面就调用
          this.disposal.medicalRecordID = this.medicalRecordID;
          // alert("newDisposal medicalRecordID" +this.disposal.medicalRecordID );
          //let params = {Disposal : this.disposal};
          newDisposal(this.disposal).then((res) => {
            if (res.status === 200) {
              let data = res.data;
              if (data.status === 'OK') {
                // alert("建立Disposal成功");
                this.disposal = data.data;
                console.log(this.disposal);
                this.$message({
                  message: data.msg,
                  type: 'success'
                });
              } else if (data.status === 'WARN') {
                // alert("建立Disposalbu成功")
                this.$message({
                  message: data.msg,
                  type: 'warning'
                });
              } else {
                // alert("建立Disposal失败？？")
                this.$message.error(data.msg);
              }
            }
          });


        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        resetForm() {
          this.searchItemValue = '';
          this.newProject.number = '';
        },
        adddisposalDetailsList() {

        },
        addDisposalDetails() {
          this.$confirm('确认新增该处置项目？')
            .then(_ => {
              this.newProject.disposalID = this.disposal.id;
              this.newProject.medicalRecordID = this.disposal.medicalRecordID;
              console.log(this.newProject);
              addDisposalDetails(this.newProject).then((res) => {
                  console.log(this.newProject);
                  if (res.status === 200) {
                    let data = res.data;
                    if (data.status === 'OK') {
                      // alert("新增成功");
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


        tempStore() {
          //sessionStorage.setItem('tempStore', JSON.stringify(this.medicalRecordHome));

        },
        drawDisposalDetails(val) {
          this.checkList=[];
          this.checkList.push(val);

          this.$confirm('确认开立？')
            .then(_ => {
              let params = {"id": this.checkList};
              drawDisposalDetails(params).then((res) => {
                  if (res.status === 200) {
                    let data = res.data;
                    if (data.status === 'OK') {

                      this.chu();

                      this.$message({
                        message: '开立成功',
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
                }
              )

            })
            .catch(_ => {
            });

        },

        deleteDisposalDetailsByID(val) {
          console.log(val);
          this.$confirm('确认删除该项目？')
            .then(_ => {
              // alert(val);
              let params = {"DisposalDetailsId": val};
              deleteDisposalDetailsByID(params).then((res) => {
                  if (res.status === 200) {
                    let data = res.data;
                    if (data.status === 'OK') {
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
        abolishDisposalDetails(val) {
          this.checkList=[];
          this.checkList.push(val);

          this.$confirm('确认废除？')
            .then(_ => {
              let params = {"id": this.checkList};
              abolishDisposalDetails(params).then((res) => {
                  if (res.status === 200) {
                    let data = res.data;
                    if (data.status === 'OK') {

                      this.chu();

                      this.$message({
                        message: '废除成功',
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
                }
              )

            })
            .catch(_ => {
            });

        },


        //重置表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },

        use_Check() {
          let id = {
            'projectTemplateID': this.templateID,
            'disposalID': this.disposal.id
          };
          // alert("use_Check");
          use_Check(id).then((res) => {
            // alert("use_Check里");
            if (res.status === 200) {
              let data = res.data;
              if (data.status === 'OK') {
                this.projectTemplate = data.data;
                // alert("成功取到模板");
                this.chu();
                console.log(this.projectTemplate);
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
        lookDisposalRes() {

        },
        listDisposal() {
          listDisposal().then((res) => {
            // alert("mb");
            if (res.status === 200) {
              // alert("mb2");
              let data = res.data;
              if (data.status === 'OK') {
                this.fMedItemList = data.data;
                // alert(this.fMedItemList.length);
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

        listIndexDisposal() {
          //存该患者的那些项目（做表格那块）


          let id = {'medicalRecordID': this.medicalRecordID};
          listIndexDisposal(id).then((res) => {
            if (res.status === 200) {
              // alert("mb3");
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
        handleSelectionChange(items) {
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
        getThisDoctorTemp() {
          getThisDoctorTemp().then((res) => {
            if (res.status === 200) {
              let data = res.data;
              if (data.status === 'OK') {
                this.projectTemplateList = data.data;
                // alert("组套长度"+this.projectTemplateList.length);
                console.log(this.projectTemplateList);

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

        listCommonDisposal() {
          //加载该医生的常用诊断
          listCommonDisposal().then((res) => {
            alert("listCommonDisposal");
            if (res.status === 200) {
              // alert("listCommonDisposal200");
              let data = res.data;
              if (data.status === 'OK') {
                this.commonDisposalList = data.data;
                console.log(this.commonDisposalList.length);
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
        init() {
          // alert("11");
          //this.indexPatient = this.$route.query.indexPatient;
          var index = JSON.parse(sessionStorage.getItem('patient'));


          this.indexPatient = index;
          //alert(this.indexPatient);
          console.log(this.indexPatient);
          if( this.indexPatient != null){

            ;
          }else{
            this.initDialogVisible = true;
          }

          console.log(this.indexPatient.patientID);
          this.medicalRecordID = this.indexPatient.medicalRecID;
          console.log(this.medicalRecordID);
        },
        chu() {
          this.init();
          this.listDisposal();

          this.listCommonDisposal();
          this.getThisDoctorTemp();
          this.newDisposal();
          this.listIndexDisposal();
          //this.disposal.id = this.disposalDetailsList[0].disposalID;
        }


      },
    mounted() {
      this.chu();


    }

  }

</script>

<style scoped>

</style>

