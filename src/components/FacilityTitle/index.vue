<template>
  <div>
    <div class="title">
      <span>{{ uname }}：</span
      ><el-input
        style="width: 200px"
        v-model="value"
        placeholder="请输入"
      /><el-button
        class="btn"
        style="margin-left: 25px"
        icon="el-icon-search"
        @click.native="clickFn"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },

  created() {},

  methods: {
    clickFn() {
      this.$emit("getSou", this.value);
    },

  },
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
.btn {
  background-color: #5f84ff;
  color: #fff;
}
</style>
