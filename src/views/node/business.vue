<template>
  <div>
    <input-form
      isSingle="false"
      :inputInfo="inputInfo"
      @searchContionTask="searchContionTask"
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
        <el-button type="text" size="mini" @click="reset(scope)"
          >重置密码</el-button
        >
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
import editAdd from "./components/businessCom/editAdd.vue";
import regionDetail from "./components/businessCom/regionDetail.vue";
import pageItem from "@/components/pageItem";
import InputForm from "@/components/InputFrom";
import FormItem from "@/components/form";
import btn from "@/components/button";
import PageItem from "@/components/pageItem/index.vue";
import {
  delPartnerApi,
  delRegionApi,
  getNodeDetialById,
  getRegionApi,
  resetPassApi,
  searchPartnerApi,
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
        one: "合作商搜索",
      },
      //表头数据
      tableHead: [
        {
          column_name: "name",
          column_comment: "合作商名称",
        },
        {
          column_name: "account",
          column_comment: "账号",
        },
        {
          column_name: "vmCount",
          column_comment: "设备数量",
        },
        {
          column_name: "ratio",
          column_comment: "分成比例",
        },
        {
          column_name: "contact",
          column_comment: "联系人",
        },
        {
          column_name: "mobile",
          column_comment: "联系电话",
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
    //区域列表
    async getRegion(contion) {
      this.loading = true;
      const res = await searchPartnerApi({
        pageIndex: this.pageInfo.pageIndex,
        pageSize: 10,
        name: contion,
      });
      // console.log(res);
      this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);
      this.taskList = res.currentPageRecords;
      this.taskList.forEach((item) => (item.ratio = item.ratio + "%"));
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
      const name = val.taskCode;
      // console.log(name);
      this.getRegion(name);
    },
    //区域详情
    async showDetail({ scope }) {
      // console.log(scope);
      this.visible = true;

      // console.log(res);
      this.currentNode = scope.row;
      // console.log(this.currentNode);
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
      const currentDetail = scope.row;
      // 变为编辑状态;
      console.log(this.$refs.editInfo);
      const ruleForm = {};
      ruleForm.id = currentDetail.id;
      ruleForm.name = currentDetail.name;
      ruleForm.account = currentDetail.account;
      ruleForm.password = currentDetail.password;
      ruleForm.ratio = currentDetail.ratio;
      ruleForm.contact = currentDetail.contact;
      ruleForm.phone = currentDetail.phone;
      ruleForm.mobile = currentDetail.mobile;
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
        await delPartnerApi(scope.row.id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        //更新数据
        this.getRegion();
      });
    },
    //重置密码
    reset({ scope }) {
      this.$confirm("即将重置密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await resetPassApi(scope.row.id);
          this.$message({
            type: "success",
            message: "重置成功!",
          });
          this.getRegion();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "重置失败",
          });
        });
    },
  },
};
</script>

<style scoped></style>
