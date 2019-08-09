<template>
  <div class="content">
    <div :class="$store.state.map.subsection?'list-active':'list-item'"  @click="subsectionClick">车辆分布</div>
    <div :class="$store.state.map.travel?'list-active':'list-item'"  @click="travelClick">骑行轨迹</div>
    <div :class="$store.state.map.bikeStatus?'list-active':'list-item'"  @click="bikeStatusClick">车辆状态</div>
    <div :class="$store.state.map.bikeArea?'list-active':'list-item'"  @click="bikeAreaClick">停车区域</div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data(){
    return {
    }
  },
  methods:{
    subsectionClick(){
      let status = !this.$store.state.map.subsection;
      this.$store.dispatch(`map/setSubsection`,status);
      this.$emit('change',status,'SUBSECTION')

      this.$store.dispatch(`map/setTravel`,false);
      this.$emit('change',false,'TRAVEL')
      this.$store.dispatch(`map/setBikeStatus`,false);
      this.$emit('change',false,'BIKE_STATUS')
      this.$store.dispatch(`map/setBikeArea`,false);
      this.$emit('change',false,'BIKE_AREA')
    },
    travelClick(){
      let status = !this.$store.state.map.travel;
      this.$store.dispatch(`map/setTravel`,status);
      this.$emit('change',status,'TRAVEL')
      
      this.$store.dispatch(`map/setSubsection`,false);
      this.$emit('change',false,'SUBSECTION')
      this.$store.dispatch(`map/setBikeStatus`,false);
      this.$emit('change',false,'BIKE_STATUS')
      this.$store.dispatch(`map/setBikeArea`,false);
      this.$emit('change',false,'BIKE_AREA')
    },
    bikeStatusClick(){
      let status = !this.$store.state.map.bikeStatus;
      this.$store.dispatch(`map/setBikeStatus`,status);
      this.$emit('change',status,'BIKE_STATUS')

      this.$store.dispatch(`map/setSubsection`,false);
      this.$emit('change',false,'SUBSECTION')
      this.$store.dispatch(`map/setTravel`,false);
      this.$emit('change',false,'TRAVEL')
      this.$store.dispatch(`map/setBikeArea`,false);
      this.$emit('change',false,'BIKE_AREA')
    },
    bikeAreaClick(){
      let status = !this.$store.state.map.bikeArea;
      this.$store.dispatch(`map/setBikeArea`,status);
      this.$emit('change',status,'BIKE_AREA')

      this.$store.dispatch(`map/setSubsection`,false);
      this.$emit('change',false,'SUBSECTION')
      this.$store.dispatch(`map/setTravel`,false);
      this.$emit('change',false,'TRAVEL')
      this.$store.dispatch(`map/setBikeStatus`,false);
      this.$emit('change',false,'BIKE_STATUS')
    },
  },
  mounted(){
  },
  destroyed(){
  }
}
</script>

<style lang="less" scoped>
.content{
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 111px;
  font-size: 20px;
  text-align: center;
}
.list-item{
  width: 110px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 13px;
  cursor: pointer;
  color: #d5f4ff;
  background: url('../../assets/images/list_item.png') no-repeat;
  background-size:100% 100%;
}
.list-item:hover{
  transform:scale(1.1);
}
.list-active{
  width: 110px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  color: #ecb32b;
  margin-bottom: 13px;
  background: url('../../assets/images/list_active.png') no-repeat;
  background-size:100% 100%;
}
.list-active:hover{
  transform:scale(1.1);
}
</style>

