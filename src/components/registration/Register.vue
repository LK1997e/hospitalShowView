<template>
    <el-container>

        <el-header style = "background:#41cde5;">
            <el-row style = "top: 17px;" class = "row-bg">
                <el-col style = "text-align: center;" span = "2" class = "grid-content">
                    <span style = "font-size:20px;color: white;">挂号</span>
                </el-col>
            </el-row>
        </el-header>

        <el-form :model = "regForm" :rules = "rules" ref = "regForm" label-position = "left" label-width = "100px"
                 class = "regForm">

            <el-form-item>
                <el-col :span = "11">
                    <el-form-item label = "就诊卡" prop = "isHaveCard">
                        <el-radio-group v-model = "regForm.isHaveCard">
                            <el-radio label = "1">有</el-radio>
                            <el-radio label = "0">无</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span = "11">
                    <el-form-item label = "患者名字" prop = "patientName">
                        <el-input v-model = "regForm.patientName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span = "11">
                    <el-form-item label = "性别" prop = "gender">
                        <el-radio-group v-model = "regForm.gender">
                            <el-radio label = "1">男</el-radio>
                            <el-radio label = "0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span = "11">
                    <el-form-item label = "身份证号" prop = "identityCardNo">
                        <el-input v-model = "regForm.identityCardNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span = "11">
                    <el-form-item label = "出生日期" prop = "birthday">
                        <el-date-picker type = "date" placeholder = "选择日期" v-model = "regForm.birthday"
                                        style = "width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span = "11">
                    <el-form-item label = "家庭住址" prop = "familyAddress">
                        <el-input v-model = "regForm.familyAddress"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span = "11">
                    <el-form-item label = "就诊卡密码" prop = "passwd">
                        <el-input v-model = "regForm.passwd" show-password></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span = "11">
                    <el-form-item label = "挂号级别" prop = "registeredLevelID">
                        <el-select v-model = "regForm.registeredLevelID" clearable placeholder = "请选择">
                            <el-option>test</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span = "11">
                    <el-form-item label = "挂号科室" prop = "departmentID">
                        <el-select v-model = "regForm.departmentID" @change = "getDeptList" filterable
                                   filter-method = "deptSearchValuesFilter" clearable
                                   placeholder = "请选择">
                            <el-option
                                    v-for = "item in deptIDAndNameSearchValues"
                                    :label = "item.deptName"
                                    :value = "item.deptID">
                                <span>{{ item.deptName }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span = "11">
                    <el-form-item label = "看诊医生" prop = "doctorID">
                        <el-select v-model = "regForm.doctorID" clearable placeholder = "请选择">
                            <el-option>test</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span = "11">
                    <el-form-item label = "看诊时间" prop = "seeDoctorDate">
                        <el-date-picker type = "date" placeholder = "选择日期" v-model = "regForm.seeDoctorDate"
                                        style = "width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span = "11">
                    <el-form-item label = "挂号来源" prop = "regSourceID">
                        <el-select v-model = "regForm.regSourceID" clearable placeholder = "请选择">
                            <el-option>test</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span = "11">
                    <el-form-item label = "收费类别" prop = "payID">
                        <el-select v-model = "regForm.payID" clearable placeholder = "请选择">
                            <el-option>test</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-col :span = "11">
                    <el-form-item label = "挂号费用" prop = "expense">
                        <el-input v-model = "regForm.expense" clearable = "" placeholder = "请输入费用">
                            <template slot = "append">￥</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item align = "center">
                <el-button type = "primary" @click = "submitForm('regForm')">确认挂号</el-button>
                <el-button @click = "resetForm('regForm')">重置</el-button>
            </el-form-item>

        </el-form>
    </el-container>

</template>

<script>

  import {getDeptList} from '../../api/registerApi'

  export default {

    name: 'Register',

    data() {
      return {
        //挂号表单信息
        regForm: {
          //是否有就诊卡，1有 0无
          isHaveCard: '',

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

          //挂号级别ID
          registeredLevelID: '',
          //科室ID
          departmentID: '',
          //医生ID
          doctorID: '',
          //看诊时间
          seeDoctorDate: '',
          //挂号来源ID
          regSourceID: '',
          //收费类别ID
          payID: '',
          //费用
          expense: '',

        },

        //所有临床科室的ID和名称
        deptIDAndNameSearchValues: [],
        //存放入选择列表的临床科室名称或编号
        deptIDAndNameSearchOptions: [],

        rules: {
          isHaveCard: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          patientName: [
            {required: true, message: '请输入患者名字', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
          ],
          identityCardNo: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
          ],
          gender: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          birthday: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
          ],
          familyAddress: [
            {required: true, message: '请输入家庭住址', trigger: 'blur'},
          ],
          passwd: [
            {required: true, message: '请输入就诊卡密码', trigger: 'blur'},
            {min: 4, max: 4, message: '长度为 4 个字符', trigger: 'blur'},
          ],
          registeredLevelID: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          departmentID: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          doctorID: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          seeDoctorDate: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'},
          ],
          regSourceID: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          payID: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          expense: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
        },
      }
    },

    methods: {

      getDeptList() {
        getDeptList().then((res) => {
          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {
              this.deptIDAndNameSearchValues = data.data
            } else {
              alert(data.msg)
            }
          }
        })
      },

      deptSearchValuesFilter(val) {
        this.deptIDAndNameSearchOptions = val
            ? this.deptIDAndNameSearchValues.filter(this.createFilter(val))
            : this.deptIDAndNameSearchValues
      },

      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 ||
              item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
        }
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    },
    mounted() {
      this.getDeptList()
    },
  }
</script>

<style scoped>

</style>

