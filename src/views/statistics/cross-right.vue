<template>
  <div class="cross-box">

    <div class="content">
      <div class='tab-top'>
        <div class="top-left">
          <span>违停量分析</span>
          <el-date-picker class="month-item" v-model="time"  @change="timeChange" type="month" size="mini" placeholder="选择月">
          </el-date-picker>
        </div>
        <div class="top-right">
          <img src="../../assets/images/tabIcon.png" @click="handShow">
          <img src="../../assets/images/pieIcon.png" @click="handHide">
          <img src="../../assets/images/breakIcon.png"  @click="breakTime">
        </div>
      </div>
      <div class="table-item">
        <el-table
          v-if="!show"
          :data="list"
          class="tab-list"
          :header-cell-style="headerStyle"
          :cell-style="cellStyle">
          <el-table-column
            prop="source"
            width="120px"
            label="单车名称">
          </el-table-column>
          <el-table-column label="日均违停次数"  align="center">
            <template slot-scope="scope">{{ scope.row.region }}</template>
          </el-table-column>
        </el-table>
        <div class="table-echart">
          <pie-echart :pieData="pieData" :legendData="typeName" v-if="show"></pie-echart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieEchart from '@/components/pie-echart'
import {statistic} from "@/api/statistic"
export default {
  props:{
    botData:{
      default:()=>[],
      type:Array
    }
  },
  data(){
    return {
      list:[],
      pieData:{},
      typeName:[],
      show:true,
      time:new Date(),
      headerStyle:{
        'background-color': '#091946',
        'color': '#0261d5',
        'border-bottom': 'none',
        'font-size':"14px"
      },
      cellStyle:{
        'background-color': '#020f23',
      }
    }
  },
  components: {
    PieEchart
  },
  methods:{
    changeTimeDate(end){
      let color=['#18e855','#f9951c','#3f73ff']
      let time = this.formatDate(end);
      statistic('2',time,time).then(res=>{
        if(res.data.length){
          this.list = res.data[0].sources
          this.pieData = this.list.map((v,i)=>{
            this.typeName.push(v.source)
            return {
              value:v.region,
              name:v.source,
              itemStyle:{color:color[i]}
            }
          })
        }else{
          this.list=[]
          this.pieData=[];
        }
      })
    },
    breakTime(){
      this.list=[]
      this.pieData=[];
      this.changeTimeDate(this.time)
    },
    timeChange(val){
      this.changeTimeDate(val)
    },
    formatDate(timestamp) {
      var date = new Date(timestamp);
      let Y = date.getFullYear();
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
      return `${Y}${M}`;
    },
    handShow(){
      this.show=false
    },
    handHide(){
      this.show=true
    },
    init(){
      let color=['#18e855','#f9951c','#3f73ff']
      if(this.botData.length){
        this.list = this.botData[0].sources
        this.pieData = this.list.map((v,i)=>{
          this.typeName.push(v.source)
          return {
            value:v.region,
            name:v.source,
            itemStyle:{color:color[i]}
          }
        })
      }else{
        this.list=[]
        this.pieData=[];
      }
    }
  },
  watch:{
    botData(newVal){
      this.init()
    },
  },
  mounted(){
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import "./style/index";
.table-echart{
  position: absolute;
  top: 0;
  left: 40px;
  width: 500px;
  height: 350px;
}
</style>

