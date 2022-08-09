<template>
  <div>
    <inputForm
      :inputInfo="inputInfo"
      :option="option"
      @searchContionTask="searchContionTask"
    />
    <inform
      :tableHead="tableHead"
      :tableData="taskList"
      :pageIndex="pageInfo.pageIndex"
    >
      <template v-slot:options="scope">
        <el-button type="text" @click="onDetails(scope)">查看详情</el-button>
      </template>
      <template v-slot:page>
        <page
          :pageInfo="pageInfo"
          @prevClick="prevClick"
          @nextClick="nextClick"
        >
        </page>
      </template>
      <getdetails :visible.sync="dialogVisible" ref="detail" :taskList="taskList" :userId="userId"/>
    </inform>
  </div>
</template>

<script>
import { getSearchApi } from "@/api/request";
import inputForm from "@/components/InputFrom";
import inform from "@/components/form/index.vue";
import page from "@/components/pageItem/index.vue";
import getdetails from "./details.vue";
import { searchUserWork } from "@/api/table";
export default {
  data() {
    return {
      dialogVisible: false,
      taskList: [],
      // id: null,
      inputInfo: {
        one: "人员搜索",
        two: "角色",
      },
      option: [{ label: "运营员" }, { label: "维修员" }],
      tableHead: [
        { column_name: "userName", column_comment: "人员名称" },
        { column_name: "roleName", column_comment: "角色" },
        { column_name: "mobile", column_comment: "联系电话" },
        { column_name: "workCount", column_comment: "完成工单（本月）" },
        { column_name: "progressTotal", column_comment: "进行中工单" },
        { column_name: "cancelCount", column_comment: "拒绝工单（本月）" },
      ],
      pageInfo: {
        pageIndex: 1,
        totalPage: null,
        totalCount: null,
      },
      userId:'1'
    };
  },

  components: {
    inputForm,
    inform,
    page,
    getdetails,
  },

  created() {
    this.getuserwork();
  },

  methods: {
    async getuserwork(val) {
      const res = await searchUserWork(val);
      console.log(res);
      this.taskList = res.currentPageRecords;
      this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);
    },
    prevClick() {
      this.getuserwork({ pageIndex: `${this.pageInfo.pageIndex - 1}` });
    },
    nextClick() {
      this.getuserwork({ pageIndex: `${this.pageInfo.pageIndex + 1}` });
    },
    async searchContionTask(val) {
      const res = await getSearchApi({
        userName: val.userName,
        isRepair: val.status === "运营员" ? false : true,
      });
      console.log(res);
      this.taskList = res.currentPageRecords;
      // console.log(res);
    },
    onDetails(val) {
      this.userId = val.scope.row.userId.toString()
      // console.log(val.scope.row.userId);
      this.dialogVisible = true;
      const id = val.scope.row.userId;
      this.$refs.detail.getDetailsInfo(id);
      // console.log(val.scope.$index);
    },
  },
};
</script>

<style scoped lang="less"></style>
