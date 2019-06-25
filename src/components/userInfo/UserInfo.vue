<template>
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
  </el-form>
</template>

<script>
    export default {
      data() {
        return {
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
        var user = sessionStorage.getItem('user');
        // var routes = sessionStorage.getItem('route')
        // if(routes){
        //   routes = JSON.parse(routes);
        //   this.$router.addRoutes(routes);
        // }
        if (user) {
          user = JSON.parse(user);
          this.user = user;
        }
      }
    }

</script>

<style scoped>

</style>
