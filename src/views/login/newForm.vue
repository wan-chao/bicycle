<template>

  <el-form :model="loginForm"
    status-icon
    :rules="rules"
    ref="loginForm">
    <div class="title-user">设置新密码</div>
    <el-form-item prop="pass">
      <el-input v-model="loginForm.pass" type="password" class="form-input" clearable  placeholder="请输入新密码" autocomplete="off">
        <i slot="prefix" class="iconfont icon-mima"></i>
      </el-input>
    </el-form-item>

    <el-form-item prop="newPass">
      <el-input v-model="loginForm.newPass" clearable class="form-input" type="password" placeholder="请确认新密码" autocomplete="off">
        <i slot="prefix" class="iconfont icon-mima"></i>
      </el-input>
    </el-form-item>

    <el-form-item>
      <button class="login-btn"  @click.prevent="submitForm('loginForm')">提交</button>
    </el-form-item>
  </el-form>

</template>

<script>
import {isEmpty} from '@/util/common'
export default {
  name: 'loginForm',
  data () {
    let checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.loginForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      loginForm: {
        pass: '',
        newPass: '',
      },
      rules: {
        newPass: [
          {required: true,validator: checkPass, trigger: 'blur'}
        ],
        pass: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          { min: 6, max: 18, message: '密码长度为6-18位，包含数字、大小写字母', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
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
.user-icon{
  width: 20px;
  height: 20px;
  background: url('../../assets/images/userIcon.png') no-repeat;
  background-size:100% 100%;
}

.form-input{
  background: #0d254f !important;
  border-radius: 5px;
  color: #2bbaec !important;
  border: 1px solid #48a7ff;
}

.go-password{
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>

