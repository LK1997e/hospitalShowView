<template>

    <el-container>

        <el-header style = "line-height: 60px;background:#a2a8d3;">
            <el-row type = "flex" align = "middle" style = "height: 60px;" class = "row-bg">
                <el-col style = "text-align: center;" span = "2" class = "grid-content">
                    <span style = "font-size:20px;color: white;">挂号列表</span>
                </el-col>
                <el-col :span = "2" offset = "18">今日工作量:</el-col>
                <el-col :span = "2">{{todayWorkload}}</el-col>
            </el-row>
        </el-header>


        <el-main style = "border: 1px solid #49cde5;">

            <el-row class = "row-bg show-shadow">
                <el-col :span = "11"
                        style = "padding-bottom: 10px;border-right: solid 1px #eee">
                    <el-divider content-position = "left">时间筛选</el-divider>
                    <el-col offset = "4">
                        <div class = "block">
                            <el-date-picker
                                    v-model = "timeRange"
                                    type = "daterange"
                                    value-format = "yyyy-MM-dd"
                                    align = "left"
                                    unlink-panels
                                    range-separator = "至"
                                    start-placeholder = "开始日期"
                                    end-placeholder = "结束日期"
                                    @change = "handleTimeChange"
                                    clearable = "true"
                                    :picker-options = "pickerOptions">
                            </el-date-picker>
                        </div>

                    </el-col>
                </el-col>

                <el-col :span = "11"
                        style = " padding-bottom: 10px;border-left: solid 1px #eee">
                    <el-divider content-position = "left">病历号查找</el-divider>
                    <el-col :span = "18" offset = "3">
                        <el-select style = "width: 100%" v-model = "medRecSearchValue"
                                   @click.native = "handleClick" @change = "handleMedRecNoChange" filterable
                                   :filter-method = "medRecNoFilter" clearable placeholder = "请选择">
                            <el-option
                                    v-for = "item in medRecNoList"
                                    :key = "item.medicalRecordNo"
                                    :label = "item.medicalRecordNo"
                                    :value = "item.medicalRecordNo">
                                <span style = "float: left">{{ item.medicalRecordNo }}</span>
                            </el-option>

                        </el-select>
                    </el-col>
                </el-col>

                <el-col :span = "2"
                        style = " padding-bottom: 10px;border-left: solid 1px #eee">
                    <el-divider content-position = "left">刷新</el-divider>
                    <el-col align = "center">
                        <el-button type = "primary" circle icon = "el-icon-refresh" style = "border: 0;"
                                   @click = "refresh"></el-button>

                    </el-col>
                </el-col>

            </el-row>

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

                        <el-table-column align = "center" width = "60px" label = "编号" prop = "id">
                        </el-table-column>
                        <el-table-column align = "center" width = "160px" label = "病历号" prop = "medicalRecordNo">
                        </el-table-column>
                        <el-table-column align = "center" label = "患者姓名" prop = "patientName">
                        </el-table-column>
                        <el-table-column align = "center" label = "挂号科室" prop = "deptName">
                        </el-table-column>
                        <el-table-column align = "center" label = "挂号级别" prop = "regLevel">
                        </el-table-column>
                        <el-table-column align = "center" width = "160px" label = "挂号时间" prop = "registrationDate">
                        </el-table-column>
                        <el-table-column align = "center" label = "是否已看诊">
                            <template slot-scope = "props">
                                {{props.row.isSeenDoctor==='1'?'是':(props.row.isSeenDoctor==='0'?'否':'')}}
                            </template>
                        </el-table-column>
                        <el-table-column align = "center" label = "挂号状态">
                            <template slot-scope = "props">
                                {{props.row.regStatus==='1'?'挂号':(props.row.regStatus==='0'?'退号':'')}}
                            </template>
                        </el-table-column>
                        <el-table-column align = "center" label = "挂号费用" prop = "expense">
                        </el-table-column>

                        <el-table-column align = "center" label = "操作">
                            <template slot-scope = "props">
                                <el-button icon = "el-icon-edit" @click = "confirm(props.row.id)"
                                           type = "text" size = "small"
                                           v-if = "props.row.isSeenDoctor === '0' && props.row.regStatus === '1'">
                                    退号
                                </el-button>
                                <el-button icon = "el-icon-edit" type = "text" size = "small" disabled = "true"
                                           v-else>
                                    退号
                                </el-button>
                            </template>
                        </el-table-column>

                    </el-table>

                    <hr>

                    <div class = "block" align = "center">

                        <el-pagination
                                @size-change = "handleSizeChange"
                                @current-change = "handleCurrentChange"
                                background
                                :current-page = "pageParams.pageNum"
                                :page-sizes = "[5, 10, 15, 20]"
                                :page-size = "pageParams.pageSize"
                                layout = "total, sizes, prev, pager, next, jumper"
                                :total = "pageParams.total">
                        </el-pagination>
                    </div>

                </el-container>
            </el-row>

        </el-main>

    </el-container>

