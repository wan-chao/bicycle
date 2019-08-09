<template>
  <el-container class="container-style">
    <el-header style="padding:0;height:120px">
      <my-header ref="myHeader"></my-header>
    </el-header>

    <el-main style="padding:50px;height:100%">
      <div class="main-content">
        <div class="left-box">
          <ul class="manage-bar">
            <li><router-link tag="div"  to="/system/yunwei"><div>车辆运维人员登记</div></router-link></li>
            <li><router-link tag="div"  to="/system/user"><div>系统用户登记</div></router-link></li>
          </ul>
        </div>
        <div class="right-box">
          <router-view/>
        </div>
      </div>
    </el-main>

  </el-container>
</template>

<script>
import MyHeader from '@/components/my-header'

export default {
  name: 'system',
  components: {
    MyHeader
  }
}
</script>

<style lang="less" scoped>
.manage{
  width: 100%;
  height: 100%;
}
.container-style{
  height:100%;
  background: url('../../assets/images/back_star.jpg') no-repeat;
  background-size:100% 100%;
}
.main-content{
  display: flex;
  width: 1470px;
  height: 100%;
  margin: 0 auto;
}
.right-box{
  width: 1192px;
  height: 100%;
  margin-left: 10px;
  border: 1px solid #145287;
  border-radius: 7px;
  background: rgba(1, 14, 32, 0.7) ;
  overflow: hidden;
}
.left-box{
  position: relative;
  width: 275px;
  height: 100%;
  font-size: 16px;
  color: #fff;
  border: 2px solid #145287;
  border-radius: 7px;
  background: #031b2f;
}
.manage-bar{
  padding-top: 20px;
  width: 100%;
  &>li{
    width: 100%;
    cursor: pointer;
    color: #fff;
    &>div{
      height: 60px;
      line-height: 60px;
      &>div{
        margin-left: 50px;
        text-align: left;
      };
    }
  }
}
.router-link-active{
  background:#4d3d18;
  border: 1px solid #ecb32b;
  color: #ecb32b;
}
</style>

