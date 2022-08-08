<template>
  <div>
    <div class="title">
      <span>{{ uname }}：</span
      ><el-input style="width: 200px" placeholder="请输入" /><el-button class="btn"
        style="margin-left: 25px"
        icon="el-icon-search"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  methods: {},
  props: {
    uname: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
}
.btn{
    background-color: #5F84FF;
    color: #fff;
}
</style>
