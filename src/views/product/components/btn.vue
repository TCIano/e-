<template>
  <el-button type="primary" icon="el-icon-plus" @click="open">新建</el-button>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  methods: {
    open() {
      this.$prompt("商品类型名称:", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      });
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
