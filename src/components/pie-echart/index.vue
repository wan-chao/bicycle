<template>
  <div class="chart">

  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  props:{
    pieData:Array,
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
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left:0,
          bottom:50,
          width:400,
          orient:'vertical',
          textStyle:{
            color:'#9be1f9',
            fontSize:'12'
          },
          data: this.legendData
        },
        series : [
            {
                name: '违停量分析',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:this.pieData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      })
    }
  },
  watch:{
    pieData(newVal){
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

