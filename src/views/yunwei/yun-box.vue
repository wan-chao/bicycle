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

      <el-form-item class="form-item" label="单车名称：" prop="bike" required>
        <el-col :span="24">
          <el-select v-model="taskForm.bike" class="form-input">
            <el-option
              v-for="item in bikeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item class="form-item" label="运维人员：" prop="username" required>
        <el-col :span="24">
          <el-input v-model="taskForm.username" class="form-input" placeholder="请输入用户名"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item class="form-item" label="负责区域：" prop="area">
        <el-col :span="24">
          <el-select v-model="taskForm.area" class="form-input" placeholder="请选择区域">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      
      <el-form-item class="form-item" label="联系电话：" prop="phone" >
        <el-col :span="24">
          <el-input v-model="taskForm.phone" class="form-input" placeholder="请输入手机号码"></el-input>
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
          bike:'',
          username:'',
          area:'',
          phone:''
        },
        bikeList:[
          {id:'1',name:'滴滴单车'},
          {id:'2',name:'摩拜单车'}
        ],    
        areaList:[
          {id:'1',label:'武昌区'},
          {id:'2',label:'洪山区'}
        ],
        rules: {
          bike: [
            { required: true, message: '请选择单车'},
          ],
          username: [
            { required: true, message: '请输入运维人员名称'},
          ],
          area: [
            { required: true, message: '请选择区域'},
          ],
          phone: [
            {required: true, message: '请输入手机号码'},
            {pattern:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/,message:"请输入合法的手机号"}
          ]
        }
      }
    },
    methods: {
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.taskForm)
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
  margin-top: 30px;
  display: flex;
  justify-content: center;
  &>button{
    margin: 0 30px;
  }
}
</style>
