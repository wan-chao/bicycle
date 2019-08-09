<template>
  <div class="list-bike" :class="{'bike-active':show}" @click="bikeClike">
    {{bike.name}}
  </div>
</template>

<script>
export default {
  props:{
    bike:Object
  },
  computed: {
    bikeList(){
      return this.$store.state.map.bikeList;
    }
  },
  data(){
    return {
      show:false
    }
  },
  methods:{
    bikeClike(){
      this.show=!this.show
      this.changeBikeList()
    },
    changeBikeList(){
      let index = this.bikeList.findIndex(v=>{
        return v === this.bike.type
      })
      if(this.show){
        if(index<0)  this.$store.dispatch('map/addBike',this.bike.type)
      }else{
        if(index>=0) this.$store.dispatch('map/mixBike',index)
      }
    },
    initStatus(){
      let index = this.bikeList.findIndex(v=>{
        return v === this.bike.type
      })
      if(index>=0) this.show = true;
    }
  },
  mounted(){
    this.initStatus()
  },
  destroyed(){
  }
}
</script>

<style lang="less" scoped>
.list-bike{
  width: 75px;
  height: 22px;
  margin:  7px auto;
  line-height: 24px;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
}
.bike-active{
  background: #0d485e;
  border: 1px solid #2bbaec;
  border-radius: 2px;
}
</style>

