<template>
  <div style="text-align: center" class="my">
    <!-- 详情弹窗 -->
    <el-dialog
      title="区域详情"
      :visible="visible"
      width="40%"
      :before-close="handleClose"
      custom-class="dia"
    >
      <div class="top">
        <span>合作商名称：{{ currentNode.name }}</span>
        <span>联系人：{{ currentNode.contact }}</span>
      </div>
      <div class="footer">
        <span>联系电话：{{ currentNode.mobile }}</span>
        <span>分成比例：{{ currentNode.ratio }}</span>
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
      type: Object,
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

.dia {
  width: 200px;
  height: 200px;
  border-radius: 60px;
  .el-dialog__title {
    margin-left: -500px;
  }
  .top {
    margin: 70px;
    span {
      margin: 50px;
      font-size: 17px;
    }
  }
  .footer {
    margin: 70px;
    span {
      margin: 50px;
      font-size: 17px;
    }
  }
}
</style>
