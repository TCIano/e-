<template>
  <el-button 
  type="primary" 
  @click.native="addbtns"
  icon="el-icon-plus">新建</el-button>
</template>

<script>
import { getproductApi } from "@/api/product";
export default {
  data() {
    return {};
  },

  created() {},

  methods: {
  async addbtns() {
  const { currentPageRecords } = await getproductApi();
  this.$emit('add', currentPageRecords)
  // console.log(currentPageRecords);
  },
  },
};
</script>

<style scoped>
.el-button {
  border: 0;
  background: linear-gradient(135deg, rgb(255, 151, 67), rgb(255, 94, 32));
}
</style>
