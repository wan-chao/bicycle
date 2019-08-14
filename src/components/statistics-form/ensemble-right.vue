<template>
  <div class="cross-box">

    <div class="content">
      <div class='tab-top'>
        <div class="top-left">
          <span>违停量整体趋势分析</span>
          <el-date-picker  class="month-range" v-model="time" type="monthrange" size="mini" 
            @change="changeRange"
            range-separator="至" start-placeholder="开始月份" 
            end-placeholder="结束月份">
          </el-date-picker>
        </div>
        <div class="top-right">
          <img src="../../assets/images/breakIcon.png" @click="breakTime">
        </div>
      </div>
      <div class="table-item">
        <el-table
          :data="list"
          class="tab-list"
          :header-cell-style="headerStyle"
          :cell-style="cellStyle">
          <el-table-column
            prop="month"
            width="120px"
            label="违停量">
          </el-table-column>
          <el-table-column label="日均违停次数" align="center">
            <template slot-scope="scope">{{ scope.row.sources[scope.row.sources.length-1].region}}</template>
          </el-table-column>
        </el-table>
        <div class="table-echart">
          <line-echart :lineDate='lineDate' type="one" :legendData="typeName" v-if="lineDate.name"></line-echart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineEchart from '@/components/line-echart'
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
      lineDate:{},
      typeName:[],
      time:[],
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
    LineEchart
  },
  methods:{
    changeTimeDate(start,end){
      let from = this.formatDate(start);
      let to = this.formatDate(end)
      statistic('2',from,to).then(res=>{
        if(res.data.length){
          this.list=res.data
          this.lineDate=this.initLineData(res.data);
        }else{
          this.list=[]
          this.lineDate=[];
        }
      })
    },
    formatDate(timestamp) {
      var date = new Date(timestamp);
      let Y = date.getFullYear();
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
      return `${Y}${M}`;
    },
    breakTime(){
      if(this.time.length){
        this.list=[]
        this.lineDate=[];
        this.changeTimeDate(this.time[0],this.time[1]);
      }
    },
    changeRange(val){
      this.changeTimeDate(val[0],val[1]);
    },
    initLineData(list){
      let color = ['#27506b','#55995d','#574575','#7b4e56'];
      let arr = []
      let res = {
        name :[],
        list :[]
      }
      let len=list[0].sources.length;
      for(let a=0;a<len;a++){
        arr.push({name:'',value:[]})
      }
      list.forEach(v => {
        res.name.push(v.month)
        let sources = v.sources
        sources.forEach((i,j)=>{
          this.typeName.push(i.source)
          arr[j].name=i.source
          arr[j].value.push(i.region)
        })
      });
      arr.forEach((u,j)=>{
        res.list.push({
          name:u.name,
          type:'line',
          color:color[j],
          areaStyle: {
            color:color[j]
          },
          smooth: true,
          data:u.value
        })
      })
      return res
    },
    init(){
      let end = new Date();
      let start = new Date();
      start=start.setMonth(start.getMonth() - 1);
      this.time=[start,end]
      if(this.botData.length){
        this.list = this.botData
        this.lineDate=this.initLineData(this.list)
      }else{
        this.list=[]
        this.lineDate=[];
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
  width: 50%;
  height:250px;
}
</style>

