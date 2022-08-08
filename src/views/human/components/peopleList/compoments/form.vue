<template>
  <div class="form">
    <slot />
    <el-table
      class="table"
      :data="tableData"
      stripe
      style="width: 100%; text-align: center"
      
    >
      <el-table-column prop="date" type="index" label="序号"> </el-table-column>
      <el-table-column
        :prop="item.column_name"
        :label="item.column_comment"
        v-for="(item, index) in tableHead"
        :key="index"
      >
      </el-table-column>
      <el-table-column prop="role.roleName" label="角色"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="amend(scope.row)">修改</el-button>
          <el-button type="text" size="small" class="btn_del" @click="$emit('deleteListPeople')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插槽 -->
    <slot name="page" class="page"></slot>

        <!-- 新增弹窗 -->
    <el-dialog title="新增人员" :visible.sync="dialogTableVisible"> 

      <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="人员名称：">
    <el-input v-model="form.name"></el-input>
  </el-form-item>

  <el-form-item label="角色：" style="width:100%">
     <el-select v-model="form.region" placeholder="请选择">
      <el-option label="运营人员" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="联系电话：">
    <el-input v-model="form.mobile"></el-input>
  </el-form-item>

  <el-form-item label="负责区域：">
     <el-select v-model="form.res" placeholder="请选择">
      <el-option label="区域3" value="shanghai1"></el-option>
      <el-option label="区域4" value="beijing2"></el-option>
    </el-select>
  </el-form-item>
  <!-- 头像 -->
  <!-- <el-form-item label="头像：">
     <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item> -->
  <!-- /头像 -->
  <!-- 状态 -->
  <el-form-item label="状态：">
    <el-checkbox v-model="form.status">是否启用</el-checkbox>
  </el-form-item>
  </el-form>
    </el-dialog>
     <!-- 新增弹窗 -->

         <!-- 编辑弹窗 -->
    <el-dialog title="编辑人员" :visible.sync="dialogEditVisible"> 

      <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="人员名称：">
    <el-input v-model="form.name"></el-input>
  </el-form-item>

  <el-form-item label="角色：" style="width:100%">
     <el-select v-model="form.role.roleId" placeholder="请选择">
      <el-option :label="item.roleName" :value="item.roleId" v-for="item in ywList" :key="item.roleCode"></el-option>
     
    </el-select>
  </el-form-item>

  <el-form-item label="联系电话：">
    <el-input v-model="form.mobile"></el-input>
  </el-form-item>

  <el-form-item label="负责区域：">
     <el-select v-model="form.regionId" placeholder="请选择">
      <el-option :label="item.name" :value="item.id" v-for="item in quyuList" :key="item.id"></el-option>
      
    </el-select>
  </el-form-item>
  <!-- 头像 -->
   <el-form-item label="头像:">
        <el-upload class="avatar-uploader" :show-file-list="false" action="" :http-request="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="form.image" :src="form.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">仅支持扩展名为jpg/png文件,且不超过100kb</div>
        </el-upload>
      </el-form-item>
  <!-- /头像 -->
  <!-- 状态 -->
  <el-form-item label="状态：">
    <el-checkbox v-model="form.status">是否启用</el-checkbox>
  </el-form-item>
  </el-form>
<span slot="footer" class="dialog-footer">
      <el-button @click.native="cancelFn" style="margin-right:30px">取 消</el-button>
      <el-button type="primary" @click.native="confirmFn">确 定</el-button>
    </span>
    </el-dialog>
     <!-- 编辑弹窗 -->
  </div>
</template>

<script>
import { getywPeople,getquyuList,editUserInfoApi,getUserServeFileUploadApi } from "@/api/people";
export default {
  name:'listFrom',
  data() {
    return {
      quyuList:[],
      lineList:{},
      // 弹框---
      // 表单
      form:{
        userName:'',
        role: {
              roleId: 2,
            },
        image:"http://lkd2-java.itheima.net/image/avatar.png",
        mobile:'',
        regionId:'',
        regionName:'',
        status:'',//状态
      },
      // 运维人员和维修人员
      ywList:[],
      dialogTableVisible:false,
      // 修改人员
      dialogEditVisible:false,
       checked: true,
      // 弹框---
    };
  },
  props: {
    tableData: {
      type: Array,
    },
    tableHead: {
      type: Array,
    },
  },

  created() {
    console.log(this.tableData.id);
    
    this.getywPeople()
    this.getquyuList()
  },

  methods: {

     // 弹窗 获取运维人员和维修人员
    async getywPeople() {
      const res = await getywPeople()
      this.ywList = res
    },
    // 获取区域
    async getquyuList() {
      const res = await getquyuList(this.pageInfo)
      // console.log(res);
      this.quyuList = res.currentPageRecords
      // console.log(this.quyuList);
 
    },
    // 点击修改按钮
    amend(val) {
      // console.log(11);
      // console.log(val);
      // this.lineList = val
      this.form.regionName = val.regionName
      this.form.userName = val.userName
      this.dialogEditVisible = true
      console.log(this.lineList);
      
    },
    // 点击确定发送编辑
   async confirmFn() {
    
    const res = await editUserInfoApi(this.tableData.id,{
            userName: this.form.userName,
            roleId: this.form.role.roleId,
            mobile: this.form.mobile,
            regionId: this.form.regionId,
            regionName: this.form.regionId.regionName,
            status: this.form.status,
            image: this.form.image,
          }
          )
    console.log(res);
    },
    // 图片上传
      async handleAvatarSuccess(file) {
      console.log(file)
      var formData = new FormData()
      formData.append('fileName', file.file)
      console.log(formData)
      // const { data } = await getUserServeFileUploadApi(formData)
      // this.form.image = data
      // console.log(data)
    },
    // 校验图片
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100kb!')
      }
      return isJPG && isLt2M
    },
  },
};
</script>

<style scoped lang="less">
.form {
  margin-top: 30px;
  padding: 20px;
  width: 100%;
  height: 800px;
  background-color: #fff;
  .table {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .page {
    margin-top: 10px;
  }
  .btn_del{
    color: red;
  }
}
// 弹出框
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
// /弹出框
</style>
