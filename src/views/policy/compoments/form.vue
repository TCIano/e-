<template>
  <div class="form">
    <!-- 新建按钮 -->
    <btn @click.native="dialogVisible= true"></btn>
    <!-- 表单 -->
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
      <!-- <el-table-column prop="role.roleName" label="角色"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column> -->

      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="details(scope.row)" >查看详情</el-button>
          <el-button type="text" size="small" @click="editPolicyBtn(scope.row)">修改</el-button>
          <el-button
            type="text"
            size="small"
            class="btn_del"
            @click="$emit('deleteListPeople')"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页插槽 -->
    <slot name="page" class="page"></slot>

    <!-- 新增弹出层 -->
    <el-form label-width="80px">
    <el-dialog
      title="新增策略"
      :visible.sync="dialogVisible"
      width="45%"
      
    >
      <el-form-item label="策略名称">
    <el-input v-model="addform.policyName"></el-input>
  </el-form-item>
  <!-- 计数器 -->
  <el-form-item label="策略方案">
    <el-input-number v-model="addform.discount" controls-position="right"  :min="1" :max="100" ></el-input-number>
      </el-form-item>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPolicyFn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    </el-form>
    <!-- /新增弹出层 -->

    <!-- 编辑弹出层 -->
    <el-form label-width="80px">
    <el-dialog
      title="编辑策略"
      :visible.sync="dialogEditVisible"
      width="45%"
      
    >
      <el-form-item label="策略名称">
    <el-input v-model="editform.policyName"></el-input>
  </el-form-item>
  <!-- 计数器 -->
  <el-form-item label="策略方案">
    <el-input-number v-model="editform.discount" controls-position="right"  :min="1" :max="100" ></el-input-number>
      </el-form-item>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPolicyFn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    </el-form>
    <!-- /编辑弹出层 -->

    <!-- 查看详情弹出层 -->
     <el-form label-width="80px">
    <el-dialog
      title="策略详情"
      :visible.sync="visible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="top">
        <span>区域名称:{{clickeditlist.policyName}}</span>
        <span></span>
      </div>
      <div class="footer">
        <span>策略方案：</span>
        <!-- 表格 -->
        <el-table :data="dialogList " style="width: 80%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="nodeName" label="点位名称"></el-table-column>
          <el-table-column label="设备编号" prop="innerCode"></el-table-column>
        </el-table>
      </div>

      <!-- //分页 -->
        <!-- <pageItem
          :page="pageInfo" @changePage="changePage"
        ></pageItem> -->
      
    </el-dialog>
    
        
     </el-form>
    <!-- /查看详情弹出层 -->
  </div>
</template>

<script>
// import pageItem from "@/components/pageIndex";
import btn from "@/components/button";
import { lookPolicyApi } from '@/api/policy'
export default {
  name: "policyFrom",
  data() {
    return {
        dialogVisible :false,
        dialogEditVisible:false,
        addform:{
        policyName:'',
        discount:''
        },
        // 修改
        editform:{
        policyName:'',
        discount:'',
        policyId:''
        },
        // 点击修改列表
        clickeditlist:[],
        //弹窗的 详情列表
        dialogList:[],
        // 弹窗状态
        visible:false,
        // 
         pageInfo: {
        pageIndex: 1, //页数
        totalPage: null, //总页数
        totalCount: null,
      },
      row:''
    };
  },
  components: {
    btn,
    // pageItem9`
  },
  props: {
    tableData: {
      type: Array,
    },
    tableHead: {
      type: Array,
    },
    pageInfo:{
        type: Object,
    }
  },

  created() {
    console.log(this.pageInfo);
  },

  methods: {
    //添加 弹窗里的按钮
    async addPolicyFn() {
        this.$emit('addPolicyBtn',this.addform)
      
       
        this.dialogVisible = false
    },
    //里层编辑 弹窗里的添加按钮
    editPolicyFn() {
        this.$emit('editPolicyBtn',this.editform)
        this.dialogEditVisible = false;
    },  
    //外层修改策略
   async editPolicyBtn(val) {
        // console.log(val);
        this.editform.policyId = val.policyId
        
        this.dialogEditVisible = true;
        
        
    },

    // 查看详情
   async details(val) {
    this.visible = true
        // console.log(val);
        this.clickeditlist = val
        console.log(this.clickeditlist.policyId);
        const res = await lookPolicyApi(this.clickeditlist.policyId,val)
        // console.log(res);

      //   this.pageInfo.pageIndex = parseInt(res.pageIndex);
      // this.pageInfo.totalPage = parseInt(res.totalPage);
      // this.pageInfo.totalCount = parseInt(res.totalCount);

        this.dialogList = res.currentPageRecords
        console.log(this.dialogList);

    },
  // // 切换分页
  //   changePage(newPage) {
  //     this.pageInfo.pageIndex = newPage;
  //     this.details();
  //   },

    //关闭弹窗
    handleClose() {
      this.visible = false
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
  .btn_del {
    color: red;
  }
}
.tou {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
}
.grid-content {
  margin-top: 15px;
}
.dialog-footer{
    display: flex;
    justify-content: center;
    margin: 0 auto;
}
.top {
  margin-bottom: 50px;
}
.footer {
  display: flex;
}
</style>
