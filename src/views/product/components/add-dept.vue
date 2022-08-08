<template>
  <el-dialog
    @close="onClose"
    title="新增商品类型"
    :visible="visible"
    width="50%"
  >
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
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="onSave" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addProductApi } from "@/api/product";
export default {
  data() {
    //校验商品类名是否重复
    const checkDeptName = (rule, value, callback) => {
      console.log(this.currentNode);
      const isRepeat = this.currentNode.some((item) => {
        return item.className === value;
      });
      if (isRepeat) return callback(new Error("商品类名重复"));
      callback();
    };
    return {
      form: {
        className: "",
      },
      //校验规则
      formRules: {
        className: [
          { required: true, message: "请输入商品类型名称", trigger: "blur" },
          { validator: checkDeptName, trigger: "blur" },
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
      type: Array,
      required: true,
    },
  },

  created() {},

  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
    async onSave() {
      await this.$refs.form.validate();
      try {
        await addProductApi(this.form);
        this.$message.success("添加商品类名成功");
        this.onClose();
        this.$emit('add-success')
      } catch (error) {
        this.$message.error('添加商品类名失败')
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
