<template>
  <el-container class="teams">
    <el-main style="margin: 0px;padding:0px;" class="main-right">

      <div class="main-bar">
        <div class="bar-btn" @click="showDailog=true">
          <a class="el-icon-plus"></a>
          <span>添加成员</span>
        </div>
        <div class="bar-btn" @click="deleSomeUser">
          <a class="el-icon-delete"></a>
          <span>批量删除</span>
        </div>
      </div>

      <div class="main-tab">
        <el-table
          :data="list"
          tooltip-effect="dark"
          stripe
          @selection-change="handleSelectionChange"
          :header-cell-style="headerStyle"
          :cell-style="cellStyle">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            type="index"
            align="center"
            width="100px"
            prop="index"
            label="序号">
          </el-table-column>

          <el-table-column
            align="center"
            prop="name"
            label="归属部门">
          </el-table-column>

          <el-table-column
            align="center"
            show-overflow-tooltip
            label="登录名">
            <template slot-scope="scope">{{ scope.row.username}}</template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="position"
            label="姓名">
          </el-table-column>

          <el-table-column
            align="center"
            prop="deviceName"
            label="电话">
          </el-table-column>

          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <span class="edtior-icon" @click="handleEdit(scope.$index, scope.row)"></span>
              <span class="dele-icon" @click="handleDelete(scope.$index, scope.row)"></span>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <my-page
        v-if="total>0"
        class="my-page" 
        :page-size="pageSize" 
        :total="total"
        @sentPages="getPages">
      </my-page>

      <transition name="fade">
        <div class="model-box" v-show="showDailog">
          <user-box :editData="editData"  @closeDetail="showDailog=false"></user-box>
        </div>
      </transition>

      <!-- 删除提示框 -->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>确定删除数据吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfimDelete">确 定</el-button>
        </span>
      </el-dialog>

    </el-main>
  </el-container>
</template>

<script>
import UserBox from './user-box'
export default {
  data(){
    return {
      list:[],
      pageSize:10,
      total:0,
      showDailog:false,
      centerDialogVisible: false,
      editData:{},
      headerStyle:{
        'background-color': '#00334e',
        'color': '#2bbaec',
        'border-bottom': 'none',
        'font-size':"14px"
      },
      cellStyle:{
        'background-color': '#020f23',
      }
    }
  },
  components: {
    UserBox
  },
  methods:{
    getPages(){

    },
    
    handleSelectionChange(){

    },
    //是否确定删除
    comfimDelete(){

    },
    //删除多组数据
    deleSomeUser(){
      this.showDailog=true
      this.editData={
        bike:'摩拜'
      }
    },
    //修改数据
    handleEdit(){

    },
    //删除单个数据
    handleDelete(){

    }
  }
}
</script>

<style lang="less" scoped>
@import "./style/index";
.teams{
  height: 100%;
}
.aside-left{
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-right: 10px;
}
.aside-top{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
  margin-top: 20px;
  background: #2d8cf0;
}
.team-tree{
  width: 280px;
  .custom-tree-node {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
  }
  .group-class{
    width: 13px;
    height: 13px;
    margin-right: 5px;
    background: url('../../assets/images/icon34.png') no-repeat;
    background-size:100% 100%;
  }
  .tree-txt{
    height: 15px;
    line-height: 15px;
  }
}

.main-right{
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  overflow: hidden;
}
.main-top{
  display: flex;
  align-items: center;
  width: 95%;
  height: 40px;
  text-align: left;
  line-height: 40px;
  font-size: 16px;
  color: #333;
  margin-top: 20px;
  &>img{
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
}
.model-box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

