<template>
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
        // this.reload();
        var user = sessionStorage.getItem('user');
        // var routes = sessionStorage.getItem('route')
        // if(routes){
        //   routes = JSON.parse(routes);
        //   this.$router.addRoutes(routes);
        // }
        if (user) {
          user = JSON.parse(user);
          this.user = user;
          this.user.photoLocation = "http://localhost:8081/hospital/images/"+user.photoLocation;
        }
      }
    }

</script>

<style scoped>

</style>
