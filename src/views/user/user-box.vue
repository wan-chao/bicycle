<template>
  <div class="add-info">
    <img src="../../assets/images/close.png" class="close-icon" @click="closeDetail">
    <el-form 
      :model="taskForm"
      :rules="rules"
      ref="taskForm"
      label-width="120px"
      size="small"
      class="demo-ruleForm">

      <el-form-item class="form-item" label="归属部门：" prop="department" required>
        <el-col :span="24">
          <el-input v-model="taskForm.department" class="form-input" placeholder="请输入归属部门"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item class="form-item" label="姓名：" prop="username" required>
        <el-col :span="24">
          <el-input v-model="taskForm.username" class="form-input" placeholder="请输入姓名"></el-input>
        </el-col>
      </el-form-item>

      
      <el-form-item class="form-item" label="登录名：" prop="name" required>
        <el-col :span="24">
          <el-input v-model="taskForm.name" class="form-input" placeholder="请输入登录名" clearable autocomplete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item class="form-item" label="密码：" prop="pass">
        <el-col :span="24">
          <el-input  v-model="taskForm.pass" class="form-input" placeholder="请输入密码" clearable type="password" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item class="form-item" label="确认密码：" prop="oncePass">
        <el-col :span="24">
          <el-input  v-model="taskForm.oncePass" class="form-input" placeholder="请确认密码" clearable type="password" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>

    </el-form>

    <div class="footer-btn">
      <div class="form-btn" @click="submitForm('taskForm')">确 定</div>
      <div class="form-btn" @click="closeDetail">取 消</div>
    </div>
  </div>

</template>

<script>
  import {isEmpty} from '@/util/common'
  export default {
    props:{
      editData:{
        default:()=>({}),
        type:Object
      }
    },
    data(){
      return {
        taskForm: {
          department:'',
          username:'',
          name:'',
          pass:'',
          oncePass:'',
        },
        rules: {
          department: [
            { required: true, message: '请输入归属部门'},
          ],
          username: [
            { required: true, message: '请输入姓名'},
          ],
          name: [
            { required: true, message: '请输入登录名'},
          ],
          pass: [
            { required: true, message: '请输入密码'},
          ],
          oncePass: [
            { required: true, message: '请确认密码'},
          ],
        }
      }
    },
    methods: {
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //关闭弹窗
      closeDetail(){
        this.$emit('closeDetail')
        this.resetForm()
      },
      //重置表单
      resetForm() {
        this.$refs['taskForm'].resetFields();
      }
    },
    watch:{
      editData(newVal){
        if(isEmpty(newVal)) return;
        console.log('111',newVal)
      }
    },
    mounted(){
    }
  }
</script>

<style scoped lang="less">
.add-info{
  width: 484px;
  height: 379px;
  background: url('../../assets/images/addBox.png') no-repeat;
  background-size:100% 100%;
  display: flex;
  flex-flow: column;
  color: #2bbaec;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
}
.close-icon{
  position: absolute;
  right: 15px;
  top: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.demo-ruleForm{
  margin-top: 40px;
}
.form-item{
  height: 30px;
  color: #2bbaec;
}
.form-input{
  border: 1px solid #15578e;
}
.form-btn{
  width: 130px;
  height: 46px;
  line-height: 46px;
  color: #fff;
  background: url('../../assets/images/formBtn.png') no-repeat;
  background-size:100% 100%;
  margin: 0 20px;
  cursor: pointer;
}
.footer-btn{
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  &>button{
    margin: 0 30px;
  }
}
</style>
