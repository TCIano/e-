<template>
  <div>
    <inputForm :inputInfo="inputInfo" @searchContionTask="searchContionTask" />
    <btn />
    <el-button type="primary" class="setting" @click="upFn">导入数据</el-button>

    <inform
      :tableHead="tableHead"
      :tableData="productList"
      :pageIndex="pageInfo.pageIndex"
    >
      <getupdate :visible.sync="dialogVisible" />
      <template v-slot:image>
        <el-avatar
          size="medium"
          v-for="item in productList"
          :key="item.skuId"
          :src="item.skuImage"
        ></el-avatar>
      </template>
      <template v-slot:options="scope">
        <el-button type="text" @click="editFn(scope)">修改</el-button>
      </template>
    </inform>
    <page :pageInfo="pageInfo" @prevClick="prevClick" @nextClick="nextClick">
    </page>
  </div>
</template>

<script>
import inputForm from "./Inputsearch.vue";
import btn from "@/components/button";
import inform from "./form/index.vue";
import page from "@/components/pageItem/index.vue";
import getupdate from "./update.vue";
import { manageProductApi } from "@/api/product";
export default {
  data() {
    return {
      productList: [],
      dialogVisible: false,
      pageInfo: {
        pageIndex: 1,
        totalPage: null,
        totalCount: null,
      },
      inputInfo: {
        one: "商品搜索",
      },
      tableHead: [
        { column_name: "skuName", column_comment: "商品名称" },
        // { column_name: "skuImage", column_comment: "商品图片" },
        { column_name: "brandName", column_comment: "品牌" },
        { column_name: "unit", column_comment: "规格" },
        { column_name: "price", column_comment: "商品价格" },
        { column_name: "skuClass.className", column_comment: "商品类型" },
        { column_name: "createTime", column_comment: "创建日期" },
      ],
    };
  },

  components: {
    inputForm,
    btn,
    inform,
    page,
    getupdate,
  },

  created() {
    this.getmanageproduct();
  },

  methods: {
    async getmanageproduct(val) {
      const res = await manageProductApi(val);
      console.log(res);
      res.currentPageRecords.forEach((item) => {
        item.createTime = item.createTime.replace(/-/g, ".");
        item.createTime = item.createTime.replace(/T/g, " ");
      });
      this.productList = res.currentPageRecords;
      this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);
    },
    prevClick() {
      this.getmanageproduct({ pageIndex: `${this.pageInfo.pageIndex - 1}` });
    },
    nextClick() {
      this.getmanageproduct({ pageIndex: `${this.pageInfo.pageIndex + 1}` });
    },
    upFn() {
      this.dialogVisible = true;
    },
    async searchContionTask(val) {
      const res = await manageProductApi({
        skuName: val.taskCode,
      });
      console.log(val);
      this.productList = res.currentPageRecords;
      console.log(res);
    },
    editFn() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.setting {
  border: 0;
  background-color: rgb(251, 244, 240) !important;
  color: black;
}
</style>
