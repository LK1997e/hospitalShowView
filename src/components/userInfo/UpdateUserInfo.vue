<template>
  <div>
  <el-form>
    <el-row type="flex" class="row-bg" >
      <el-col :span="8">
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
      <el-col :span="8">
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
      <el-col :span="8">
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
      <el-col :span="8">
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
      <el-col :span="8">
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
    <el-row type="flex" class="row-bg" >
      <el-col :span="8">
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
    <el-row>
      <el-col :span="8" align="right">
        <el-form-item>
          <el-button type="primary" @click="updateUserInfo">&nbsp;&nbsp;确认&nbsp;&nbsp;</el-button>
          <el-button @click.native.prevent>取消</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

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
      :with-credentials="true"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" >
    </el-dialog>
  </div>
    <div>
<!--      <img src="http://localhost:8081/hospital/images/dce54f27-4e4e-4fe2-aa80-0bd46e9dce3d.jpg">-->
    </div>
  </div>
</template>

<script>
  import {
    UpdateUserInfo
  }from '../../api/userInfoApi';
  export default {
    data() {
      return {
        // labelPosition: 'top',
        dialogVisible:false,
        dialogImageUrl:'',
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

        },

        result:{
          status:'',
          msg:'',
          data:{
            //user:{
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
            //}
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
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.userview = user;
        //初始化界面的信息
        this.updateForm.updateUserInfoForm.userName = user.userName;
        this.updateForm.updateUserInfoForm.realName = user.realName;
        this.updateForm.updateUserInfoForm.contact = user.contact;
      }
    },
    methods:{
      updateUserInfo(){
        //如果没有更新密码
        if(this.updateForm.updatePasswdForm.oldPasswd===''&&this.updateForm.updatePasswdForm.newPasswd===''&&this.updateForm.updatePasswdForm.newPasswd2===''){
          alert("没有更新密码！")
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
                  alert("成功")
                  //更新session
                  var user = sessionStorage.getItem('user');
                  if (user) {
                    user = JSON.parse(user);
                    user.userName = this.updateForm.updateUserInfoForm.userName;
                    user.realName = this.updateForm.updateUserInfoForm.realName;
                    user.contact = this.updateForm.updateUserInfoForm.contact;
                    sessionStorage.setItem('user', JSON.stringify(user));
                  }
                }else{
                  alert("更新失败")
                }
              }
              else {
                alert("出现异常!")
              }
            });
          }

        }else{
          alert(this.updateForm.updateUserInfoForm.oldPasswd)
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
        alert(JSON.stringify(file));
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
        alert(JSON.stringify(file));
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
      }
    }

  }

</script>

<style scoped>

</style>
