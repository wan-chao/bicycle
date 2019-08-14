<template>
  <div class="cross-box">
    <div class="content">
      <div class='tab-top'>
        <div class="top-left">
          <span>车辆分布趋势</span>
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
            label="月份">
          </el-table-column>
          <el-table-column v-for="(item,index) in types" :key="index" :label="item">
            <template slot-scope="scope">{{scope.row[item]}}</template>
          </el-table-column>
        </el-table>
        <div class="table-echart">
          <line-echart :lineDate='lineDate' type="one" :legendData="types" v-if="lineDate.name"></line-echart>
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
      time:[],
      rrr:[],
      types:[],
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
    totalNum(arr){
      let num = 0
      arr.forEach(v=>{
        num+=v
      })
      return num
    },
    changeTimeDate(start,end){
      let from = this.formatDate(start);
      let to = this.formatDate(end)
      statistic('0',from,to).then(res=>{
        if(res.data.length){
          this.list=this.initFormData(this.botData)
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
    initFormData(list){
      let data = []
      this.types=[]
      list.forEach(v=>{
        let obj = {}
        let sources = v.sources
        obj.month=v.month
        sources.forEach(item=>{
          let name = item.source
          let num = this.totalNum(item.check)
          obj[name] = num
          this.types.push(name)
        })
        data.push(obj)
      })
      return data
    },
    initLineData(list){
      let color = ['#1876f1','#59d771','#5354cd','#ab7d01'];
      let arr = [{name:'',value:[]},{name:'',value:[]},{name:'',value:[]},{name:'',value:[]}]
      let res = {
        name :[],
        list :[]
      }
      list.forEach((v,i)=>{
        let j=0;
        for(let key in v){
          if(key === 'month'){
            res.name.push(v[key])
          }else{
            arr[j].name=key
            arr[j].value.push(v[key])
          }
          j++
        }
      })
      arr.forEach((u,j)=>{
        if(u.name){
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
        }
      })
      return res
    },
    init(){
      let end = new Date();
      let start = new Date();
      start=start.setMonth(start.getMonth() - 1);
      this.time=[start,end]
      if(this.botData.length){
        this.list=this.initFormData(this.botData)
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
.table-echart{
  width: 50%;
  height:250px;
}
</style>

