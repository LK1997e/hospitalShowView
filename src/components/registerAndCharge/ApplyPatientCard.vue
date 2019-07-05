<template>

    <el-container>

        <el-header style = "line-height: 60px;background:#a2a8d3;">
            <el-row type = "flex" align = "middle" style = "height: 60px;" class = "row-bg">
                <el-col style = "text-align: center;" span = "3" class = "grid-content">
                    <span style = "font-size:20px;color: white;">申请就诊卡</span>
                </el-col>
            </el-row>
        </el-header>

        <el-main style = "border: 1px solid #49cde5;">

            <el-form :model = "patientForm" :rules = "rules" ref = "patientForm" label-position = "left"
                     label-width = "100px" class = "patientForm">

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item label = "患者名字" prop = "patientName">
                            <el-input v-model = "patientForm.patientName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "8">
                        <el-form-item label = "性别" prop = "gender">
                            <el-radio-group v-model = "patientForm.gender">
                                <el-radio label = "1">男</el-radio>
                                <el-radio label = "0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item label = "身份证号" prop = "identityCardNo">
                            <el-input v-model = "patientForm.identityCardNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "8">
                        <el-form-item label = "出生日期" prop = "birthday">
                            <el-date-picker v-model = "patientForm.birthday" value-format = "yyyy-MM-dd"
                                            placeholder = "选择日期" style = "width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item label = "家庭住址" prop = "familyAddress">
                            <el-input v-model = "patientForm.familyAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "8">
                        <el-form-item label = "就诊卡密码" prop = "passwd">
                            <el-input v-model = "patientForm.passwd" show-password></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-col :span = "8">
                        <el-form-item align = "right">
                            <el-button id = "submit" type = "primary" @click = "submitForm('patientForm')">确认申请
                            </el-button>
                            <el-button @click = "resetForm('patientForm')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-form-item>

            </el-form>

        </el-main>

    </el-container>

</template>

<script>


  import {applyCard} from '../../api/patientCard'

  export default {

    name: 'ApplyPatientCard',

    data() {
      return {
        //患者信息
        patientForm: {
          //患者名字
          patientName: '',
          //身份证号
          identityCardNo: '',
          //性别
          gender: '',
          //出生日期
          birthday: '',
          //家庭住址
          familyAddress: '',
          //就诊卡密码
          passwd: '',
        },

        rules: {

          patientName: [
            {required: true, message: '请输入患者名字', trigger: 'blur'},
            {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur'},
          ],
          identityCardNo: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
          ],
          gender: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          birthday: [
            {required: true, message: '请选择日期', trigger: 'change'},
          ],
          familyAddress: [
            {required: true, message: '请输入家庭住址', trigger: 'blur'},
          ],
          passwd: [
            {required: true, message: '请输入就诊卡密码', trigger: 'blur'},
            {min: 4, max: 4, message: '长度为 4 个字符', trigger: 'blur'},
          ],
        },
      }
    },

    methods: {

      submitForm() {

        let params = {
          patientName: this.patientForm.patientName,
          identityCardNo: this.patientForm.identityCardNo,
          gender: this.patientForm.gender,
          birthday: this.patientForm.birthday,
          familyAddress: this.patientForm.familyAddress,

          passwd: this.patientForm.passwd,
        }

        applyCard(params).then((res) => {
          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {

              this.$message({
                message: '申请成功！',
                type: 'success',
              })

            } else {
              this.$message.error('申请失败!')
            }
          }
        })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    },

  }
</script>

<style scoped>

</style>
