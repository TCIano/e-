<template>
  <div>
    <inputForm :inputInfo="inputInfo" @searchContionTask="searchContionTask" />
    <btn @click.native="addFn" />
    <el-button type="primary" class="setting" @click="upFn">导入数据</el-button>
    <addContent :visible.sync="addVisible" />

    <inform
      :tableHead="tableHead"
      :tableData="productList"
      :pageIndex="pageInfo.pageIndex"
    >
      <getupdate :visible.sync="dialogVisible" />
      <template v-slot:image="{ scope }">
        <el-avatar size="medium" :src="scope.row.skuImage"></el-avatar>
      </template>
      <template v-slot:options="scope">
        <el-button type="text" @click="editFn(scope)">修改</el-button>
      </template>
    </inform>
    <page :pageInfo="pageInfo" @prevClick="prevClick" @nextClick="nextClick">
    </page>
    <!-- 编辑弹窗 -->
    <editContent :visible.sync="editVisible" :scopeRow="scopeRow" />
    <!-- /弹窗 -->
  </div>

  <!-- 商品管理主页 -->
</template>

<script>
import addContent from "./addcontent.vue";
import editContent from "./editDialog.vue";
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
      scopeRow: {},
      dialogVisible: false,
      editVisible: true,
      addVisible: false,
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
    addContent,
    editContent,
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
    editFn(val) {
      console.log(val.scope.row);
      this.scopeRow = val.scope.row;
      this.editVisible = true;
    },
    addFn() {
      this.addVisible = true;
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
