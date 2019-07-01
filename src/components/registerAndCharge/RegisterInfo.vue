<template>

    <el-container>

        <el-header style = "line-height: 60px;background:#41cde5;">
            <el-row type = "flex" align = "middle" class = "row-bg">
                <el-col style = "text-align: center;" span = "2" class = "grid-content">
                    <span style = "font-size:20px;color: white;">挂号列表</span>
                </el-col>
            </el-row>
        </el-header>

        <el-main style = "border: 1px solid #49cde5;">

            <el-row class = "row show-shadow" style = "padding-bottom: 10px;">
                <el-container>
                    <el-header>
                        <el-divider content-position = "left">挂号列表</el-divider>
                    </el-header>
                    <el-table ref = "multipleTable"
                              :data = "regInfoList"
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

                        <el-table-column label = "编号" prop = "id">
                        </el-table-column>
                        <el-table-column label = "病历号" prop = "medRecID">
                        </el-table-column>
                        <el-table-column label = "患者姓名" prop = "patientName">
                        </el-table-column>
                        <el-table-column label = "挂号科室" prop = "deptName">
                        </el-table-column>
                        <el-table-column label = "挂号级别" prop = "regLevel">
                        </el-table-column>
                        <el-table-column label = "挂号日期" prop = "registrationDate">
                        </el-table-column>
                        <el-table-column label = "看诊日期" prop = "seeDoctorDate">
                        </el-table-column>
                        <el-table-column label = "是否已看诊" prop = "isSeenDoctor">
                        </el-table-column>
                        <el-table-column label = "挂号状态" prop = "regStatus">
                        </el-table-column>
                        <el-table-column label = "挂号费用" prop = "expense">
                        </el-table-column>

                    </el-table>
                </el-container>
            </el-row>

        </el-main>

    </el-container>

</template>

<script>

  import {getRegInfoList} from '../../api/registerApi'

  export default {
    name: 'RegisterInfo',

    data() {
      return {

        //存放挂号信息列表
        regInfoList: [],

        //挂号信息id
        id: '',
        //病历id
        medRecID: '',
        //患者姓名
        patientName: '',
        //挂号科室
        deptName: '',
        //挂号级别
        regLevel: '',
        //挂号日期
        registrationDate: '',
        //看诊日期
        seeDoctorDate: '',
        //是否已看诊
        isSeenDoctor: '',
        //挂号状态
        regStatus: '',
        //挂号费用
        expense: '',

        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },

      }
    },

    methods: {

      //获取挂号信息列表
      getRegInfoList() {

        let params = {
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize,
        }

        getRegInfoList(params).then((res) => {

          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {

              this.regInfoList = data.data.list
              this.pageParams.pages = data.data.pages
              this.pageParams.total = data.data.total
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      },

      //处理页大小改变
      handleSizeChange(val) {
        this.pageParams.pageSize = val
        this.getRegInfoList()
      },
      //处理当前页改变
      handleCurrentChange(val) {
        this.pageParams.pageNum = val
        this.getRegInfoList()
      },

    },
    mounted() {
      this.getRegInfoList()
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
