<template>
  <div class="content">
    <div class="content-txt" @click="btnClick" >单车类型</div>
    <div ref="box" class="btn-box" :class="{'btn-active':show}">
      <bike-btn ref="bike" v-for="(item,index) in list" :key="index" :bike="item"></bike-btn>
    </div>
  </div>
</template>

<script>
import BikeBtn from './bike-btn'
export default {
  props:{
    list:Array
  },
  components: {
    BikeBtn
  },
  data(){
    return {
      show:false,
    }
  },
  computed:{
  },
  methods:{
    btnClick(){
      this.show=!this.show
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 164px;
  height: 160px;
  background: url('../../assets/images/list_btn.png') no-repeat;
  background-size:100% 100%;
}
.content-txt{
  position: absolute;
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-left: 3px;
  font-size: 20px;
  text-align: center;
  color: #d5f4ff;
  cursor: pointer;
}
.btn-box{
  position: absolute;
  left: 160px;
  top: 26px;
  font-size: 14px;
  opacity: 0;
  color: #d5f4ff;
  width: 110px;
  height: 0;
  background: url('../../assets/images/btn_box.png') no-repeat;
  background-size:100% 100%;
  transition: all 0.1s linear;
}
.content>.btn-active{
  opacity: 1;
  height: 155px;
  padding-top: 10px;
}
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

