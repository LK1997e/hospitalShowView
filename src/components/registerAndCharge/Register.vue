<template>
    <el-container>

        <el-header style = "line-height: 60px;background:#41cde5;">
            <el-row type = "flex" align = "middle" class = "row-bg">
                <el-col style = "text-align: center;" span = "2" class = "grid-content">
                    <span style = "font-size:20px;color: white;">挂号</span>
                </el-col>
            </el-row>
        </el-header>

        <el-main style = "border: 1px solid #49cde5;">


            <el-form :model = "regForm" :rules = "rules" ref = "regForm" label-position = "left" label-width = "100px"
                     class = "regForm">

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item label = "就诊卡" prop = "isHaveCard">
                            <el-radio-group v-model = "regForm.isHaveCard">
                                <el-radio label = "1">有</el-radio>
                                <el-radio label = "0">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item label = "患者名字" prop = "patientName">
                            <el-input v-model = "regForm.patientName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "8">
                        <el-form-item label = "性别" prop = "gender">
                            <el-radio-group v-model = "regForm.gender">
                                <el-radio label = "1">男</el-radio>
                                <el-radio label = "0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item label = "身份证号" prop = "identityCardNo">
                            <el-input v-model = "regForm.identityCardNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "8">
                        <el-form-item label = "出生日期" prop = "birthday">
                            <el-date-picker v-model = "regForm.birthday" value-format = "yyyy-MM-dd"
                                            placeholder = "选择日期" style = "width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item label = "家庭住址" prop = "familyAddress">
                            <el-input v-model = "regForm.familyAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "8">
                        <el-form-item label = "就诊卡密码" prop = "passwd">
                            <el-input v-model = "regForm.passwd" show-password></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item ref = "deptID" label = "挂号科室" prop = "departmentID">
                            <el-select style = "width: 100%" v-model = "regForm.departmentID"
                                       @click.native = "getDeptList"
                                       @change = "handlerChange" filterable
                                       :filter-method = "deptSearchValuesFilter"
                                       clearable placeholder = "请选择">
                                <el-option
                                        v-for = "item in deptIDAndNameSearchOptions"
                                        :key = "item.id"
                                        :label = "item.name"
                                        :value = "item.id">
                                    <span style = "float: left">{{ item.name }}</span>
                                    <span style = "float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col ref = "regLevelID" :span = "8">
                        <el-form-item label = "挂号级别" prop = "registeredLevelID">
                            <el-select style = "width: 100%" v-model = "regForm.registeredLevelID"
                                       @click.native = "getRegLevelList"
                                       @change = "handlerChange" filterable
                                       :filter-method = "regLevelSearchValuesFilter"
                                       clearable placeholder = "请选择">
                                <el-option
                                        v-for = "item in regLevelSearchOptions"
                                        :key = "item.id"
                                        :label = "item.name"
                                        :value = "item.id">
                                    <span style = "float: left">{{ item.name }}</span>
                                    <span style = "float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item ref = "seeDoctorDate" label = "看诊时间" prop = "seeDoctorDate">
                            <el-date-picker style = "width: 100%;" v-model = "regForm.seeDoctorDate"
                                            value-format = "yyyy-MM-dd"
                                            @change = "handlerChange" placeholder = "选择日期"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "8">
                        <el-form-item label = "看诊医生" prop = "doctorID">
                            <el-select style = "width: 100%" v-model = "regForm.doctorID"
                                       @click.native = "getOnDutyDoctor" filterable
                                       :filter-method = "doctorSearchValuesFilter"
                                       clearable placeholder = "请选择">
                                <el-option
                                        v-for = "item in onDutyDoctorOptions"
                                        :key = "item.id"
                                        :label = "item.name"
                                        :value = "item.id">
                                    <span>{{ item.name }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item label = "挂号来源" prop = "registrationSourceID">
                            <el-select style = "width: 100%" v-model = "regForm.registrationSourceID"
                                       @click.native = "getRegSource"
                                       filterable
                                       :filter-method = "regSourceFilter" clearable placeholder = "请选择">
                                <el-option
                                        v-for = "item in regSourceOptions"
                                        :key = "item.id"
                                        :label = "item.name"
                                        :value = "item.id">
                                    <span style = "float: left">{{ item.name }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span = "8">
                        <el-form-item label = "收费类别" prop = "payID">
                            <el-select style = "width: 100%" v-model = "regForm.payID" @click.native = "getPayCategory"
                                       filterable :filter-method = "payCategoryFilter" clearable placeholder = "请选择">
                                <el-option
                                        v-for = "item in payCategoryOptions"
                                        :key = "item.id"
                                        :label = "item.name"
                                        :value = "item.id">
                                    <span style = "float: left">{{ item.name }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter = "20">
                    <el-col :span = "8">
                        <el-form-item label = "挂号费用" prop = "expense">
                            <el-input :disabled = "true" v-model = "regForm.expense" clearable placeholder = "挂号费用">
                                <template slot = "append">￥</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-col :span = "8">
                        <el-form-item align = "right">
                            <el-button ref = "submit" type = "primary" @click = "submitForm('regForm')">确认挂号</el-button>
                            <el-button @click = "resetForm('regForm')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-form>

        </el-main>


    </el-container>

</template>

<style>


</style>

<script>

  import {
    calculateRegFee,
    getDeptList,
    getDoctor,
    getPayCategory,
    getRegLevelList,
    getRegSource,
    register,
  } from '../../api/registerApi'

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
          //看诊时间
          seeDoctorDate: '',
          //医生ID
          doctorID: '',
          //挂号来源ID
          registrationSourceID: '',
          //收费类别ID
          payID: '',
          //费用
          expense: 0,

        },

        //所有临床科室的ID和名称
        deptIDAndNameSearchValues: [],
        //存放入选择列表的临床科室名称或编号
        deptIDAndNameSearchOptions: [],

        //所有挂号级别
        regLevelSearchValues: [],
        regLevelSearchOptions: [],

        //符合所选科室和日期的排班医生
        onDutyDoctorValues: [],
        onDutyDoctorOptions: [],

        //存放挂号来源
        regSourceValues: [],
        regSourceOptions: [],

        //存放收费类别
        payCategoryValues: [],
        payCategoryOptions: [],

        rules: {
          isHaveCard: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
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
          registeredLevelID: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          departmentID: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          seeDoctorDate: [
            {required: true, message: '请选择日期', trigger: 'change'},
          ],
          doctorID: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          registrationSourceID: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          payID: [
            {required: true, message: '请选择', trigger: 'change'},
          ],
          expense: [
            {required: true, message: '请计算挂号费用'},
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
              this.deptIDAndNameSearchOptions = data.data
            } else {
              alert(data.msg)
            }
          }
        })
      },

      getRegLevelList() {
        getRegLevelList().then((res) => {
          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {
              this.regLevelSearchValues = data.data
              this.regLevelSearchOptions = data.data
            } else {
              alert(data.msg)
            }
          }
        })
      },

      handlerChange() {
        this.regForm.doctorID = ''
        this.onDutyDoctorValues = []
        this.onDutyDoctorOptions = []
      },

      getOnDutyDoctor() {

        let params = {
          levelNameID: this.regForm.registeredLevelID,
          deptID: this.regForm.departmentID,
          date: this.regForm.seeDoctorDate,
        }
        if (params.deptID == null || params.deptID === '') {
          //挂号科室不能为空
          this.regForm.deptID = null
        } else if (params.levelNameID === null || params.levelNameID === '') {
          //挂号级别不能为空
          this.regForm.registeredLevelID = null
        } else if (params.date == null || params.date === '') {
          //看诊时间不能为空
          this.regForm.date = null
        } else {
          getDoctor(params).then((res) => {
            if (res.status === 200) {
              let data = res.data
              if (data.status === 'OK') {
                this.onDutyDoctorValues = data.data
                this.onDutyDoctorOptions = data.data
              } else {
                alert(data.msg)
              }
            }
          })
        }
      },

      getRegSource() {
        getRegSource().then((res) => {
          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {
              this.regSourceValues = data.data
              this.regSourceOptions = data.data
            } else {
              alert(data.msg)
            }
          }
        })
      },

      getPayCategory() {

        getPayCategory().then((res) => {
          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {
              this.payCategoryValues = data.data
              this.payCategoryOptions = data.data
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

      regLevelSearchValuesFilter(val) {
        this.regLevelSearchOptions = val
            ? this.regLevelSearchValues.filter(this.createFilter(val))
            : this.regLevelSearchValues
      },

      doctorSearchValuesFilter(val) {
        this.onDutyDoctorOptions = val
            ? this.onDutyDoctorValues.filter(this.createFilter(val))
            : this.onDutyDoctorValues
      },

      regSourceFilter(val) {
        this.regSourceOptions = val
            ? this.regSourceValues.filter(this.createFilter(val))
            : this.regSourceValues
      },

      payCategoryFilter(val) {
        this.payCategoryOptions = val
            ? this.payCategoryValues.filter(this.createFilter(val))
            : this.payCategoryValues
      },

      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 ||
              item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
        }
      },

      register() {
        let params = {
          regLevelID: this.regForm.registeredLevelID,
          payCategoryID: this.regForm.payID,
        }
        calculateRegFee(params).then((res) => {
          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {
              this.regForm.expense = data.data

              this.submit(data.data)

            } else {
              alert(data.msg)
            }
          }
        })
      },

      submit(expense) {

        register(
            this.regForm.isHaveCard,
            this.regForm.patientName,
            this.regForm.identityCardNo,
            this.regForm.gender,
            this.regForm.birthday,
            this.regForm.familyAddress,
            this.regForm.passwd,
            this.regForm.registeredLevelID,
            this.regForm.departmentID,
            this.regForm.doctorID,
            this.regForm.seeDoctorDate,
            this.regForm.registrationSourceID,
            this.regForm.payID,
            expense,
        ).then((res) => {
          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {

              this.$notify({
                title: '成功',
                message: '挂号成功！费用为: ' + expense + '￥',
                type: 'success',
                showClose: false,
              })

            } else {
              this.$notify({
                title: '失败',
                message: data.msg,
              })
            }
          }
        })
      },

      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.register()

          } else {
            console.log('error submit!!')
          }
        })
      },
      resetForm(formName) {
        this.onDutyDoctorValues = []
        this.onDutyDoctorOptions = []
        this.$refs[formName].resetFields()
      },
    },
    mounted() {
      this.getDeptList()
      this.getRegLevelList()
      this.getRegSource()
      this.getPayCategory()
    },
  }
</script>

<style scoped>

</style>

