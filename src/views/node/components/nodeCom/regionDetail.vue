<template>
  <div>
    <!-- 详情弹窗 -->
    <el-dialog
      title="点位详情"
      :visible="visible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="footer">
        <!-- 表格 -->
        <el-table :data="currentNode" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="innerCode" label="机器编号"></el-table-column>
          <el-table-column label="设备状态" prop="vmStatus"></el-table-column>
          <el-table-column
            label="最后一次供货时间"
            prop="lastSupplyTime"
          ></el-table-column>
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
      type: String,
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
</style>
