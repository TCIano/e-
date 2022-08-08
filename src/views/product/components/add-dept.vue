<template>
  <el-dialog title="新增商品类型" :visible="visible" width="50%">
    <el-form
      :model="form"
      :rules="formRules"
      ref="form"
      label-width="80px"
      size="mini"
    >
      <el-form-item label="商品类型名称" prop="className">
        <el-input v-model="form.className" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        className: "",
      },
      formRules: {
        className: [
          { required: true, message: "请输入商品类型名称", trigger: "blur" },
        ],
      },
    };
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },

  created() {},

  methods: {},
};
</script>

<style scoped lang="less"></style>
