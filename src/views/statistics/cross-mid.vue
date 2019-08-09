<template>
  <div class="cross-box">
    <div class="content">
      <div class='tab-top'>
        <div class="top-left">
          <span>活跃度分析</span>
          <el-date-picker class="month-item" v-model="time" type="month" @change="timeChange" size="mini" placeholder="选择月">
          </el-date-picker>
        </div>
        <div class="top-right">
          <img src="../../assets/images/tabIcon.png" @click="handShow">
          <img src="../../assets/images/barIcon.png" @click="handHide">
          <img src="../../assets/images/breakIcon.png" @click="breakTime">
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
          <el-table-column label="日均骑行次数" align="center">
            <template slot-scope="scope">{{ scope.row.count.toFixed(3) }}</template>
          </el-table-column>
          <el-table-column label="日均骑行里程数" align="center">
            <template slot-scope="scope">{{ scope.row.distance.toFixed(3) }}</template>
          </el-table-column>
        </el-table>
        <div class="table-echart">
          <bar-echart :barDate='barDate' :xAxis="xAxis" :yAxis="yAxis" :legendData="types"  v-if="barDate.name&&show"></bar-echart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarEchart from '@/components/bar-echart'
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
      barDate:{},
      show:true,
      time:new Date(),
      yAxis:[{
        type: 'value',
        name:'日均骑行里程数',
        nameTextStyle:{
          color:'#9be1f9',
          fontSize:12
        },
        min: 0,
        max: 10000,
        axisLabel:{
          color:'#9be1f9',
          fontSize:14
        },
        nameLocation:'center',
        nameGap:-20,
      },
      {
        type: 'value',
        name:'日均骑行次数',
        nameTextStyle:{
          color:'#9be1f9',
          fontSize:12
        },
        min: 0,
        max: 50,
        axisLabel:{
          color:'#9be1f9',
          fontSize:14
        },
        nameLocation:'center',
        nameGap:-20,
      }],
      types:['日均骑行次数','日均骑行里程数'],
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
  computed:{
    xAxis(){
      return [{
        type: 'category',
        axisLabel:{
          color:'#9be1f9',
          fontSize:14
        },
        data:this.barDate.name
      }]
    }
  },
  components: {
    BarEchart
  },
  methods:{
    changeTimeDate(end){
      let time = this.formatDate(end);
      statistic('1',time,time).then(res=>{
        if(res.data.length){
          this.list=res.data[0].sources
          this.barDate=this.initBarData(this.list);
        }else{
          this.list=[]
          this.barDate=[];
        }
      })
    },
    breakTime(){
      this.list=[]
      this.barDate=[];
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
    initBarData(list){
      let arr = [[],[]]
      let res = {
        name :[],
        list :[]
      }
      list.forEach(v => {
        res.name.push(v.source)
        arr[0].push(v.count.toFixed(3))
        arr[1].push(v.distance.toFixed(3))
      });
      res.list=[{
        name: this.types[0],
        type: 'line',
        color:'#99ce48',
        yAxisIndex: 1,
        data: arr[0]
      },{
        name: this.types[1],
        type: 'bar',
        color:'#2687cb',
        barWidth: '40%',
        data: arr[1]
      }]
      return res
    },
    handShow(){
      this.show=false
    },
    handHide(){
      this.show=true
    },
    init(){
      if(this.botData.length){
        this.list=this.botData[0].sources
        this.barDate=this.initBarData(this.list);
      }else{
        this.list=[]
        this.barDate=[];
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
  left: 0;
  width: 550px;
  height:350px;
}
</style>

