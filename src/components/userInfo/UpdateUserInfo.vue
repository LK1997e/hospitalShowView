<template>
  <div id="logo">
    <el-container>
      <el-header style="background:#a2a8d3;">
        <el-row class="row-bg">
          <el-col span="4" class="grid-content">
            <span style="font-size:20px;color: white;">个人信息修改</span>
          </el-col>

        </el-row>

      </el-header>
      <el-container>
      <el-aside width="350px">
        <div style="margin: 15%">
          <div>
            <el-upload
              action="http://localhost:8081/hospital/UserInfo/updatePic/"
              list-type="picture-card"
              name="pic"
              :before-upload="handleBeforeUpload"
              :on-success="handleSuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="handleBeforeRemove"
              :limit="1"
              :with-credentials="true"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" >
            </el-dialog>
          </div>
        </div>
      </el-aside>
      <el-main>
        <el-form >
          <el-row>
            <el-col :span="9">
              <el-row type="flex" class="row-bg" >
                <el-col :span="15">
                  <div>
                    <el-form-item label="用户名" prop="userName">
                      <el-input
                        ref="userName"
                        v-model="updateForm.updateUserInfoForm.userName"
                        name="userName"
                        placeholder="如需修改，在这里输入新用户名">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" >
                <el-col :span="15">
                  <div>
                    <el-form-item label="真实姓名" prop="realName">
                      <el-input
                        ref="realName"
                        v-model="updateForm.updateUserInfoForm.realName"
                        name="realName"
                        placeholder="如需修改，在这里输入新姓名">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" >
                <el-col :span="15">
                  <el-form-item label="联系方式" prop="contact">
                    <el-input
                      ref="contact"
                      v-model="updateForm.updateUserInfoForm.contact"
                      name="contact"
                      placeholder="如需修改，在这里输入新联系方式">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="9">
              <el-row type="flex" class="row-bg" >
                <el-col :span="15">
                  <div>
                    <el-form-item label="旧密码" prop="oldPasswd">
                      <el-input
                        ref="oldPasswd"
                        v-model="updateForm.updatePasswdForm.oldPasswd"
                        name="oldPasswd"
                        type="password"
                        placeholder="若要修改密码，请输入旧密码">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" >
                <el-col :span="15">
                  <div>
                    <el-form-item label="新密码" prop="newPasswd">
                      <el-input
                        ref="newPasswd"
                        v-model="updateForm.updatePasswdForm.newPasswd"
                        type="password"
                        name="newPasswd"
                        placeholder="请输入新密码">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" >
                <el-col :span="15">
                  <div>
                    <el-form-item label="确认新密码" prop="newPasswd2">
                      <el-input
                        ref="newPasswd2"
                        v-model="updateForm.updatePasswdForm.newPasswd2"
                        type="password"
                        name="newPasswd2"
                        placeholder="再次输入新密码">
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>



          <el-row>
            <el-col :span="8" align="right" style="margin-top: 100px">
              <el-form-item>
                <el-col>
                  <el-button type="primary" @click="updateUserInfo">&nbsp;&nbsp;确认修改&nbsp;&nbsp;</el-button>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <!--    <el-row>-->
          <!--      <el-col :span="8" align="right">-->
          <!--        <el-form-item>-->
          <!--          <el-button type="primary" @click="reload">&nbsp;&nbsp;刷新&nbsp;&nbsp;</el-button>-->
          <!--        </el-form-item>-->
          <!--      </el-col>-->
          <!--    </el-row>-->
        </el-form>
      </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import {
    UpdateUserInfo,
    UpdatePasswd
  }from '../../api/userInfoApi';
  export default {
    inject:['reload'],
    data() {
      return {
        labelPosition: 'right',
        // labelPosition: 'top',
        dialogVisible:false,
        dialogImageUrl:'',
        photolocation:'',
        updateForm:{
          updateUserInfoForm: {
            userName: '',
            realName: '',
            contact: '',
          },
          updatePasswdForm: {
            oldPasswd: '',
            newPasswd: '',
            newPasswd2: '',
          },
          updatePic:{
            photoLocation:'',
          },

        },

        result:{
          status:'',
          msg:'',
          data:{
            number:'',
          }
        },
        userview:{
          id:'',
          userName:'',
          realName:'',
          passwd:'',
          departmentID:'',
          deptCode:'',
          deptName:'',
          typeID:'',
          typeCode:'',
          type:'',
          rankID:'',
          rankCode:'',
          rank:'',
          isSchedule:'',
          appearUserID:'',
          changeUserID:'',
          appearDate:'',
          changeDate:'',
          photoLocation:'',
          contact:'',
        }
      }
    },
    mounted() {
      if(this.$route.path === '/finance/UpdateUserInfo'){
        var user = sessionStorage.getItem('financeUser');
      }
      if(this.$route.path === '/admin/UpdateUserInfo'){
        var user = sessionStorage.getItem('adminUser');
      }
      if(this.$route.path === '/registerAndCharge/UpdateUserInfo'){
        var user = sessionStorage.getItem('registerAndChargeUser');
      }
      if(this.$route.path === '/outpatient/UpdateUserInfo'){
        var user = sessionStorage.getItem('outpatientUser');
      }
      if(this.$route.path === '/medicalTech/UpdateUserInfo'){
        var user = sessionStorage.getItem('medicalTechUser');
      }
      if(this.$route.path === '/pharmacy/UpdateUserInfo'){
        var user = sessionStorage.getItem('pharmacyUser');
      }
      if (user) {
        user = JSON.parse(user);
        this.userview = user;
        //初始化界面的信息
        this.updateForm.updateUserInfoForm.userName = user.userName;
        this.updateForm.updateUserInfoForm.realName = user.realName;
        this.updateForm.updateUserInfoForm.contact = user.contact;
        this.photolocation = user.photoLocation;
      }
    },
    methods:{
      updateUserInfo(){
        //如果没有更新密码
        if(this.updateForm.updatePasswdForm.oldPasswd===''&&this.updateForm.updatePasswdForm.newPasswd===''&&this.updateForm.updatePasswdForm.newPasswd2===''){
          // alert("没有更新密码！")
          if(this.updateForm.updateUserInfoForm.userName===''){
            alert("用户名不能为空！");
          }else if(this.updateForm.updateUserInfoForm.realName===''){
            alert("真实姓名不能为空！")
          }else if(this.updateForm.updateUserInfoForm.contact===''){
            alert("联系方式不能为空！");
          }else{
            //格式允许
            UpdateUserInfo(this.updateForm.updateUserInfoForm.userName,this.updateForm.updateUserInfoForm.realName,this.updateForm.updateUserInfoForm.contact).then((res) => {
              if (res.status === 200) {
                let resu = res.data;
                this.result = resu;
                if (this.result.status === 'OK') {
                  alert("信息更新成功！")
                  //更新session
                  if(this.$route.path === '/finance/UpdateUserInfo'){
                    var user = sessionStorage.getItem('financeUser');
                  }
                  if(this.$route.path === '/admin/UpdateUserInfo'){
                    var user = sessionStorage.getItem('adminUser');
                  }
                  if(this.$route.path === '/registerAndCharge/UpdateUserInfo'){
                    var user = sessionStorage.getItem('registerAndChargeUser');
                  }
                  if(this.$route.path === '/outpatient/UpdateUserInfo'){
                    var user = sessionStorage.getItem('outpatientUser');
                  }
                  if(this.$route.path === '/medicalTech/UpdateUserInfo'){
                    var user = sessionStorage.getItem('medicalTechUser');
                  }
                  if(this.$route.path === '/pharmacy/UpdateUserInfo'){
                    var user = sessionStorage.getItem('pharmacyUser');
                  }
                  if (user) {
                    user = JSON.parse(user);
                    user.userName = this.updateForm.updateUserInfoForm.userName;
                    user.realName = this.updateForm.updateUserInfoForm.realName;
                    user.contact = this.updateForm.updateUserInfoForm.contact;
                    if((this.photoLocation !== null)&&(this.photoLocation !== ''))
                      user.photoLocation = this.photoLocation;
                    sessionStorage.setItem('user', JSON.stringify(user));
                    if(this.$route.path === '/finance/UpdateUserInfo'){
                      sessionStorage.setItem('financeUser', JSON.stringify(user));
                    }
                    if(this.$route.path === '/admin/UpdateUserInfo'){
                      sessionStorage.setItem('adminUser', JSON.stringify(user));
                    }
                    if(this.$route.path === '/registerAndCharge/UpdateUserInfo'){
                      sessionStorage.setItem('registerAndChargeUser', JSON.stringify(user));
                    }
                    if(this.$route.path === '/outpatient/UpdateUserInfo'){
                      sessionStorage.setItem('outpatientUser', JSON.stringify(user));
                    }
                    if(this.$route.path === '/medicalTech/UpdateUserInfo'){
                      sessionStorage.setItem('medicalTechUser', JSON.stringify(user));
                    }
                    if(this.$route.path === '/pharmacy/UpdateUserInfo'){
                      sessionStorage.setItem('pharmacyUser', JSON.stringify(user));
                    }
                    this.reload();
                  }
                }else{
                  alert("用户名重复，更新失败")
                }
              }
              else {
                alert("出现异常!")
              }
            });
          }

        }else{
          if(this.updateForm.updatePasswdForm.newPasswd !== this.updateForm.updatePasswdForm.newPasswd2){
            alert("两次新密码输入不一致！");
          }
          else{
            UpdatePasswd(this.updateForm.updatePasswdForm.oldPasswd,this.updateForm.updatePasswdForm.newPasswd).then((res) => {
              if (res.status === 200) {
                let resu = res.data;
                this.result = resu;
                if (this.result.status === 'OK') {
                  alert("密码更新成功！")
                  UpdateUserInfo(this.updateForm.updateUserInfoForm.userName,this.updateForm.updateUserInfoForm.realName,this.updateForm.updateUserInfoForm.contact).then((res) => {
                    if (res.status === 200) {
                      let resu = res.data;
                      this.result = resu;
                      if (this.result.status === 'OK') {
                        alert("信息更新成功！")
                        //更新session
                        if(this.$route.path === '/finance/UpdateUserInfo'){
                          var user = sessionStorage.getItem('financeUser');
                        }
                        if(this.$route.path === '/admin/UpdateUserInfo'){
                          var user = sessionStorage.getItem('adminUser');
                        }
                        if(this.$route.path === '/registerAndCharge/UpdateUserInfo'){
                          var user = sessionStorage.getItem('registerAndChargeUser');
                        }
                        if(this.$route.path === '/outpatient/UpdateUserInfo'){
                          var user = sessionStorage.getItem('outpatientUser');
                        }
                        if(this.$route.path === '/medicalTech/UpdateUserInfo'){
                          var user = sessionStorage.getItem('medicalTechUser');
                        }
                        if(this.$route.path === '/pharmacy/UpdateUserInfo'){
                          var user = sessionStorage.getItem('pharmacyUser');
                        }
                        if (user) {
                          user = JSON.parse(user);
                          user.userName = this.updateForm.updateUserInfoForm.userName;
                          user.realName = this.updateForm.updateUserInfoForm.realName;
                          user.contact = this.updateForm.updateUserInfoForm.contact;
                          if((this.photoLocation !== null)&&(this.photoLocation !== ''))
                            user.photoLocation = this.photoLocation;
                          sessionStorage.setItem('user', JSON.stringify(user));
                          if(this.$route.path === '/finance/UpdateUserInfo'){
                            sessionStorage.setItem('financeUser', JSON.stringify(user));
                          }
                          if(this.$route.path === '/admin/UpdateUserInfo'){
                            sessionStorage.setItem('adminUser', JSON.stringify(user));
                          }
                          if(this.$route.path === '/registerAndCharge/UpdateUserInfo'){
                            sessionStorage.setItem('registerAndChargeUser', JSON.stringify(user));
                          }
                          if(this.$route.path === '/outpatient/UpdateUserInfo'){
                            sessionStorage.setItem('outpatientUser', JSON.stringify(user));
                          }
                          if(this.$route.path === '/medicalTech/UpdateUserInfo'){
                            sessionStorage.setItem('medicalTechUser', JSON.stringify(user));
                          }
                          if(this.$route.path === '/pharmacy/UpdateUserInfo'){
                            sessionStorage.setItem('pharmacyUser', JSON.stringify(user));
                          }
                          this.reload();
                        }
                      }else{
                        alert("用户名重复，更新失败")
                      }
                    }
                    else {
                      alert("出现异常!")
                    }
                  });
                }else{
                  alert("旧密码输入错误，更新失败")
                }
              }
              else {
                alert("出现异常!")
              }
            });
          }

        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        removeImages(file.response.data);

      },
      handleBeforeRemove(file, fileList){
        console.log(file, fileList);
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(file);
      },
      handleSuccess(response, file, fileList){
        console.log(response);
        console.log(file);
        console.log(fileList);
        this.result=response;
        this.photoLocation = this.result.data;
        // alert(JSON.stringify(file));
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
        // alert(JSON.stringify(file));
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
      }
    }

  }

</script>

<style scoped>
  #logo{
    background: url("../../../static/hospital2.jpg");
    background-size: 100% 100%;
    height: 100%;
    /*position: fixed;*/
    width: 100%;
  }
</style>
