<template>
  <el-container style="margin-top: 20px">
    <el-header style="background:#a2a8d3;padding: 20px;height: 100px">
      <el-row class="row-bg" type="flex" align="middle">
        <el-col :span="4" class="grid-content">
          <span style="font-size:30px;color: white;"> <i class="el-icon-search"></i> 检查检验执行</span>
        </el-col>
      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">


      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">检查检验审核项目</el-divider>
          </el-header>
          <el-col :span="22" :offset="1" class="grid-content">
            <el-table
              ref="multipleTable"
              :data="inspectReviewList"
              style="width: 100%">
              <el-table-column label="项目编码" prop="fmeditemCode">
              </el-table-column>
              <el-table-column label="项目名称" prop="fmeditemName">
              </el-table-column>
              <el-table-column label="申请医生" prop="realName">
              </el-table-column>
              <el-table-column label="申请时间" prop="appearDate">
              </el-table-column>
              <el-table-column label="项目规格" prop="fmeditemFormat">
              </el-table-column>
              <el-table-column label="项目数量" prop="number">
              </el-table-column>

            </el-table>
          </el-col>

          <el-header>
            <el-divider content-position="left">导入检查检验结果</el-divider>
          </el-header>
          <el-form :model="inspectionResultWithBLOBs" :rules="rules" ref="inspectionResultWithBLOBs"
                   label-position="top" label-width="100px" class="demo-ruleForm">
            <el-col :span="22" :offset="1" class="grid-content">
              <el-form-item label="检查检验所见" prop="view">
                <el-input type="textarea" :rows="4"  v-model="inspectionResultWithBLOBs.view"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="22" :offset="1" class="grid-content">
              <el-form-item label="检查检验诊断" prop="diagnosis">
                <el-input type="textarea" :rows="4" v-model="inspectionResultWithBLOBs.diagnosis"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" :offset="11" class="grid-content">
              <el-form-item>
                <template v-if="isResultReset===false">
                <el-button type="primary" @click="submitResultForm('inspectionResultWithBLOBs')">录入结果</el-button>
                </template>
                <template v-else>
                <el-button type="primary" @click="resetResultForm('inspectionResultWithBLOBs')">重新录入</el-button>
                </template>
              </el-form-item>
            </el-col>
          </el-form>


          <el-header>
            <el-divider content-position="left">导入检查检验结果图片</el-divider>
          </el-header>



            <el-col :span="2" :offset="11" class="grid-content">
          <el-upload
            action="http://localhost:8081/hospital/inspection/uploadInspectResultImages/"
            list-type="picture-card"
            name="pic"
            :before-upload="handleBeforeUpload"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="handleBeforeRemove"
            :with-credentials="true"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :title="dialogImageName" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" >
          </el-dialog>
            </el-col>




        </el-container>

        <br>
        <br>
        <br>
        <br>
        <el-col :span="2" :offset="11" class="grid-content">
          <el-button type="primary" @click="finishInspection">完成结果录入</el-button>
        </el-col>
        <br>
        <br>
        <br>
        <br>

      </el-row>


    </el-main>


  </el-container>

</template>


<script>
  import {
    InspectReview,
    ImportInspectResult,
    UpdateInspectResult,
    ImportInspectResultImages,
    DeleteInspectResultImages,
    FinishInspection
  } from '../../../api/inspectionApi';
  import Qs from 'qs';

  export default {
    name: "inpectionExcute",
    data() {
      return {
        condition: {
          inspectionDetailsID: ''
        },
        isResultReset: false,

        dialogImageName:'',
        dialogVisible: false,
        dialogImageUrl: '',

        inspectReviewList: [],
        inspectionResultWithBLOBs: {
          id: '',
          inspectionDetailsID: '',
          view: '',
          diagnosis: ''
        },
        inspectionResultImage: {
          imageName: '',
          inspectionResultID: '',
          catalog: ''
        },
        result:{
          status:'',
          msg:'',
          data:{
            number:'',
          }
        },
        rules:{
          view: [
            { required: true, message: '请输入检查检验所见', trigger: 'blur' },
          ],
          diagnosis: [
            { required: true, message: '请输入检查检验诊断', trigger: 'blur' },
          ],
        }


      }
    },
    methods: {
      getInspectReviewList() {
        this.condition.inspectionDetailsID = this.$route.params.inspectionDetailsID;
        InspectReview("inspectionDetailsID=" + this.condition.inspectionDetailsID).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.inspectReviewList = data.data;
            }else if (data.status === 'NG') {
              this.$message({
                message: data.msg,
                type: 'warning'
              });
            }
          }
        });
      },
      submitResultForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'inspectionResultWithBLOBs')
              this.$confirm('确认录入结果？')
                .then(_ => {
                  this.inspectionResultWithBLOBs.inspectionDetailsID=this.condition.inspectionDetailsID;
                  ImportInspectResult(this.inspectionResultWithBLOBs).then((res) => {
                      if (res.status === 200) {
                        let data = res.data;
                        if (data.status === 'OK') {
                          this.inspectionResultWithBLOBs = data.data;
                          this.isResultReset = true;
                          this.$message({
                            message: data.msg,
                            type: 'success'
                          });
                          this.freshMatInfo();
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    resetResultForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'inspectionResultWithBLOBs')
            this.$confirm('确认重新录入结果？')
              .then(_ => {
                this.inspectionResultWithBLOBs.inspectionDetailsID=this.condition.inspectionDetailsID;
                UpdateInspectResult(this.inspectionResultWithBLOBs).then((res) => {
                    if (res.status === 200) {
                      let data = res.data;
                      if (data.status === 'OK') {
                        this.inspectionResultWithBLOBs = data.data;
                        this.$message({
                          message: data.msg,
                          type: 'success'
                        });
                        this.freshMatInfo();
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let params="catalog="+file.response.data;
      DeleteInspectResultImages(params).then((res) => {
        if (res.status === 200) {
          let data = res.data;
          if (data.status === 'OK') {
            this.$message({
              message: data.msg,
              type: 'success'
            });
          }else if (data.status === 'NG') {
            this.$message({
              message: data.msg,
              type: 'warning'
            });
          }
        }
      });
    },
    handleBeforeRemove(file, fileList) {
      console.log(file, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      let name=file.name.split(".");
      this.dialogImageName=name[0];
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.result = response;
      this.inspectionResultImage.inspectionResultID=this.condition.inspectionDetailsID;
      let name=file.name.split(".");
      this.inspectionResultImage.imageName=name[0];
      this.inspectionResultImage.catalog = this.result.data;
      let params=this.inspectionResultImage;
      ImportInspectResultImages(params).then((res) => {
        if (res.status === 200) {
          let data = res.data;
          if (data.status === 'OK') {
            this.$message({
              message: data.msg,
              type: 'success'
            });
          }else if (data.status === 'NG') {
            this.$message({
              message: data.msg,
              type: 'warning'
            });
          }
        }
      });
    },
    handleBeforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isBMP = file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
      finishInspection(){
        let params='inspectionDetailsID='+this.condition.inspectionDetailsID;
        FinishInspection(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.$message({
                message: data.msg,
                type: 'success'
              });
              this.$router.push({ path: '/medicalTech/inspectionSearch' });
            }else if (data.status === 'NG') {
              this.$message({
                message: data.msg,
                type: 'warning'
              });
            }
          }
        });
      }
  }
    ,
    mounted() {
      this.getInspectReviewList();
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

