<template>
  <div>
    <input-form
      :inputInfo="inputInfo"
      @searchContionTask="searchContionTask"
      :option="option"
    >
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
import editAdd from "./components/nodeCom/editAdd.vue";
import regionDetail from "./components/nodeCom/regionDetail.vue";
import pageItem from "@/components/pageItem";
import InputForm from "@/components/InputFrom";
import FormItem from "@/components/form";
import btn from "@/components/button";
import PageItem from "@/components/pageItem/index.vue";
import {
  delNodeApi,
  delRegionApi,
  getNodeApi,
  getNodeDetialById,
  getRegionApi,
  nodeDetailApi,
} from "@/api";
import { optionData } from "@/utils";
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
      currentDetail: "",
      //当前点位
      currentNode: [],
      isEdit: true, //是否为 编辑
      //多选框内容
      option: [],
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
      const region = await getRegionApi({
        pageIndex: "1",
        pageSize: "100000",
      });
      // console.log(region);
      region.currentPageRecords.forEach((item) => (item.label = item.name));
      this.option = region.currentPageRecords;
      // console.log(this.option);
      //传递给输入框数据
      //   getNodeApi()
      // console.log(res);
      this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);
      const list = res.currentPageRecords;
      list.forEach((item) => {
        item.addr = optionData(item.addr);
      }),
        (this.taskList = list);
      this.loading = false;
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
      console.log(val);
      const name = val.taskCode;
      const regionId = val.status;
      // console.log(name);
      this.getRegion({
        name,
        regionId,
      });
    },
    //区域详情
    async showDetail({ scope }) {
      console.log(scope.row);
      this.visible = true;
      // 拿到当前索引
      this.currentDetail = scope.row.id;
      //通过id拿到点位信息

      const res = await nodeDetailApi(this.currentDetail);

      this.currentNode = res;
      this.currentNode.forEach((item) => {
        if (item.vmStatus === 0) {
          item.vmStatus = "未投放";
        } else if (item.vmStatus === 1) {
          item.vmStatus = "运营";
        } else if (item.vmStatus === 3) {
          item.vmStatus = "撤机";
        } else {
          item.vmStatus = "未知状态";
        }
        item.lastSupplyTime = item.lastSupplyTime.replace(/-/g, ".");
        item.lastSupplyTime = item.lastSupplyTime.replace(/T/g, " ");
      });
      console.log(this.currentNode);
    },
    //新建
    createRegion() {
      this.eAvisible = true;
    },
    //编辑
    editRegion({ scope }) {
      this.eAvisible = true;
      // 拿到当前索引
      const currentDetail = scope.row;

      // console.log(currentDetail);
      // 变为编辑状态;
      const ruleForm = {};
      ruleForm.id = currentDetail.id;
      ruleForm.name = currentDetail.name;
      ruleForm.addr = currentDetail.addr;
      ruleForm.regionId = currentDetail.regionId;
      ruleForm.businessId = currentDetail.businessId;
      ruleForm.ownerName = currentDetail.ownerName;
      ruleForm.ownerId = currentDetail.ownerId;
      ruleForm.areaCode = currentDetail.areaCode;
      ruleForm.createUserId = currentDetail.createUserId;

      // console.log(ruleForm);
      // const index = scope.$index;
      this.$refs.editInfo.getIptValue(ruleForm, scope.row);
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
        await delNodeApi(scope.row.id);
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
