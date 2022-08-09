<template>
  <el-dialog
    @close="onClose"
    :title="dialogTitle"
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
import { addProductApi, setProductApi, editProductApi } from "@/api/product";
export default {
  data() {
    //校验商品类名是否重复
    const checkDeptName = (rule, value, callback) => {
      // console.log(this.currentNode);
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

  computed: {
    dialogTitle() {
      return this.form.classId ? "修改商品类型" : "新增商品类型";
    },
  },

  created() {},

  methods: {
    //关闭弹层
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields();
      this.form = {className: "",}
    },
    //点击添加确定
    async onSave() {
      await this.$refs.form.validate();
      console.log(this.form.classId);
      if (this.form.classId) {
        //发送修改请求
        console.log("修改");
        await editProductApi(this.form.classId, this.form);
        this.$message.success("修改成功");
        this.onClose();
        this.$emit("add-success");
      } else {
        //发送新增请求
        try {
          await addProductApi(this.form);
          this.$message.success("添加商品类名成功");
          this.onClose();
          this.$emit("add-success");
        } catch (error) {
          this.$message.error("添加商品类名失败");
        }
      }
    },
    async getDeptById(id) {
      // console.log(5566);
      console.log(id);
      // console.log(res);
      this.form = await setProductApi(id);
      console.log(this.form);
    },
  },
};
</script>

<style scoped lang="less"></style>