</template>

<script>

  import {getRegInfo, getRegInfoList, getTodayWorkload, retreat} from '../../api/registerApi'

  export default {
    name: 'RegisterInfoList',

    data() {
      return {

        //今日工作量
        todayWorkload: '',
        //存放挂号信息列表
        regInfoList: [],

        //退号的对话框是否显示
        retreatDialogFormVisible: false,

        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },

        //输入的要查找的病历号
        medRecSearchValue: '',
        medRecNoList: [],
        medRecNoSearchList: '',

        //是否应该备份
        isShouldCopy: true,

        copy: {
          regInfoListCopy: [],
          pageNumCopy: '',
          pageSizeCopy: '',
          totalCopy: '',
        },

        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              },
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              },
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              },
            }],
        },
        timeRange: '',

      }
    },

    methods: {

      //获取挂号信息列表
      getRegInfoList() {

        let params = {
          start: this.timeRange[0],
          end: this.timeRange[1],
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

              if (this.isShouldCopy) {
                this.copyInfo()
                this.isShouldCopy = false
              }
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      },

      getRegInfo(val) {
        getRegInfo(val).then((res) => {
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
        this.regInfoList = [val]
      },

      copyInfo() {

        this.medRecNoList = this.regInfoList
        this.medRecNoSearchList = this.regInfoList
        this.copy.regInfoListCopy = this.regInfoList
        this.copy.pageNumCopy = this.pageParams.pageNum
        this.copy.pageSizeCopy = this.pageParams.pageSize
        this.copy.totalCopy = this.pageParams.total

      },

      returnCopyInfo() {

        this.regInfoList = this.copy.regInfoListCopy
        this.pageParams.pageNum = this.copy.pageNumCopy
        this.pageParams.pageSize = this.copy.pageSizeCopy
        this.pageParams.total = this.copy.totalCopy
      },

      handleClick() {

        this.timeRange = []
        this.medRecNoList = this.copy.regInfoListCopy
      },

      handleMedRecNoChange(val) {

        if (val === null || val === '') {
          this.isShouldCopy = true
          this.medRecNoList = []
          this.getRegInfoList()
        } else {
          this.getRegInfo(this.medRecSearchValue)

          this.isShouldCopy = true
          this.pageParams.total = 1
        }
      },

      //处理所选的时间范围改变
      handleTimeChange(val) {

        if (val === null || val === '') {
          this.refresh()
        } else {
          this.pageParams.pageNum = 1
          this.getRegInfoList()
        }
      },

      medRecNoFilter(val) {
        this.medRecNoList = val
            ? this.medRecNoSearchList.filter(this.createFilter(val))
            : this.medRecNoSearchList
      },
      createFilter(queryString) {
        return (item) => {
          return (item.medicalRecordNo.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
        }
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

      getTodayWorkload() {

        getTodayWorkload().then((res) => {

          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {
              this.todayWorkload = data.data
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      },

      //退号
      retreat(regInfoID) {
        retreat(regInfoID).then((res) => {
          if (res.status === 200) {
            let data = res.data
            if (data.status === 'OK') {
              this.$message({
                type: 'success',
                message: '退号成功!',
              })
              this.refresh()
            }
          } else {
            this.$message.error('退号失败!')
          }
        })
      },

      confirm(val) {

        this.$confirm('退号操作无法撤销, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.retreat(val)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退号',
          })
        })
      },

      refresh() {

        this.timeRange = []
        this.medRecSearchValue = ''
        this.isShouldCopy = true
        this.getRegInfoList()
      },

    },//method end

    mounted() {
      this.getRegInfoList()
      this.getTodayWorkload()
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
