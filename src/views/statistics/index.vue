<template>
  <el-container class="container-style">

    <el-header style="padding:0;height:120px">
      <my-header ref="myHeader"></my-header>
    </el-header>

    <el-main style="padding:0;height:100%" class="main-style">
      <el-row>
        <el-col :span="24" class="tab-col">
          <cross-left :botData="unuseBot"></cross-left>
          <cross-mid  :botData="activeBot"></cross-mid>
          <cross-right :botData="parkeBot"></cross-right>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" class="tab-col">
          <ensemble-left :botData="unuseBot2"></ensemble-left>
          <ensemble-mid :botData="activeBot2"></ensemble-mid>
          <ensemble-right :botData="parkeBot2"></ensemble-right>
        </el-col>
      </el-row>
    </el-main>

  </el-container>
</template>

<script>
import MyHeader from '@/components/my-header'
import CrossLeft from './cross-left'
import CrossMid from './cross-mid'
import CrossRight from './cross-right'
import EnsembleLeft from './ensemble-left'
import EnsembleMid from './ensemble-mid'
import EnsembleRight from './ensemble-right'
import {statistic} from "@/api/statistic"
export default {
  name: 'statistics',
  data(){
    return {
      unuseBot:[],
      activeBot:[],
      parkeBot:[],
      unuseBot2:[],
      activeBot2:[],
      parkeBot2:[],
    }
  },
  components: {
    MyHeader,CrossLeft,CrossMid,CrossRight,EnsembleLeft,EnsembleMid,EnsembleRight
  },
  methods:{
    changeTimeDate(start,end){
      let from = this.formatDate(start);
      let to = this.formatDate(end)
      statistic('0',from,to).then(res=>{
        start===end?this.unuseBot=res.data:this.unuseBot2=res.data
      })
      statistic('1',from,to).then(res=>{
        start===end?this.activeBot=res.data:this.activeBot2=res.data
      })
      statistic('2',from,to).then(res=>{
        start===end?this.parkeBot=res.data:this.parkeBot2=res.data
      })
    },
    formatDate(timestamp) {
      var date = new Date(timestamp);
      let Y = date.getFullYear();
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
      return `${Y}${M}`;
    },
    initDate(){
      this.end = new Date();
      let start = new Date();
      this.start=start.setMonth(start.getMonth() - 1);
      this.value=[this.start,this.end]
      this.changeTimeDate(this.end,this.end);
      this.changeTimeDate(this.start,this.end);
    }
  },
  mounted(){
    this.initDate()
  }
}
</script>

<style lang="less" scoped>
.container-style{
  height:100%;
  background: url('../../assets/images/back_star.jpg') no-repeat;
  background-size:100% 100%;
}
.main-style{
  overflow-x: hidden; overflow-y: auto; 
}
.main-style::-webkit-scrollbar {
  display: none;
}
.top-title{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  margin-top: 20px;
  line-height: 50px;
}
.tab-col{
  padding: 15px 0;
  display: flex;
  justify-content: space-around;
}
</style>

