<template>
  <div class="form">
    <slot />
    <el-table
      class="table"
      :data="tableData"
      stripe
      style="width: 100%; text-align: center"
    >
      <el-table-column prop="date" type="index" label="序号"> </el-table-column>
      <el-table-column
        :prop="item.column_name"
        :label="item.column_comment"
        v-for="(item, index) in tableHead"
        :key="index"
      >
      </el-table-column>

      <!-- 操作区域 -->
      <el-table-column fixed="right" label="操作">
        <template>
          <slot name="options"></slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插槽 -->
    <slot name="page" class="page"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskType: ["自动 ", "手动"],
    };
  },
  props: {
    tableData: {
      type: Array,
    },
    tableHead: {
      type: Array,
    },
  },

  created() {},

  methods: {},
};
</script>

<style scoped lang="less">
.form {
  margin-top: 30px;
  padding: 20px;
  width: 100%;
  height: 800px;
  background-color: #fff;
  .table {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .page {
    margin-top: 10px;
  }
}
</style>
