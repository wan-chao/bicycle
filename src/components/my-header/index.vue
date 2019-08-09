<template>
  <div class="header-top">
    <div class="header-left">
      <div class="header-title">共享单车综合监管平台</div>
      <ul class="header-tab">
        <li  v-for="(item,index) in tabs" :class="{'tab-nor':currentIndex==index}" :key="index" @click="goTabPath(index,item)">
          <a class="iconfont" :class="item.sty"></a>
          <span class="txt-tongji">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <div class="right-box">
        <a class="right-year">{{currentTime[0]}}</a>
        <a class="right-time">{{currentTime[1]}}</a>
        <ul class="right-user">
          <li class="right-year">admin</li>
          <li class="right-line">|</li>
          <li class="right-esc" @click="open"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'myHeader',
  components: {
  },
  data () {
    return {
      currentIndex:0,
      active:true,
      tabs:[
        {name:'首页',path:'/home',sty:'icon-iconfontzhizuobiaozhun023101 icon-item'},
        {name:'统计调查',path:'/statistics',sty:'icon-tongjichakan icon-tongji'},
        {name:'系统设置',path:'/system',sty:'icon-icon icon-item'},
      ],
    }
  },
  computed:{
    currentTime(){
      return this.$store.state.map.times.split(';')
    }
  },
  methods: {
    goTabPath(index,item){
      this.currentIndex=index;
      this.$router.push(item.path)
    },
    setCurrentIndex(){
      let path = this.$route.path
      let index = this.tabs.findIndex((v)=>{
        return v.path.split('/')[1] === path.split('/')[1]
      })
      this.currentIndex=index
    },
    open() {
      this.$confirm('此操作将退出当前帐号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('todo')
        this.$message({
          type: 'success',
          message: '退出帐号成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出帐号'
        });          
      });
    }
  },
  mounted(){
    this.setCurrentIndex()
  }
}
</script>

<style lang="less" scoped>
.header-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  width: 100%;
}
.header-left{
  position: relative;
  display: flex;
  width: 791px;
  height: 83px;
  margin-left: 50px;
  margin-top: 35px;
  background: url('../../assets/images/left_top.png') no-repeat;
  background-size:100% 100%;
}
.header-title{
  width: 263px;
  height: 37px;
  font-size: 24px;
  margin-left: 82px;
  margin-top: 18px;
  color: #fff;
  line-height: 37px;
  text-align: center;
}
.header-tab{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 417px;
  height: 50px;
  margin-top: 10px;
  margin-left: 25px;
  color: #2bbaec;
}
.header-tab>li{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 34px;
  line-height: 42px;
  cursor: pointer;
}
.tab-active{
  color: #a4e7ff;
  background: url('../../assets/images/select_status.png') no-repeat;
  background-size:100% 100%;
}
.tab-nor{
  color: #ecb32b;
  background: url('../../assets/images/select_normol.png') no-repeat;
  background-size:100% 100%;
}
.txt-tongji{
  font-size: 18px;
}
.icon-tongji{
  font-size: 23px;
  margin-right: 3px;
  margin-bottom: 3px;
}
.icon-item{
  font-size: 18px;
  margin-right: 5px;
  margin-bottom: 4px;
}
.header-right{
  flex: none;
  width: 352px;
  height: 73px;
  margin-right: 50px;
  margin-top: 35px;
  background: url('../../assets/images/right_top.png') no-repeat;
  background-size:100% 100%;
}
.right-box{
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 12px;
  font-size: 14px;
}
.right-year{
  color: #2bbaec;
  margin-left: 22px;
}
.right-time{
  color: #ecb32b;
  font-size: 16px;
  margin-left: 20px;
}
.right-user{
  display: flex;
  align-items: center;
  height: 100%;
}
.right-line{
  color: #2bbaec;
  margin: 0 7px;
}
.right-esc{
  width: 33px;
  height: 33px;
  background: url('../../assets/images/esc.png') no-repeat;
  background-size:100% 100%;
  cursor: pointer;
}
.right-esc:hover{
  transform: scale(1.1);
}
</style>

