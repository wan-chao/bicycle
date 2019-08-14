<template>
  <div class="cross-box">
    <div class="content">
      <div class='tab-top'>
        <div class="top-left">
          <span>闲置率分析</span>
          <el-date-picker class="month-item" v-model="time" type="month" size="mini" @change="timeChange" placeholder="选择月">
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
          <el-table-column prop="source" label="名称" width="70">
          </el-table-column>
          <el-table-column label="活跃" width="70">
            <template slot-scope="scope">{{ scope.row.check[0] }}</template>
          </el-table-column>
          <el-table-column label="正常" width="58">
            <template slot-scope="scope">{{ scope.row.check[1]+scope.row.check[2] }}</template>
          </el-table-column>
          <el-table-column label="不活跃" width="65">
            <template slot-scope="scope">{{ scope.row.check[2] }}</template>
          </el-table-column>
          <el-table-column label="僵尸车" width="65">
            <template slot-scope="scope">{{ scope.row.check[3] }}</template>
          </el-table-column>
        </el-table>
        <div class="table-echart">
          <bar-echart :barDate='barDate' :xAxis="xAxis" :yAxis="yAxis" :legendData="types" v-if="barDate.name"></bar-echart>
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
      xAxis:[{
        type: 'value',
        axisLabel:{
          color:'#9be1f9',
          fontSize:12
        },
      }],
      time:new Date(),
      types:['一天至少有一次移动','3天内移动过','6天内移动过','超过6天未动过'],
      color:['#1876f1','#59d771','#5354cd','#ab7d01'],
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
    yAxis(){
      return [{
        type: 'category',
        axisLabel:{
          color:'#9be1f9',
          fontSize:12
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
      statistic('0',time,time).then(res=>{
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
      let arr = [[],[],[],[]]
      let res = {
        name :[],
        list :[]
      }
      list.forEach(v => {
        res.name.push(v.source)
        v.check.forEach((i,b)=>{
          arr[b].push(i)
        })
      });
      arr.forEach((s,j)=>{
        res.list.push({
          name: this.types[j],
          type: 'bar',
          stack: '总数',
          color:this.color[j],
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          barWidth: '30%',
          data: s
        })
      })
      return res
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
  width: 50%;
  height:250px;
}
</style>

