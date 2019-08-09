<template>
  <div class="cross-box">
    <div class="content">
      <div class='tab-top'>
        <div class="top-left">
          <span>闲置率整体趋势分析</span>
          <el-date-picker  class="month-range" v-model="time" type="monthrange" size="mini" 
            @change="changeRange"
            range-separator="至" start-placeholder="开始月份" 
            end-placeholder="结束月份">
          </el-date-picker>
        </div>
        <div class="top-right">
          <img src="../../assets/images/tabIcon.png" @click="handShow">
          <img src="../../assets/images/lineIcon.png" @click="handHide">
          <img src="../../assets/images/breakIcon.png" @click="breakTime">
        </div>
      </div>
      <div class="table-item">
        <el-table
          v-if="!showLine"
          :data="list"
          class="tab-list"
          :header-cell-style="headerStyle"
          :cell-style="cellStyle">
          <el-table-column
            prop="month"
            label="闲置率分析">
          </el-table-column>
          <el-table-column label="活跃">
            <template slot-scope="scope">{{ scope.row.sources[list.length-1].check[0] }}</template>
          </el-table-column>
          <el-table-column label="正常">
            <template slot-scope="scope">{{ scope.row.sources[list.length-1].check[1] }}</template>
          </el-table-column>
          <el-table-column label="不活跃">
            <template slot-scope="scope">{{ scope.row.sources[list.length-1].check[2] }}</template>
          </el-table-column>
          <el-table-column label="僵尸车">
            <template slot-scope="scope">{{ scope.row.sources[list.length-1].check[3] }}</template>
          </el-table-column>
        </el-table>
        <div class="table-echart">
          <line-echart :lineDate='lineDate' type="one" :legendData="types" v-if="lineDate.name&&showLine"></line-echart>
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
      showLine:false,
      time:[],
      types:['活跃','正常','不活跃','僵尸车'],
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
      statistic('0',from,to).then(res=>{
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
      let data = [{name:'',value:[]},{name:'',value:[]},{name:'',value:[]},{name:'',value:[]}]
      let arr = []
      let res = {
        name :[],
        list :[]
      }
      list.forEach(v => {
        res.name.push(v.month)
        let sources = v.sources
        sources.forEach(i=>{
          if(i.source=='total') arr.push(i.check)
        })
      });
      arr.forEach(s=>{
        s.forEach((k,n)=>{
          data[n].name=this.types[n]
          data[n].value.push(k)
        })
      })
      data.forEach((u,i)=>{
        res.list.push({
          name:u.name,
          type:'line',
          color:color[i],
          areaStyle: {
            color:color[i]
          },
          smooth: true,
          data:u.value
        })
      })
      return res
    },
    handShow(){
      this.showLine=false
    },
    handHide(){
      this.showLine=true
    },
    changeBot(){
      this.showLine=!this.showLine
    },
    init(){
      let end = new Date();
      let start = new Date();
      start=start.setMonth(start.getMonth() - 1);
      this.time=[start,end]
      if(this.botData.length){
        this.list=this.botData
        this.lineDate=this.initLineData(this.list);
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
.tab-list{
  background: transparent;
  font-size: 14px;
  color: #9be1f9;
}
.table-item{
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
}
.table-echart{
  position: absolute;
  top: 0;
  left: 0;
  width: 550px;
  height:350px;
}
</style>

