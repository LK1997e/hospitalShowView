<template>

    <el-container>

        <el-header style = "line-height: 60px;background:#41cde5;">
            <el-row type = "flex" align = "middle" style = "height: 60px;" class = "row-bg">
                <el-col style = "text-align: center;" span = "3" class = "grid-content">
                    <span style = "font-size:20px;color: white;">就诊卡管理</span>
                </el-col>
            </el-row>
        </el-header>

        <el-main style = "border: 1px solid #49cde5;">

            <el-row class = "row-bg show-shadow">

                <el-col :span = "24"
                        style = " padding-bottom: 10px;border-left: solid 1px #eee">
                    <el-divider content-position = "left">就诊卡查找</el-divider>
                    <el-col :span = "18" offset = "3">
                        <!--<el-input v-model="medRecSearchValue" placeholder="请输入内容"></el-input>-->
                        <el-select style = "width: 100%" v-model = "patientCardIDSearchValue"
                                   @click.native = "handleClick" @change = "handleChange" filterable
                                   :filter-method = "patientCardIDFilter" clearable placeholder = "请选择">
                            <el-option
                                    v-for = "item in patientCardIDList"
                                    :key = "item.id"
                                    :label = "item.id"
                                    :value = "item.id">
                                <span style = "float: left">{{ item.id }}</span>
                            </el-option>

                        </el-select>
                    </el-col>
                </el-col>

            </el-row>

            <el-row class = "row show-shadow" style = "padding-bottom: 10px;">

                <el-container>

                    <el-header>
                        <el-divider content-position = "left">就诊卡列表</el-divider>
                    </el-header>

                    <el-table ref = "multipleTable"
                              :data = "patientCardList"
                              style = "width: 100%">


                        <el-table-column type = "expand">
                            <template slot-scope = "props">
                                <el-form label-position = "left" inline class = "demo-table-expand">
                                    <el-form-item label = "创建时间">
                                        <span>{{ props.row.appearDate }}</span>
                                    </el-form-item>
                                    <el-form-item label = "创建人">
                                        <span>{{ props.row.appearUser}}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>

                        <el-table-column align = "center" label = "编号" prop = "id">
                        </el-table-column>
                        <el-table-column align = "center" label = "用户名字" prop = "patientName">
                        </el-table-column>
                        <el-table-column align = "center" label = "余额" prop = "money">
                        </el-table-column>

                        <el-table-column align = "center" label = "操作">
                            <template slot-scope = "props">
                                <el-button icon = "el-icon-edit" @click = "handleRecharge(props.row.id)"
                                           type = "text" size = "small">
                                    充值
                                </el-button>
                            </template>
                        </el-table-column>

                    </el-table>

                    <el-dialog title = "充值" :visible.sync = "rechargeDialogVisible" width = "30%">
                        <el-form :model = "rechargeForm" :rules = "rules" ref = "rechargeForm" label-width = "120px"
                                 class = "demo-ruleForm">

                            <el-form-item label = "卡的编号" prop = "cardID">
                                <el-input v-model = "cardID" :disabled = "true" style = "width: 240px"></el-input>
                            </el-form-item>

                            <el-form-item label = "充值金额" prop = "recharge">
                                <el-input type = "number" v-model = "rechargeForm.recharge"
                                          style = "width: 240px" clearable>
                                    <template slot = "append">￥</template>
                                </el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type = "primary" @click = "submitRecharge('rechargeForm')">立即充值</el-button>
                                <el-button @click = "resetForm('rechargeForm')">重置</el-button>
                            </el-form-item>

                        </el-form>
                    </el-dialog>

                </el-container>

            </el-row>


        </el-main>

    </el-container>

</template>

<script>
  import {getPatientCard, getPatientCardList, recharge} from '../../api/patientCard'

  export default {
    name: 'PatientCardManage',

    data() {

      return {

        //存放就诊卡列表
        patientCardList: [],

        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },

        //输入的要查找就诊卡id
        patientCardIDSearchValue: '',
        //就诊卡id列表
        patientCardIDList: '',
        patientCardIDSearchList: '',

        copy: {
          patientCardListCopy: [],
          pageNumCopy: '',
          pageSizeCopy: '',
        },

        //是否应该备份
        isShouldCopy: true,

        rechargeForm: {
          recharge: '',
        },
        cardID: '',
        rechargeDialogVisible: false,

        rules: {
          recharge: [
            {required: true, message: '请输入数字', trigger: 'blur'},
          ],
        },
      }
    },

    methods: {

      getPatientCardList() {

        let params = {
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize,
        }
        getPatientCardList(params).then((res) => {
          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {

              this.patientCardList = data.data.list
              this.pageParams.pages = data.data.pages
              this.pageParams.total = data.data.total

              if (this.isShouldCopy) {
                this.copyInfo()
                this.isShouldCopy = false
              }

            } else {
              this.$message.error(data.msg)
            }
          }
        })
      },

      getPatientCard(val) {
        getPatientCard(val).then((res) => {

          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {
              this.fresh(data.data)
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      },

      fresh(val) {
        this.patientCardList = [val]
      },

      copyInfo() {

        this.patientCardIDList = this.patientCardList

        this.copy.patientCardListCopy = this.patientCardList
        this.copy.pageNumCopy = this.pageNum
        this.copy.pageSizeCopy = this.pageSize

      },

      returnCopyInfo() {

        this.patientCardList = this.copy.patientCardListCopy
        this.pageNum = this.copy.pageNumCopy
        this.pageSize = this.copy.pageSizeCopy
      },

      patientCardIDFilter(val) {
        this.patientCardIDList = val
            ? this.patientCardIDSearchList.filter(this.createFilter(val))
            : this.patientCardIDSearchList

      },

      createFilter(queryString) {
        return (item) => {
          return (item.id.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
        }
      },

      handleClick() {

        this.patientCardIDList = this.copy.patientCardListCopy
      },

      handleChange(val) {

        if (val === '' || val === '') {
          this.returnCopyInfo()
        } else {
          this.getPatientCard(this.patientCardIDSearchValue)
        }
      },

      handleRecharge(val) {
        this.cardID = val
        this.rechargeForm.recharge = ''
        this.rechargeDialogVisible = true
      },

      submitRecharge(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('将为编号 ' + this.cardID + ' 的就诊卡充值 ' + this.rechargeForm.recharge + ' ￥，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true,
            }).then(_ => {

              let params = {

                id: this.cardID,
                money: this.rechargeForm.recharge,
              }

              recharge(params).then((res) => {
                if (res.status === 200) {
                  let data = res.data
                  if (data.status === 'OK') {
                    this.$message({
                      message: data.msg,
                      type: 'success',
                    })
                    this.rechargeDialogVisible = false
                    this.isShouldCopy = true
                    this.getPatientCardList()
                  } else if (data.status === 'FALSE') {
                    this.$message({
                      message: data.msg,
                      type: 'warning',
                    })
                  } else {
                    this.$message.error(data.msg)
                  }
                }
              })

            })
          } else {
            console.log('error submit!!')
          }
        })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    },

    mounted() {
      this.getPatientCardList()
    },
  }
</script>

<style>
    .el-col-display {
        float: left;
        margin-left: 46px;
        margin-top: 6px;
        height: 40px
    }

    .el-row {
        margin-bottom: 10px;
    }

    .show-shadow {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .row-bg {
        padding: 10px 0;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
