<template>
  <div>
    <input-form
      isSingle="false"
      :inputInfo="inputInfo"
      @searchContionTask="searchContionTask"
    >
    </input-form>

    <form-item :tableHead="tableHead" :tableData="taskList">
      <!-- 新建 -->
      <btn></btn>
      <template #options>
        <el-button type="text" size="mini" @click="showDetail"
          >查看详情</el-button
        >
        <el-button type="text" size="mini">修改</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
      <!-- //分页? -->
      <template #page>
        <PageItem
          :pageInfo="pageInfo"
          @prevClick="prevClick"
          @nextClick="nextClick"
        ></PageItem>
      </template>
    </form-item>
  </div>
</template>

<script>
import regionDetail from "./components/regionDetail.vue";
import pageItem from "@/components/pageItem";
import InputForm from "@/components/InputFrom";
import FormItem from "@/components/form";
import btn from "@/components/button";
import PageItem from "@/components/pageItem/index.vue";
import { getRegionApi } from "@/api";
export default {
  data() {
    return {
      pageInfo: {
        pageIndex: 1, //页数
        totalPage: null, //总页数
        totalCount: null,
      },
      //输入框label
      inputInfo: {
        one: "区域搜索",
        two: "789",
      },
      //表头数据
      tableHead: [
        {
          column_name: "name",
          column_comment: "区域名称",
        },
        {
          column_name: "nodeCount",
          column_comment: "点位数",
        },
        {
          column_name: "remark",
          column_comment: "备注说明",
        },
      ],
      //表单数据
      taskList: [],
    };
  },
  components: {
    pageItem,
    InputForm,
    FormItem,
    btn,
    PageItem,
    regionDetail,
  },
  created() {
    this.getRegion();
  },

  methods: {
    //区域列表
    async getRegion(contion) {
      const res = await getRegionApi(contion);
      console.log(res);
      this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);
      this.taskList = res.currentPageRecords;
    },
    // //获取下一页
    async nextClick() {
      this.getRegion({ pageIndex: `${this.pageInfo.pageIndex + 1}` });
    },
    //上一页
    async prevClick() {
      this.getRegion({ pageIndex: `${this.pageInfo.pageIndex - 1}` });
    },
    //条件搜索
    searchContionTask(val) {
      const name = val.taskCode;
      console.log(name);
      this.getRegion({
        name,
      });
    },
  },
};
</script>

<style scoped></style>
