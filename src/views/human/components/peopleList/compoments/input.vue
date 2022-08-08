<template>
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <!-- <slot></slot> -->
      <el-form-item label="工单编号">
        <el-input
          placeholder="请输入"
          v-model="people"
        ></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button
          type="primary"
          @click.native="$emit('searchContionList', people)"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people:''
    };
  },
  props: {
    option: {
      type: Array,
    //   required: true,
    },
  },
  created() {},

  methods: {},
};
</script>

<style scoped>
.search {
  background-color: #fff;
  width: 100%;
  height: 70px;
  /* line-height: 70px; */
  padding-top: 15px;
  padding-left: 15px;
  margin-bottom: 30px;
}
</style>
