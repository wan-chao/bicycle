<template>
  <div class="chart">

  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  props:{
    barDate:Object,
    type:String,
    xAxis:Array,
    yAxis:Array,
    legendData:{
      default:()=>[],
      type:Array
    }
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    initChart() {
      if(!this.barDate.name) return;
      this.chart = echarts.init(this.$el);
      this.chart.setOption({
        tooltip : {  //鼠标在图标上指示显示的内容
          trigger: 'axis',
          axisPointer : {         // 坐标轴指示器，坐标轴触发有效
            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          top:10,
          textStyle:{
            color:'#9be1f9',
            fontSize:'12'
          },
          data: this.legendData
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        calculable: true,
        xAxis : this.xAxis,
        yAxis : this.yAxis,
        series : this.barDate.list
      })
    }
  },
  watch:{
    barDate(newVal){
      this.initChart()
    },
  },
  mounted(){
    this.initChart()
  }
}
</script>

<style lang="less" scoped>
.chart{
  width: 100%;
  height: 100%;
}
</style>

