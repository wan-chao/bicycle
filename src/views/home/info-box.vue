<template>
  <div class="info-box">
    <div class="info-top">{{item.title}}</div>
    <div v-for="(value,index) in item.list" :key="index" class="info-list">
      <a class="info-type">{{value.type}}</a>：
      <a>{{value.name}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    item:Object
  },
  data(){
    return {
    }
  },
  methods:{
  },
  mounted(){
    let something = this.$el.outerHTML
    // console.log(something,this.$el)
    this.$emit('out',{html:something,center:this.item.center})
  },
  destroyed(){
  }
}
</script>

<style lang="less" scoped>
.info-box{
  width: 298px;
  height: 172px;
  padding-top: 20px;
  background: url('../../assets/images/infoBox.png') no-repeat;
  background-size:100% 100%;
}
.info-top{
  font-size: 18px;
  padding-bottom: 20px;
  color: #d5f4ff;
}
.info-list{
  width: 80%;
  text-align: left;
  margin: 0 auto;
  font-size: 14px;
  padding-bottom: 14px;
  color: #d5f4ff;
}
.info-type{
  display: inline-block;
  width: 58px;
}
</style>

