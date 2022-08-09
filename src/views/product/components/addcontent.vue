<template>
  <div>
    <el-dialog
      title="新增设备类型"
      :visible="visible"
      width="50%"
      @close="onClose"
    >
      <el-form
        label-width="100px"
        label-position="right"
        :model="form"
        :rules="formRules"
        ref="form"
      >
        <el-form-item prop="name"
          ><span>商品名称：</span
          ><el-input
            placeholder="请输入"
            v-model="form.name"
            style="width: 400px"
          ></el-input
        ></el-form-item>
        <el-form-item prop="brandName"
          ><span>品牌：</span
          ><el-input
            placeholder="请输入"
            v-model="form.brandName"
            style="width: 427px"
          ></el-input
        ></el-form-item>
        <el-form-item prop="price"
          ><span>商品价格（元）：</span
          ><el-input-number
            v-model="form.price"
            style="width: 358px"
            controls-position="right"
            @change="handleChange"
            :min="0"
            :precision="2"
            :step="0.01"
          ></el-input-number
        ></el-form-item>
        <el-form-item prop="producttype">
          <span>商品类型：</span>
          <el-select
            v-model="form.producttype"
            placeholder="请选择"
            style="width: 400px"
          >
            <el-option
              v-for="item in producttypeList"
              :key="item.classId"
              :label="item.className"
              value="item.className"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="productsize"
          ><span>规格：</span
          ><el-input
            placeholder="请输入"
            v-model="form.productsize"
            style="width: 430px"
          ></el-input
        ></el-form-item>

        <el-form-item
          ><span>商品图片：</span>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            style="
              width: 150px;
              margin-left: 100px;
              margin-top: -40px;
              background-color: #f3f6fb;
            "
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="margin-left: 20px; color: #ccc; font-size: 14px">
            支持扩展名：xls、xlsx，文件不得大于1M
          </div>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="cancel" @click="onClose">取消</el-button>
      <el-button type="primary" class="confirm" @click="onConfirm"
        >确认</el-button
      >
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProductTypeApi, addProductFnApi } from "@/api/product";
// import { Pictuce, NewVendingMachines, iseditVendingMachine } from "@/api";
export default {
  name: "addContent",
  data() {
    return {
      producttypeList: [],
      form: {
        name: "",
        brandName: "",
        price: "",
        producttype: "",
        productsize: "",
      },
      formRules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          //   {
          //     validator: (rule, value, callback) => {
          //       console.log(this.val);
          //       const isRepeat = this.val.some((item) => {
          //         return item.name === value;
          //       });
          //       isRepeat ? callback(new Error("部门重复")) : callback()
          //     },
          //   },
        ],
        brandName: [
          { required: true, message: "请输入商品品牌", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "change" },
        ],
        producttype: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
        productsize: [
          { required: true, message: "请输入商品规格", trigger: "blur" },
        ],
      },
      imageUrl: "",
    };
  },

  created() {
    this.getProductType();
  },

  methods: {
    handleChange(value) {
      //   console.log(value);
    },
    async handleAvatarSuccess(file) {
      const formData = new FormData();
      formData.append("fileName", file.file);
      //   console.log(file.file);
      const res = await Pictuce(formData);
      console.log(res);
      this.form.image = res;
    },

    async handleAvatarSuccess(res, file) {
      this.fileName = URL.createObjectURL(file.raw);
      console.log(this.fileName);

      const data = await Pictuce({
        fileName: this.fileName,
      });
      console.log(data);
      // console.log(res);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // async send() {
    //   if (this.form.typeId) {
    //     await iseditVendingMachine(this.fand.typeId, this.form);
    //     this.$message.success("修改成功");
    //   } else {
    //     await NewVendingMachines(this.form);
    //     this.$message.success("添加成功");
    //     this.form = {
    //       vmRow: undefined,
    //       vmCol: undefined,
    //       channelMaxCapacity: 1,
    //       image: "",
    //       name: "",
    //       model: "",
    //     };
    //   }

    //   // console.log(data);
    //   this.Cancel();
    // },
    onClose() {
      //   console.log(111);
      this.$emit("update:visible", false);
    },
    async onConfirm() {
      //   this.$refs.upload.submit();
      await this.$refs.form.validate();
      console.log("表单校验成功");
      console.log(this.form);
      try {
        const res = await addProductFnApi(this.form);
        this.producttypeList = res.currentPageRecords;
        this.$message.success("新增部门成功");
      } catch (err) {
        this.$message.success("新增部门失败");
        console.dir(err);
      }
      this.onClose();
      this.$emit("addsuccess");
    },
    async getProductType() {
      const res = await getProductTypeApi();
      console.log(res);
      //   console.log(res.pageSize);
      res.pageSize = 200;
      this.producttypeList = res.currentPageRecords;
    },
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    fand: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.cancel {
  width: 100px;
  border: 0;
  background-color: rgb(251, 244, 240) !important;
  color: black;
  margin-top: 20px;
  margin-left: 280px;
}
.confirm {
  width: 100px;
  border: 0;
  background: linear-gradient(135deg, rgb(255, 151, 67), rgb(255, 94, 32));
  margin-left: 50px;
  margin-top: 20px;
}
</style>
