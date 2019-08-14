<template>
  <div :class="show?'active-content':'content'">
    <div class="content-txt" @click="btnClick" >统计调查</div>
  </div>
</template>

<script>
export default {
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
      this.$emit('change',this.show)
    },
    hide(){
      this.show =false
      this.$emit('change',this.show)
    }
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
  color: #d5f4ff;
  background: url('../../assets/images/list_btn.png') no-repeat;
  background-size:100% 100%;
}
.active-content{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 164px;
  height: 160px;
  color: #fe9b00;
  background: url('../../assets/images/list_btn_active.png') no-repeat;
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
  cursor: pointer;
}
</style>

