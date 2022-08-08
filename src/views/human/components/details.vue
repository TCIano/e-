<template>
  <el-dialog title="人员详情" :visible="visible" width="50%" @close="onClose">
    <div>
      <span>人员名称：</span>
      <span>角色：</span>
      <span>联系电话：</span>
      <span>负责区域：</span>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label=""> </el-table-column>
        <el-table-column
          prop="total"
          label="总工单数"
          style="background-color: red"
        >
        </el-table-column>
        <el-table-column prop="address" label="拒绝工单"> </el-table-column>
        <el-table-column prop="address" label="完成工单"> </el-table-column>
        <el-table-column prop="address" label="进行中工单"> </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer"> </span>
  </el-dialog>
</template>

<script>
import { getdetailsApi } from "@/api/request";
import { getUserInfo } from "@/api/user";
export default {
  data() {
    return {
      tableData: [
        {
          date: "本周",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "本月",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "本年",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
      ],
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    this.getdetails();
    this.getDetailsInfo();
  },

  methods: {
    async getdetails(val) {
      const res = await getdetailsApi(val);
      console.log(res);
    },
    async getDetailsInfo() {
      const res2 = await getUserInfo();
      console.log(res2);
    },
    onClose() {
      //   console.log(111);
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped lang="less"></style>
