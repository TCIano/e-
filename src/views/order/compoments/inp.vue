<template>
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <!-- <slot></slot> -->
      <el-form-item label="订单">
        <el-input
          placeholder="请输入"
          v-model="form.orderNo"
        ></el-input>
      </el-form-item>

        <el-form-item label="选择日期">
      <el-date-picker
      value-format="yyyy-MM-dd"
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
</el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="change"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { searchOrderList } from '@/api/order'
export default {
    name:"orderInput",
  data() {
    return {
      value1:[],
      form:{
        pageIndex:'',
        pageSize:'',
        orderNo:'123',
        startDate:'',
        endDate:''
      },
      
    };
  },
  props: {
    orderList:{
        type:Object,
    },
    pageSize:{
        type:String
    },
    pageIndex:{
        type:String
    },
  },
  created() {
    this.$store.commit('getOrderList',this.pageSize)
  },

  methods: {
   async change() {
        this.form.startDate = this.value1[0]
        this.form.endDate = this.value1[1]
        this.form.pageIndex = this.pageIndex
        this.form.pageSize = this.pageSize 
        // this.form.pageInList = this.pageInList


        const res =  await searchOrderList(this.form)
        console.log(res);
        res.currentPageRecords.forEach((item) => {
        
        item.createTime = item.createTime.replace(/-/g, ".");
        item.createTime = item.createTime.replace(/T/g, " ");
      });
         this.orderList = res.currentPageRecords;
    },
    
  }
};
</script>

<style scoped>
.search {
  background-color: #fff;
  width: 100%;
  height: 70px;
  /* line-height: 70px; */
  padding-top: 15px;
  padding-left: 15px;
  margin-bottom: 30px;
}
</style>
