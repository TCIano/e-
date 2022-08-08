<template>
  <el-dialog title="数据导入" :visible="visible" width="30%" @close="onClose">
    <el-upload
      accept=".xls, .xlsx"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :auto-upload="false"
    >
      <span style="margin-left: 20px">标题：</span>
      <el-button
        size="large"
        type="primary"
        style="width: 250px; margin-left: 20px"
      >
        <i class="el-icon-upload"></i>
        点击上传</el-button
      >
      <div
        slot="tip"
        class="el-upload__tip"
        style="
          margin-left: 80px;
          color: #ccc;
          font-size: 14px;
          margin-top: 20px;
        "
      >
        支持扩展名：xls、xlsx，文件不得大于1M
      </div>
    </el-upload>
    <el-button type="primary" class="cancel" @click="onClose">取消</el-button>
    <el-button type="primary" class="confirm" @click="submitUpload"
      >确认</el-button
    >
    <span slot="footer" class="dialog-footer"> </span>
  </el-dialog>
</template>

<script>
// import { getdetailsApi } from "@/api/request";
// import { getUserInfo } from "@/api/user";

export default {
  data() {
    return {
      tableData: [],
      list: {},
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    // this.getdetails();
    // this.getDetailsInfo();
  },

  methods: {
    // async getdetails(val) {
    //   const res = await getdetailsApi(val);
    //   // console.log(res);
    // },
    // async getDetailsInfo(id) {
    //   const res2 = await getUserInfo(id);
    //   // console.log(res2);
    //   this.list = res2;
    //   // console.log(this.list);
    // },
    onClose() {
      //   console.log(111);
      this.$emit("update:visible", false);
    },
    submitUpload() {
      this.$emit("update:visible", false);
      this.$refs.upload.submit();
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
.cancel {
  width: 100px;
  border: 0;
  background-color: rgb(251, 244, 240) !important;
  color: black;
  margin-top: 20px;
  margin-left: 130px;
}
.confirm {
  width: 100px;
  border: 0;
  background: linear-gradient(135deg, rgb(255, 151, 67), rgb(255, 94, 32));
  margin-left: 50px;
  margin-top: 20px;
}
</style>
