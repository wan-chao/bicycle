<template>
  <el-container style="height:100%">

    <el-main style="padding:0;height:100%;" class="login-main">
      <div class="middle-header">
        <div class="login-box">
          <div class="form-top">共享单车综合监管平台</div>
          <div class="form-txt">Shared  bicycle  comprehensive  supervision  platform</div>
          <div class="login-form" v-if="!forget&&!next">
            <div class="form-box">
              <login-form @forget="forgetPass"></login-form>
            </div>
          </div>
          <div class="login-form" v-if="forget&&!next">
            <div class="form-box">
              <forget-form @next='nextClick'></forget-form>
            </div>
          </div>
          <div class="login-form" v-if="next">
            <div class="form-box">
              <new-form></new-form>
            </div>
          </div>
        </div>
      </div>
    </el-main>

  </el-container>
</template>

<script>
import LoginForm from './loginForm'
import ForgetForm from './forgetForm'
import NewForm from './newForm'
export default {
  name: 'home',
  data(){
    return {
      forget:false,
      next:false
    }
  },
  components: {
    LoginForm,ForgetForm,NewForm
  },
  methods:{
    forgetPass(){
      this.forget=true
    },
    nextClick(){
      this.next=true
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  height: 100%;
  color: #fff;
}
.login-main{
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  background: url('../../assets/images/loginBack.jpg') no-repeat;
  background-size:100% 100%;
}
.title{
  font-size: 40px;
  font-weight: 700;
}
.header-top{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #fff;
}
.middle-header{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 1230px;
  height: 100%;
  &>img{
    width: 260px;
    height: 45px;
  }
  &>.icon-bg{
    width: 601px;
    height: 578px;
  }
}
.login-box{
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  margin-top:  10%;
  padding: 10px;
  width: 1015px;
  height: 550px;
}
.login-form{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  width: 1015px;
  height: 450px;
  background: url('../../assets/images/loginForm.png') no-repeat;
  background-size:100% 100%;
}
.form-box{
  width: 350px;
  height: 300px;
}
.form-top{
  padding-top: 50px;
  font-size: 67px;
  background: linear-gradient(to top, #1181a6, #6cc3da, #FDF7EE);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
}
.form-txt{
  padding: 20px 0;
  font-size: 16px;
  background: linear-gradient(to top, #1181a6, #6cc3da, #FDF7EE);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
}
.icon{
  width: 47px;
  height: 42px;
  margin-left: 30px;
}
</style>

