<template>
  <div class="chart">

  </div>
</template>

<script>
import echarts from 'echarts';
const yAxisNo=[{
  type: 'value',
  axisLabel:{
    color:'#9be1f9',
    fontSize:14
  },
}]
const yAxisTwo=[
  {
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
    nameGap:-15,
    axisLabel:{
      color:'#9be1f9',
      fontSize:14
    },
    nameRotate:-90
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
    nameGap:-15
  },
]
export default {
  props:{
    lineDate:Object,
    type:String,
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
      this.chart = echarts.init(this.$el);
      this.chart.setOption({
        tooltip : {  //鼠标在图标上指示显示的内容
          trigger: 'axis',
          axisPointer : {         // 坐标轴指示器，坐标轴触发有效
            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        legend: {
          top:10,
          left:200,
          width:400,
          textStyle:{
            color:'#9be1f9',
            fontSize:'12'
          },
          data: this.legendData
        },
        xAxis : [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel:{
              color:'#9be1f9',
              fontSize:14
            },
            data: this.lineDate.name
          }
        ],
        yAxis : this.type==='one'?yAxisNo:yAxisTwo,
        series : this.lineDate.list
      })
    }
  },
  watch:{
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

