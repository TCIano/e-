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
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="合作商名称" prop="name">
          <el-input
            type="text"
            maxlength="10"
            show-word-limit
            v-model="ruleForm.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input
            maxlength="10"
            show-word-limit
            v-model="ruleForm.contact"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="mobile">
          <el-input
            type="text"
            maxlength="11"
            show-word-limit
            v-model="ruleForm.mobile"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="分成比例（%）" prop="ratio">
          <el-input-number
            style="width: 100%"
            v-model="ruleForm.ratio"
            controls-position="right"
            :min="0"
            :max="100"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="账号" prop="account" v-if="!ruleForm.id">
          <el-input
            type="text"
            maxlength="18"
            show-word-limit
            v-model="ruleForm.account"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!ruleForm.id">
          <el-input
            type="text"
            maxlength="20"
            show-word-limit
            v-model="ruleForm.password"
            placeholder="请输入"
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
import {
  addPartnerApi,
  addRegionApi,
  editPartnerApi,
  editRegionApi,
} from "@/api";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        account: "",
        password: "",
        ratio: null,
        contact: "",
        phone: "",
        mobile: "",
      },
      rules: {
        name: [{ max: 10, trigger: "change" }],
        account: [
          { max: 18, trigger: "change" },
          { required: true, message: "请输密码", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输密码", trigger: "blur" }],
        ratio: [],
        contact: [],
        phone: [],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1[2-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
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
        return "修改合作商";
      } else {
        return "新增合作商";
      }
    },
  },
  methods: {
    //关闭弹窗
    handleClose() {
      this.$emit("update:eAvisible", false);
      this.ruleForm = {
        name: "",
        account: "",
        password: "",
        ratio: null,
        contact: "",
        phone: "",
        mobile: "",
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
        await addPartnerApi(this.ruleForm);
        this.$message.success("添加成功");
        //更新操作
        // this.$emit("refreshData");
        // this.ruleForm = {
        //   regionName: "",
        //   remark: "",
        // };
      } else {
        // this.isEdit = false;
        await editPartnerApi(this.ruleForm.id, this.ruleForm);
        this.$message.success("修改成功");
      }
      this.$emit("refreshData");
      this.handleClose();
    },

    //获取父组件传递的信息
    getIptValue(val) {
      // console.log(val);

      this.ruleForm = val;
      this.ruleForm.ratio = val.ratio.replace(/%/g, "");
      // console.log(this.ruleForm.ratio);
    },
  },
};
</script>

<style scoped></style>
