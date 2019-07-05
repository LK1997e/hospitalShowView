<template>
  <el-container>
    <el-header style="background:#a2a8d3;">
      <el-row class="row-bg">
        <el-col span="4" class="grid-content">
          <span style="font-size:20px;color: white;">科室工作量统计图表</span>
        </el-col>

      </el-row>

    </el-header>
    <el-main style="border: 1px solid #49cde5;">

      <section class="chart-container">
        <el-row>
          <el-col :span="12">
            <div id="chartColumn" style="width:100%; height:600px;"></div>
          </el-col>
          <el-col :span="12">
            <div id="chartBar" style="width:100%; height:600px;"></div>
          </el-col>
        </el-row>
      </section>
    </el-main>
  </el-container>
</template>

<script>
  import echarts from 'echarts';
  import {
    departmentWorkCharts,
  } from '../../api/workloadStatisticsApi';

  export default {
    data() {
      return {

        //存放工作量列表
        workloadStatisticsList: [],
        num:'',
        name:[],
        sumfee:[],
        seriesdata:[],

        chartColumn: null,
        chartBar: null,
        chartLine: null,
        chartPie: null
      }
    },

    methods: {

      //获得工作量列表
      getworkloadStatisticsList(){
        departmentWorkCharts().then((res) =>{
          if (res.status === 200) {
            let data = res.data;
            if (data.status === 'OK') {
              this.workloadStatisticsList = data.data;
              let i = 0;
              this.workloadStatisticsList.forEach((item) => {
                i++;
                this.name.push( item.deptName);
                this.sumfee.push(item.sumfee);

              });
              this.num = i;

              this.drawCharts();

            } else {
              alert(data.msg);
            }
          }
        });
      },

      drawColumnChart() {
        // alert(this.num);
        for(let i=0;i<this.num;i++){
          this.seriesdata.push({
            name:this.name[i],
            value:this.sumfee[i],
          })
        }
        this.chartColumn = echarts.init(document.getElementById('chartColumn'));
        this.chartColumn.setOption({

          title: {
            text: '科室工作量统计饼状图',
            // subtext: '虚构数据',
            left: 'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
          },
          series :
            [
            {
              type: 'pie',
              radius : '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',

              data:this.seriesdata,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]

        });
      },
      drawBarChart() {
        this.chartBar = echarts.init(document.getElementById('chartBar'));
        this.chartBar.setOption({
          title: {
            text: '科室工作量统计柱状图',
            left: 'center'
          },
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.name,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'总费用',
              type:'bar',
              barWidth: '60%',
              data:this.sumfee
            }
          ]
        });
      },

      drawCharts() {
        this.drawColumnChart();
        this.drawBarChart();
      },

      // themount(){
      //   this.getworkloadStatisticsList();
      //   this.drawCharts();
      // },
    },


    mounted: function () {
        this.getworkloadStatisticsList();
    },
    updated: function () {
      this.drawCharts()
    }
  }
</script>

<style scoped>
  /*.chart-container {*/
  /*  width: 100%;*/
  /*  float: left;*/
  /*}*/
  /*!*.chart div {*/
  /*    height: 400px;*/
  /*    float: left;*/
  /*}*!*/

  /*.el-col {*/
  /*  padding: 30px 20px;*/
  /*}*/
</style>

