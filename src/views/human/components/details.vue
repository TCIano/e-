<template>
  <el-dialog title="人员详情" :visible="visible" width="50%" @close="onClose">
    <div class="container">
      <span>人员名称：{{ list.userName }} </span>
      <span>角色：{{ list.roleName }} </span>
      <span>联系电话：{{ list.mobile }} </span>
    </div>
    <span>负责区域：{{ list.regionName }}</span>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label=""> </el-table-column>
        <el-table-column
          prop="total"
          label="总工单数"
          style="background-color: red"
        >
        </el-table-column>
        <el-table-column prop="refuse" label="拒绝工单"> </el-table-column>
        <el-table-column prop="achive" label="完成工单"> </el-table-column>
        <el-table-column prop="doing" label="进行中工单"> </el-table-column>
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
          total: "1",
          refuse: "1",
          achive: "1",
          doing: "1",
        },
        {
          date: "本月",
          total: "1",
          refuse: "1",
          achive: "1",
          doing: "1",
        },
        {
          date: "本年",
          total: "1",
          refuse: "1",
          achive: "1",
          doing: "1",
        },
      ],
      list: {},
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
    },
  },

  created() {
    this.getdetails();
    // this.getDetailsInfo();
  },

  methods: {
    async getdetails(val) {
      const res = await getdetailsApi(val);
      // console.log(res);
    },
    async getDetailsInfo(id) {
      const res2 = await getUserInfo(id);
      // console.log(res2);
      this.list = res2;
      // console.log(this.list);
    },
    onClose() {
      //   console.log(111);
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
span {
  margin-bottom: 20px;
}
</style>
