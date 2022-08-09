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
            
            :min="0"
            :precision="2"
            :step="1"
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
              :value="item.classId"
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

       <!-- 头像 -->
        <el-form-item label="头像:">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action=""
            :http-request="handleAvatarSuccess"
            
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              仅支持扩展名为jpg/png文件,且不超过100kb
            </div>
          </el-upload>
        </el-form-item>
        <!-- /头像 -->
      </el-form>
      <el-button type="primary" class="cancel" @click="onClose">取消</el-button>
      <el-button type="primary" class="confirm" @click="onConfirm"
        >确认</el-button
      >
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>

  <!-- 商品管理添加弹窗 -->
</template>

<script>
import { getProductTypeApi,getUserServeFileUploadApi,editProductshopping } from "@/api/product";

export default {
  name: "editContent",
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
    
    // 图片上传
    async handleAvatarSuccess(file) {
      console.log(file);
      var formData = new FormData();
      formData.append("fileName", file.file);
      console.log(formData);
      const res = await getUserServeFileUploadApi(formData)
      console.log(res);
      this.imageUrl = res
      console.log(res)
    },
   
    onClose() {
      this.$emit("update:visible", false);
    },

    // 确认按钮
    async onConfirm() {
      
      await this.$refs.form.validate();

    const res =  await editProductshopping (this.scopeRow.skuId,{
      skuName:this.form.name,
      brandName:this.form.brandName,
      price:this.form.price,
      unit:this.form.productsize,
      classId:this.form.producttype,
      skuImage:this.imageUrl,
      skuId:this.scopeRow.skuId
    })
    
    console.log(res);
      this.onClose();
      this.$emit("addsuccess");
    },

    // 新建里的商品类型
    async getProductType() {
      const res = await getProductTypeApi();
      console.log(res);
      
      res.pageSize = 200;
      this.producttypeList = res.currentPageRecords;
    },
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    scopeRow: {
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
