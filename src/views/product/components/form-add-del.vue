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
        v-for="item in tableHead"
        :key="item.classId"
      >
      </el-table-column>
      <!-- <el-table-column :prop="createType" label="工单方式"> </el-table-column> -->

      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="scoped">
          <el-button type="text" size="small">修改</el-button>
          <el-button 
          type="text" 
          size="small" 
          @click.native="onRemove(scoped)"
          style="color: red;">删除</el-button>
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

  methods: {
  onRemove(id) {
  console.log(id.row.classId);

  }
  },
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