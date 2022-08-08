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
      <!-- <el-table-column prop="role.roleName" label="角色"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column> -->

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope" >
          <el-button type="text" size="small"  @click="Details(scope.row)"
            >查看详情</el-button
          >
          
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插槽 -->
    <slot name="page" class="page"></slot>

<!-- 弹出层 -->
  <el-dialog title="工单详情" :visible.sync="dialogTableVisible">
    <div class="tou">
      <div class="tou">
        <img src="../../../assets/orderxiangq/icon_cg.png" alt="" />
        <span style="margin-left: 20px">出货成功</span>
      </div>
      <img
        src="../../../assets/orderxiangq/chenggong.png"
        alt=""
        class="img-right"
      />
    </div>
    <el-row>
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <span>订单编号: </span>
          <span>{{obj.orderNo}}</span>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple-light">
          <span>商品名称: </span>
          <span>{{obj.skuName}}</span>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <span>订单金额: </span>
          <span>{{obj.price}}</span>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple-light">
          <span>设备编号：</span>
          <span>{{obj.innerCode}}</span>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <span>创建时间：</span>
          <span>{{obj.createTime}}</span>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple-light">
          <span>完成时间：</span>
          <span>{{obj.updateTime | formatDate}}</span>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <span>支付方式：</span>
          <span>{{obj.payType}}</span>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple-light">
          <span>设备地址：</span>
          <span>{{obj.addr}}</span>
        </div></el-col
      >

     
    </el-row>
  </el-dialog>
  <!-- /弹出层  -->
  
  </div>
</template>

<script>

export default {
  name: "listFrom",
  data() {
    return {
      dialogTableVisible: false,
      obj:{},
      
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
    
  },

  methods: {
  Details(val) {
    console.log(val);
    
      if(val.payType == 0) {
        val.payType = '支付宝支付'
      } else {
        val.payType = '微信支付'
      }
    
    this.obj = val
    this.dialogTableVisible = true
  }
}
}
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
.grid-content{
  margin-top: 15px;
}

</style>
