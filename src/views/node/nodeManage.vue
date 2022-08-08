<template>
  <div>
    <input-form :inputInfo="inputInfo" @searchContionTask="searchContionTask">
    </input-form>

    <form-item
      :tableHead="tableHead"
      :tableData="taskList"
      :pageIndex="pageInfo.pageIndex"
      v-loading="loading"
    >
      <!-- 新建 -->
      <btn @click.native="createRegion"></btn>
      <template #options="scope">
        <el-button type="text" size="mini" @click="showDetail(scope)"
          >查看详情</el-button
        >
        <el-button type="text" size="mini" @click="editRegion(scope)"
          >修改</el-button
        >
        <el-button size="mini" type="danger" @click="delRegion(scope)"
          >删除</el-button
        >
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
    <!-- 详情弹窗组件 -->
    <region-detail
      :visible.sync="visible"
      :currentDetail="currentDetail"
      :currentNode="currentNode"
    ></region-detail>

    <!-- //添加删除弹窗 -->
    <edit-add
      :eAvisible.sync="eAvisible"
      @refreshData="getRegion()"
      :isEdit="isEdit"
      ref="editInfo"
    >
    </edit-add>
  </div>
</template>

<script>
import editAdd from "./components/editAdd.vue";
import regionDetail from "./components/regionDetail.vue";
import pageItem from "@/components/pageItem";
import InputForm from "@/components/InputFrom";
import FormItem from "@/components/form";
import btn from "@/components/button";
import PageItem from "@/components/pageItem/index.vue";
import {
  delRegionApi,
  getNodeApi,
  getNodeDetialById,
  getRegionApi,
} from "@/api";
export default {
  data() {
    return {
      loading: false,
      //弹窗状态
      visible: false,
      eAvisible: false,
      pageInfo: {
        pageIndex: 1, //页数
        totalPage: null, //总页数
        totalCount: null,
      },
      //输入框label
      inputInfo: {
        one: "点位搜索",
        two: "区域搜索",
      },
      //表头数据
      tableHead: [
        {
          column_name: "name",
          column_comment: "点位名称",
        },
        {
          column_name: "region.name",
          column_comment: "所在区域",
        },
        {
          column_name: "businessType.name",
          column_comment: "商圈类型",
        },
        {
          column_name: "ownerName",
          column_comment: "合作商",
        },
        {
          column_name: "addr",
          column_comment: "详细地址",
        },
      ],
      //表单数据
      taskList: [],
      //当前点击id
      currentDetail: {},
      //当前点位
      currentNode: [],
      isEdit: true, //是否为 编辑
    };
  },
  components: {
    pageItem,
    InputForm,
    FormItem,
    btn,
    PageItem,
    regionDetail,
    editAdd,
  },
  created() {
    this.getRegion();
  },

  methods: {
    //点位列表
    async getRegion(contion) {
      this.loading = true;
      const res = await getNodeApi(contion);
      //   getNodeApi()
      // console.log(res);
      this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);
      this.taskList = res.currentPageRecords;
      this.taskList.forEach((item) => {
        item.addr = "1";
      }),
        (this.loading = false);
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
      // console.log(name);
      this.getRegion({
        name,
      });
    },
    //区域详情
    async showDetail({ scope }) {
      // console.log(scope);
      this.visible = true;
      // 拿到当前索引
      console.log(this.taskList[scope.$index]);
      this.currentDetail = this.taskList[scope.$index];
      //通过id拿到点位信息

      const res = await getNodeDetialById({
        regionId: this.currentDetail.id,
      });
      // console.log(res);
      this.currentNode = res.currentPageRecords;
      console.log(this.currentNode);
    },
    //新建
    createRegion() {
      this.eAvisible = true;
    },
    //编辑
    editRegion({ scope }) {
      this.eAvisible = true;
      // console.log(scope);
      // 拿到当前索引
      // console.log(this.taskList[scope.$index]);
      const currentDetail = this.taskList[scope.$index];
      // 变为编辑状态;
      this.isEdit = true;
      console.log(this.$refs.editInfo);
      const ruleForm = {};
      ruleForm.id = currentDetail.id;
      ruleForm.regionName = currentDetail.name;
      ruleForm.remark = currentDetail.remark;
      // console.log(ruleForm);
      this.$refs.editInfo.getIptValue(ruleForm);
    },
    //删除
    delRegion({ scope }) {
      //获取当前id
      // console.log(this.taskList[scope.$index]);
      console.log(scope);
      this.$confirm("此操作将永久删除该区域, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await delRegionApi(this.taskList[scope.$index].id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        //更新数据
        this.getRegion();
      });
    },
  },
};
</script>

<style scoped></style>
