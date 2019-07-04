<template>
  <div id="logo">
  <el-container>
    <el-header style="background:#41cde5;">
      <el-row class="row-bg">
        <el-col span="4" class="grid-content">
          <span style="font-size:20px;color: white;">用户个人信息</span>
        </el-col>

      </el-row>

    </el-header>
    <el-container>
    <el-aside width="350px">
    <div style="margin: 15%">
      <img :src=this.user.photoLocation style="width: 200px; height: 200px;">
    </div>
  </el-aside>
    <el-main>
  <el-form >
    <el-row type="flex" class="row-bg" >
      <el-col :span="8">
        <div>
          <el-form-item label="用户姓名" prop="realName">
            <el-input v-model="user.realName" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" >
      <el-col :span="8">
        <el-form-item label="科室名称" prop="deparement">
          <el-input v-model="user.deptName" readonly=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" >
      <el-col :span="8">
        <el-form-item label="用户类型" prop="type">
          <el-input v-model="user.type" readonly=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" >
      <el-col :span="8">
        <el-form-item label="职称" prop="rank">
          <el-input v-model="user.rank" readonly=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" >
      <el-col :span="8">
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="user.contact" readonly></el-input>
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
    export default {
      inject:['reload'],
      data() {

        return {
          // photoLocation:photoloca,
          // labelPosition: 'top',

          user:{
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
        if(this.$route.path === '/finance/UserInfo'){
          var user = sessionStorage.getItem('financeUser');
        }
        if(this.$route.path === '/admin/UserInfo'){
          var user = sessionStorage.getItem('adminUser');
        }
        if(this.$route.path === '/registerAndCharge/UserInfo'){
          var user = sessionStorage.getItem('registerAndChargeUser');
        }
        if(this.$route.path === '/outpatient/UserInfo'){
          var user = sessionStorage.getItem('outpatientUser');
        }
        if(this.$route.path === '/medicalTech/UserInfo'){
          var user = sessionStorage.getItem('medicalTechUser');
        }
        if(this.$route.path === '/pharmacy/UserInfo'){
          var user = sessionStorage.getItem('pharmacyUser');
        }
        if (user) {
          user = JSON.parse(user);
          this.user = user;
          this.user.photoLocation =  "http://localhost:8081/hospital/images/"+user.photoLocation;
        }
      }
    }

</script>

<style scoped>
  #logo{
    background: url("../../../static/hospital2.jpg");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%;
  }
</style>
