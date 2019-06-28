<template>
  <el-form :model="loginCheckForm"  ref="loginCheckForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="userName">
      <el-input
        ref="userName"
        v-model="loginCheckForm.userName"
        name="userName"
        type="text"
        placeholder="用户名">
      </el-input>
    </el-form-item>
    <el-form-item prop="passwd">
      <el-input
        ref="passwd"
        type="password"
        name="passwd"
        v-model="loginCheckForm.passwd"
        placeholder="密码">
      </el-input>
    </el-form-item>
<!--    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="loginFunction">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
    import {
     LoginCheck
    }from '../../api/loginApi';
    import * as router from '../../router/index';

    export default {
      data() {
        return {
          loginCheckForm: {
            userName: '',
            passwd: '',
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
          }
        }
      },
      methods:{
        loginFunction(){
          LoginCheck(this.loginCheckForm).then((res) => {
            if (res.status === 200) {
              let resu = res.data;
              this.result = resu;
              if (this.result.status === 'OK') {
                alert(this.result.data.realName+"，  欢迎！  ")
                sessionStorage.setItem('user', JSON.stringify(this.result.data));
                //管理员
                if(this.result.data.typeID === 112){
                  sessionStorage.setItem('adminUser', JSON.stringify(this.result.data));
                  var user = sessionStorage.getItem('adminUser');
                  this.$router.addRoutes(router.adminRoutes);
                  var num=0;
                  for(var a in router.adminRoutes){
                    num++;
                  }
                  for(var i=0;i<num;i++){
                    this.$router.options.routes.push(router.adminRoutes.pop());
                  }
                  this.$router.push({ path: '/admin/UserInfo' });
                }
                //财务人员
                else if(this.result.data.typeID === 111){
                  sessionStorage.setItem('financeUser', JSON.stringify(this.result.data));
                  this.$router.addRoutes(router.financeRoutes);
                  var num=0;
                  for(var a in router.financeRoutes){
                    num++;
                  }
                  for(var i=0;i<num;i++){
                    this.$router.options.routes.push(router.financeRoutes.pop());
                  }
                  this.$router.push({ path: '/finance/UserInfo' });
                }
                //挂号收费员
                else if(this.result.data.typeID === 107){
                  sessionStorage.setItem('registerAndChargeUser', JSON.stringify(this.result.data));
                  this.$router.addRoutes(router.registerAndChargeRoutes);
                  var num=0;
                  for(var a in router.registerAndChargeRoutes){
                    num++;
                  }
                  for(var i=0;i<num;i++){
                    this.$router.options.routes.push(router.registerAndChargeRoutes.pop());
                  }
                  this.$router.push({ path: '/registerAndCharge/UserInfo' });
                }
                //门诊
                else if(this.result.data.typeID === 108){
                  sessionStorage.setItem('outpatientUser', JSON.stringify(this.result.data));
                  this.$router.addRoutes(router.outpatientRoutes);
                  var num=0;
                  for(var a in router.outpatientRoutes){
                    num++;
                  }
                  for(var i=0;i<num;i++){
                    this.$router.options.routes.push(router.outpatientRoutes.pop());
                  }
                  this.$router.push({ path: '/outpatient/UserInfo' });
                }
                //医技
                else if(this.result.data.typeID === 109){
                  sessionStorage.setItem('medicalTechUser', JSON.stringify(this.result.data));
                  this.$router.addRoutes(router.medicalTechRoutes);
                  var num=0;
                  for(var a in router.medicalTechRoutes){
                    num++;
                  }
                  for(var i=0;i<num;i++){
                    this.$router.options.routes.push(router.medicalTechRoutes.pop());
                  }
                  this.$router.push({ path: '/medicalTech/UserInfo' });
                }
                //药房
                else if(this.result.data.typeID === 110){
                  sessionStorage.setItem('pharmacyUser', JSON.stringify(this.result.data));
                  this.$router.addRoutes(router.pharmacyRoutes);
                  var num=0;
                  for(var a in router.pharmacyRoutes){
                    num++;
                  }
                  for(var i=0;i<num;i++){
                    this.$router.options.routes.push(router.pharmacyRoutes.pop());
                  }
                  this.$router.push({ path: '/pharmacy/UserInfo' });
                }

              }else if (this.result.status === 'NG'){
                alert("用户名密码错误！")
              }
            }
            else {
              alert("出现异常!")
            }
          });
        }

      }
    }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
