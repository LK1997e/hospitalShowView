<template>

    <div>
      <el-upload
        action="http://localhost:8081/hospital/expenseclass/uploadXls/"
        list-type="picture-card"
        name="file"
        :before-upload="handleBeforeUpload"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :before-remove="handleBeforeRemove"
        :with-credentials="true"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
</template>

<script>
    export default {
        name: "Expenseclass",
      methods:{
        handleRemove(file, fileList) {
          console.log(file, fileList);
          removeImages(file.response.data);

        },
        handleBeforeRemove(file, fileList){
          console.log(file, fileList);
          return this.$confirm(`确定移除 ${ file.name }？`);
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

        }
      },
    }
</script>

<style scoped>

</style>
