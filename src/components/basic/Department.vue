<template>
  <el-container>
    <el-header style="background:#41cde5;">
      <el-row style = "align:center;top: 17px;" class="row-bg">
        <el-col span="2" class="grid-content">
          <span style="font-size:20px;color: white;">科室管理</span>
        </el-col>
        <el-col class="grid-content" span="2" offset="16">
          <el-select v-model="searchValue" @change="deptSearchChange"
                     filterable :filter-method="deptSearchValuesFilter" clearable placeholder="请输入科室名称">
            <el-option
              v-for="item in deptSearchOptions"
              :key="item.code"
              :label="item.name"
              :value="item.name">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
            </el-option>
          </el-select>
        </el-col>

      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <el-row class="row-bg show-shadow">


        <el-col span="12"
                style="padding-bottom: 10px;border-right: solid 1px #eee">
          <el-divider content-position="left">筛选查询</el-divider>
          <el-col span="2" class="el-col-display">科室分类</el-col>
          <el-select style="float: left;margin-left: 8px" @change="handleDeptTypeOrDeptCategoryChange"
                     v-model="listParam.deptCategoryID" filterable :filter-method="deptCategorySearchValuesFilter"
                     clearable placeholder="请选择">
            <el-option
              v-for="item in deptCategoryOptions"
              :key="item.code"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
            </el-option>
          </el-select>
          <el-col span="2" class="el-col-display">科室类型</el-col>
          <el-select style="float: left;margin-left: 8px" @change="handleDeptTypeOrDeptCategoryChange"
                     v-model="listParam.typeID" filterable :filter-method="deptTypeSearchValuesFilter" clearable
                     placeholder="请选择">
            <el-option
              v-for="item in deptTypeOptions"
              :key="item.code"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
            </el-option>
          </el-select>
        </el-col>


        <el-col span="12"
                style=" padding-bottom: 10px;border-left: solid 1px #eee">
          <el-divider content-position="left">管理操作</el-divider>
          <el-col span="4" class="el-col-display">
            <el-link icon="el-icon-circle-plus" style="font-size: 16px;color: #11b95c">添加</el-link>
          </el-col>
          <el-col span="4" class="el-col-display">
            <el-link icon="el-icon-upload" style="font-size: 16px;color: #50bfff">导入</el-link>
          </el-col>
          <el-col span="4" class="el-col-display">
            <el-link icon="el-icon-download" style="font-size: 16px;color: darkkhaki">导出</el-link>
          </el-col>
          <el-col span="4" class="el-col-display">
            <el-link icon="el-icon-delete-solid" style="font-size: 16px;color: #e64242">批量删除</el-link>
          </el-col>


        </el-col>

      </el-row>
      <el-row class="row show-shadow"
              style="padding-bottom: 10px;">
        <el-container>
          <el-header>
            <el-divider content-position="left">科室列表</el-divider>
          </el-header>
          <el-table
            ref="multipleTable"
            :data="departmentList"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="创建时间">
                    <span>{{ props.row.appearDate }}</span>
                  </el-form-item>
                  <el-form-item label="创建人">
                    <span>{{ props.row.appearUserName }}</span>
                  </el-form-item>
                  <el-form-item label="修改时间">
                    <span>{{ props.row.changeDate }}</span>
                  </el-form-item>
                  <el-form-item label="修改人">
                    <span>{{ props.row.changeUserName }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column type="selection" prop="id">

            </el-table-column>
            <el-table-column label="编号" prop="id">
            </el-table-column>
            <el-table-column label="科室编码" prop="deptCode">
            </el-table-column>
            <el-table-column label="科室名称" prop="deptName">
            </el-table-column>
            <el-table-column label="科室分类" prop="deptType">
            </el-table-column>
            <el-table-column label="科室类别" prop="deptCategory">
            </el-table-column>
            <el-table-column label="操作1">
              <template slot-scope="props">
                <el-button icon="el-icon-edit" @click.native.prevent="handleEdit(props.row.id)" type="text"
                           size="small">
                  编辑
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作2">
              <template slot-scope="props">
                <el-button icon="el-icon-delete" @click.native.prevent="handleDelete(props.row.id)" type="text"
                           size="small" style="color: #e64242">
                  移除
                </el-button>
              </template>
            </el-table-column>


          </el-table>
          <hr>

          <div class="block">

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              :current-page="pageParams.pageNum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageParams.total">
            </el-pagination>
          </div>


        </el-container>


      </el-row>

    </el-main>

  </el-container>
</template>

<style>
  .el-col-display {
    float: left;
    margin-left: 46px;
    margin-top: 6px;
    height: 40px
  }


  .show-shadow {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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

<script>
  import {
    departmentGetList,
    deptGetALLNamesAndCodes,
    deptCategoryGetALLNamesAndCodes,
    deptTypeGetALLNamesAndCodes,
    deptGetByNameOrCode
  } from '../../api/departmentApi';
  import Qs from 'qs';

  export default {
    name: "Department",
    data() {
      return {
        //所有科室的名称或编号
        deptSearchValues: [],
        //存放入选择列表的科室名称或编号
        deptSearchOptions: [],
        //所有科室分类的名称或编号
        deptCategoryValues: [],
        //存放入选择列表的科室分类名称或编号
        deptCategoryOptions: [],
        //所有科室类型的名称或编号
        deptTypeValues: [],
        //存放入选择列表的科室分类名称或编号
        deptTypeOptions: [],


        listParam: {
          //选择的科室分类id
          deptCategoryID: '',
          //选择的科室类别id
          typeID: ''

        },
        pageParams: {
          //第几页
          pageNum: 1,
          //页大小
          pageSize: 5,
          //总条数
          total: 0,
        },
        //存放科室列表
        departmentList: [],
        //copy部分
        copy: {
          departmentListCopy: [],
          pageNumCopy: '',
          totalCopy: '',
          //复制的科室分类id
          deptCategoryIDCopy: '',
          //复制的科室类别id
          typeIDCopy: ''

        },

        //科室搜索的名称或编号
        searchValue: '',
        //选中的科室id
        checkList: []


      }

    },
    methods: {
      //获得所有科室列表
      getDepartmentList() {
        let params = {
          deptCategoryID: this.listParam.deptCategoryID,
          typeID: this.listParam.typeID,
          pageNum: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize
        };
        departmentGetList(params).then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.departmentList = data.data.list;
              this.pageParams.pages = data.data.pages;
              this.pageParams.total = data.data.total;
              this.copyInfo();
            } else {
              alert(data.msg);
            }
          }
        });
      },
      //复制信息
      copyInfo() {
        this.copy.departmentListCopy = this.departmentList;
        this.copy.pageNumCopy = this.pageParams.pageNum;
        this.copy.totalCopy = this.pageParams.total;
        this.copy.deptCategoryIDCopy = this.listParam.deptCategoryID;
        this.copy.typeIDCopy = this.listParam.typeID;
      },
      //返回复制信息
      returnCopyInfo() {
        this.departmentList = this.copy.departmentListCopy;
        this.pageParams.pageNum = this.copy.pageNumCopy;
        this.pageParams.total = this.copy.totalCopy;
        this.listParam.deptCategoryID = this.copy.deptCategoryIDCopy;
        this.listParam.typeID = this.copy.typeIDCopy;
      },
      //获得所有科室名称和编号
      getAllDeptNamesAndCodes() {
        deptGetALLNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.deptSearchValues = data.data;
              this.deptSearchOptions = data.data;
            } else {
              alert(data.msg);
            }
          }

        });
      },
      //获得所有科室类型名称和编号
      getAllDeptTypeNamesAndCodes() {
        deptTypeGetALLNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.deptTypeValues = data.data;
              this.deptTypeOptions = data.data;
            } else {
              alert(data.msg);
            }
          }

        });
      },
      //获得所有科室分类名称和编号
      getAllDeptCategoryNamesAndCodes() {
        deptCategoryGetALLNamesAndCodes().then((res) => {
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.deptCategoryValues = data.data;
              this.deptCategoryOptions = data.data;
            } else {
              alert(data.msg);
            }
          } else {
            alert('error');
          }

        });
      },

      deptSearchValuesFilter(val) {
        this.deptSearchOptions = val ? this.deptSearchValues.filter(this.createFilter(val)) : this.deptSearchValues;
      },
      deptTypeSearchValuesFilter(val) {
        this.deptTypeOptions = val ? this.deptTypeValues.filter(this.createFilter(val)) : this.deptTypeValues;
        alert(this.deptTypeOptions.length);
      },
      deptCategorySearchValuesFilter(val) {
        this.deptCategoryOptions = val ? this.deptCategoryValues.filter(this.createFilter(val)) : this.deptCategoryValues;
      },

      createFilter(queryString) {
        return (item) => {
          return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
//根据名称或编号查找科室信息
      deptSearchChange(val) {
        if (val === '') {
          this.returnCopyInfo();
        } else {
          this.copyInfo();
          this.listParam.typeID = '';
          this.listParam.deptCategoryID = '';
          this.pageParams.pageNum = 1;
          let params = {
            nameOrCode: this.searchValue,
            pageNum: this.pageParams.pageNum,
            pageSize: this.pageParams.pageSize
          };
          deptGetByNameOrCode(params).then((res) => {
              if (res.status === 200) {
                let data = res.data;
                if (data.status === 'OK') {
                  this.departmentList = data.data.list;
                  this.pageParams.pages = data.data.pages;
                  this.pageParams.total = data.data.total;
                } else {
                  alert(data.msg);
                }
              }
            }
          );

        }


      },
      handleSelectionChange(items) {
        this.checkList = [];
        items.forEach((item) => {
          this.checkList.push({"id": item.id});
        });
      },
      handleSizeChange(val) {
        this.pageParams.pageSize=val;
        this.getDepartmentList();
      },
      handleCurrentChange(val) {
        this.pageParams.pageNum=val;
        this.getDepartmentList();
      },
      handleDeptTypeOrDeptCategoryChange(){
        this.pageParams.pageNum=1;
        this.getDepartmentList();
      }
    },
    mounted() {
      this.getDepartmentList();
      this.getAllDeptNamesAndCodes();
      this.getAllDeptTypeNamesAndCodes();
      this.getAllDeptCategoryNamesAndCodes();
    }


  }
</script>


