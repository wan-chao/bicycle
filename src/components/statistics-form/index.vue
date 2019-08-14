<template>
  <div class="content">
    <div class="content-left">
      <cross-first :botData="unuseBot" v-show="showSubsection"></cross-first>
      <cross-left :botData="unuseBot" v-show="showTravel"></cross-left>
      <cross-mid :botData="activeBot" v-show="showBikeStatus"></cross-mid>
      <cross-right :botData="parkeBot" v-show="showBikeArea"></cross-right>
    </div>
    <div class="content-right">
      <div class="right-form">
        <ensemble-first :botData="unuseBot2" v-show="showSubsection"></ensemble-first>
        <ensemble-left :botData="unuseBot2" v-show="showTravel"></ensemble-left>
        <ensemble-mid :botData="activeBot2" v-show="showBikeStatus"></ensemble-mid>
        <ensemble-right :botData="parkeBot2" v-show="showBikeArea"></ensemble-right>
      </div>
    </div>
  </div>
</template>

<script>
import CrossFirst from './cross-first'
import CrossLeft from './cross-left'
import CrossMid from './cross-mid'
import CrossRight from './cross-right'
import EnsembleFirst from './ensemble-first'
import EnsembleLeft from './ensemble-left'
import EnsembleMid from './ensemble-mid'
import EnsembleRight from './ensemble-right'
import {statistic} from "@/api/statistic"
export default {
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
    CrossFirst,CrossLeft,CrossMid,CrossRight,EnsembleFirst,EnsembleLeft,EnsembleMid,EnsembleRight
  },
  computed:{
    showSubsection(){
      return this.$store.state.map.subsection
    },
    showTravel(){
      return this.$store.state.map.travel
    },
    showBikeStatus(){
      return this.$store.state.map.bikeStatus
    },
    showBikeArea(){
      return this.$store.state.map.bikeArea
    }
  },
  methods:{
    changeTimeDate(start,end){
      let from = this.formatDate(start);
      let to = this.formatDate(end)
      statistic('0',from,to).then(res=>{
        console.log(res)
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
    console.log(11111111111)
  }
}
</script>

<style lang="less" scoped>
.content{
  display: flex;
  width: 100%;
  height: 100%;
}
.content-left{
  min-width: 690px;
  height: 100%;
  background: url('../../assets/images/form_left.png') no-repeat;
  background-size:100% 100%;
}
.content-right{
  position: relative;
  min-width: 1198px;
  height: 100%;
}
.right-form{
  position: absolute;
  top: 0;
  left: -8px;
  width: 1198px;
  height: 100%;
  background: url('../../assets/images/form_right.png') no-repeat;
  background-size:100% 100%;
}
</style>

