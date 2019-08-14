<template>
  <div class="cross-box">
    <div class="content">
      <div class='tab-top'>
        <div class="top-left">
          <span>车辆实时分布</span>
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
          class="tab-list-first"
          :header-cell-style="headerStyle"
          :cell-style="cellStyle"> 
          <el-table-column prop="source" label="名称">
          </el-table-column>
          <el-table-column label="实时数量统计">
            <template slot-scope="scope">{{ totalNum(scope.row.check)}}</template>
          </el-table-column>
        </el-table>
        <div class="table-echart">
          <pie-echart :pieData="barDate" :legendData="typeName"></pie-echart>
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
      barDate:[],
      time:new Date(),
      typeName:[],
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
  },
  components: {
    PieEchart
  },
  methods:{
    totalNum(arr){
      let num = 0
      arr.forEach(v=>{
        num+=v
      })
      return num
    },
    changeTimeDate(end){
      let time = this.formatDate(end);
      statistic('0',time,time).then(res=>{
        if(res.data.length){
          this.list=res.data[0].sources
          this.initBarData();
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
    initBarData(){
      this.barDate = this.list.map((v,i)=>{
        this.typeName.push(v.source)
        return {
          value:this.totalNum(v.check),
          name:v.source,
          itemStyle:{color:this.color[i]}
        }
      })
    },
    init(){
      if(this.botData.length){
        this.list=this.botData[0].sources
        this.initBarData();
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

