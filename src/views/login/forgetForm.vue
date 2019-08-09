<template>
  <!-- <div class="form-item"> -->

  
  <el-form :model="loginForm"
    status-icon
    :rules="rules"
    ref="loginForm">
    <div class="title-user">找回密码</div>
    <el-form-item prop="phone">
      <el-input v-model="loginForm.phone" class="form-input" clearable prefix-icon="iconfont icon-yonghuming" autocomplete="off" placeholder="请输入手机号">
      </el-input>
    </el-form-item>

    <el-form-item    prop="code">
      <div class="input-item">
        <el-input placeholder="请输入验证码" class="id-input"  v-model="loginForm.code" autocomplete="off">
        </el-input>
        <code-button @click.native="btnClick" ref="codeBtn" ></code-button>
      </div>
    </el-form-item>

    <el-form-item>
      <button class="login-btn" @click.prevent="submitForm('loginForm')">下一步</button>
    </el-form-item>
  </el-form>
  <!-- </div> -->

</template>

<script>
import CodeButton from '@/components/code-button/code-button'
export default {
  name: 'loginForm',
  components:{
    CodeButton
  },
  data () {
    return {
      loginForm: {
        phone: '',
        code: '',
      },
      rules: {
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    //发送验证码
    btnClick(){
      if(this.loginForm.phone==''){
        return
      }else{
        this.$refs.codeBtn.getCode(this.loginForm.phone) 
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('next')
        } else {
          console.log('error submit!!');
          return false
        }
      });
    }
  },
  mounted(){
  }
}
</script>

<style lang="less" scoped>
.title-user{
  width: 100%;
  font-size: 22px;
  color: #85f4fb;
  text-align: center;
  margin-bottom: 20px;
}
.login-btn{
  width: 100%;
  height: 45px;
  margin-top: 30px;
  color: #fff;
  font-size: 16px;
  background: #255be5;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover{
    background: #255be5;
  }
}
.form-item{
  width: 100%;
}
.user-icon{
  width: 20px;
  height: 20px;
  background: url('../../assets/images/userIcon.png') no-repeat;
  background-size:100% 100%;
}

.go-password{
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  cursor: pointer;
}
.input-item{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}
.form-input{
  background: #0d254f !important;
  border-radius: 5px;
  color: #2bbaec !important;
  border: 1px solid #48a7ff;
}
.id-input{
  flex: none;
  background: #0d254f !important;
  border-radius: 5px;
  color: #2bbaec !important;
  border: 1px solid #48a7ff;
  width: 200px;
}
</style>

