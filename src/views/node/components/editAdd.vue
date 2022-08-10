<template>
  <div>
    <el-dialog
      :title="optionName"
      :visible="eAvisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="区域名称" prop="regionName">
          <el-input
            type="text"
            maxlength="15"
            show-word-limit
            v-model="ruleForm.regionName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark">
          <el-input
            maxlength="40"
            show-word-limit
            type="textarea"
            v-model="ruleForm.remark"
            placeholder="请输入备注（不能超过40个字）"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRegionApi, editRegionApi } from "@/api";
export default {
  data() {
    return {
      ruleForm: {
        regionName: "",
        remark: "",
      },
      rules: {
        regionName: [
          { required: true, message: "请输入区域名称", trigger: "blur" },
          { max: 15, trigger: "change" },
        ],
        remark: [
          { required: true, message: "请输入备注说明", trigger: "blur" },
          { max: 40, trigger: "change" },
        ],
      },
    };
  },
  props: {
    eAvisible: {
      type: Boolean,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  computed: {
    optionName() {
      if (this.ruleForm.id) {
        return "编辑区域";
      } else {
        return "新建区域";
      }
    },
  },
  methods: {
    //关闭弹窗
    handleClose() {
      this.$emit("update:eAvisible", false);
      this.ruleForm = {
        regionName: "",
        remark: "",
      };
    },
    //取消
    cancel() {
      this.handleClose();
    },
    //确认
    async confirm() {
      await this.$refs.ruleForm.validate();
      if (!this.ruleForm.id) {
        //添加
        await addRegionApi(this.ruleForm);
        this.$message.success("添加成功");
        //更新操作
        // this.$emit("refreshData");
        // this.ruleForm = {
        //   regionName: "",
        //   remark: "",
        // };
      } else {
        // this.isEdit = false;
        await editRegionApi(this.ruleForm.id, this.ruleForm);
        this.$message.success("修改成功");
      }
      this.$emit("refreshData");
      this.handleClose();
    },

    //获取父组件传递的信息
    getIptValue(val) {
      // console.log(val);
      this.ruleForm = val;
    },
  },
};
</script>

<style scoped></style>
