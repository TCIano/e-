<template>
  <div>
    <Inputnavbar @searchContionTask="searchContionTask"></Inputnavbar>
    <form-item
      @Remove="getProduct"
      :tableData="taskList"
      :tableHead="tableHead"
    >
      <btn @add="showAddDept"></btn>
      <template #page>
        <pagination
          :pageInfo="pageInfo"
          @prevClick="prevClick"
          @nextClick="nextClick"
        ></pagination>
      </template>
    </form-item>
    <!-- 添加新增商品类型弹层 -->
    <AddDept :visible="dialogVisible" :currentNode="currentNode"></AddDept>
  </div>
</template>

<script>
import FormItem from "./components/form-add-del.vue";
import Inputnavbar from "./components/Inputnavbar.vue";
import btn from "./components/btn.vue";
import pagination from "./components/pagination.vue";
import AddDept from "./components/add-dept.vue";
import { getproductApi } from "@/api/product";
export default {
  components: {
    FormItem,
    Inputnavbar,
    pagination,
    btn,
    AddDept,
  },
  data() {
    return {
      taskList: [],
      dialogVisible: false,
      pageInfo: {
        pageIndex: 1, //页数
        totalPage: null, //总页数
        totalCount: null,
      },
      tableHead: [
        {
          column_name: "className",
          column_comment: "商品类型名称",
        },
      ],
      currentNode: {}
    };
  },

  created() {
    this.getProduct();
  },

  methods: {
    //获取商品类型列表
    async getProduct() {
      const res = await getproductApi();
      // console.log(res);
      this.taskList = res.currentPageRecords;
      // console.log(this.taskList);
      this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);
    },
    //获取下一页
    async nextClick() {
      this.getProduct({ pageIndex: `${this.pageInfo.pageIndex + 1}` });
    },
    //获取上一页
    async prevClick() {
      this.getProduct({ pageIndex: `${this.pageInfo.pageIndex - 1}` });
    },
    //条件搜索 工单
    searchContionTask(val) {
      console.log(val);
      this.getProduct(val);
    },
    showAddDept(val) {
    this.dialogVisible = true
    this.currentNode = val
    }
  },
};
</script>

<style scoped></style>
