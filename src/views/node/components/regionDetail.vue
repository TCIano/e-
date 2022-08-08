<template>
  <div>
    <!-- 详情弹窗 -->
    <el-dialog
      title="区域详情"
      :visible="visible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="top">
        <span>区域名称：{{ currentDetail.name }}</span>
        <span></span>
      </div>
      <div class="footer">
        <span>包含点位：</span>
        <!-- 表格 -->
        <el-table :data="currentNode" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="name" label="点位名称"></el-table-column>
          <el-table-column label="设备数量" prop="vmCount"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FormItem from "@/components/form";
export default {
  data() {
    return {};
  },
  components: {
    FormItem,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    //当前详情
    currentDetail: {
      type: Object,
    },
    currentNode: {
      type: Array,
    },
  },
  created() {},

  methods: {
    //关闭弹窗
    handleClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped lang="less">
// border-radius: 20px;
.top {
  margin-bottom: 50px;
}
.footer {
  display: flex;
}
</style>
