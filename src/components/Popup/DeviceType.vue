<template>
  <div>
    <el-dialog
      title="新增设备类型"
      :visible="isShow"
      width="50%"
      @close="Cancel"
    >
      <el-form label-width="50px">
        <el-form-item
          ><span>型号名称：</span
          ><el-input
            placeholder="请输入"
            v-model="form.name"
            style="width: 70%"
          ></el-input
        ></el-form-item>
        <el-form-item
          ><span>型号编码：</span
          ><el-input
            placeholder="请输入"
            v-model="form.model"
            style="width: 70%"
          ></el-input
        ></el-form-item>
        <el-form-item
          ><span>货道行数：</span
          ><el-input-number
            v-model="form.vmRow"
            style="width: 70%"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number
        ></el-form-item>
        <el-form-item
          ><span>货道列数：</span
          ><el-input-number
            v-model="form.vmCol"
            style="width: 70%"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number
        ></el-form-item>
        <el-form-item
          ><span>货道容量：</span
          ><el-input-number
            v-model="form.channelMaxCapacity"
            style="width: 70%"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number
        ></el-form-item>
        <el-form-item
          ><span>设备照片：</span
          ><el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.image" :src="form.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload
        ></el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <el-button @click="CanclFn">取 消</el-button>
        <el-button type="primary" @click="send">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Pictuce, NewVendingMachines,iseditVendingMachine } from "@/api";
export default {
  name: "ping",
  data() {
    return {
      form: {
        vmRow: undefined,
        vmCol: undefined,
        channelMaxCapacity: 1,
        image: "",
        name: "",
        model: "",
      },
    };
  },

  created() {},

  methods: {
    Cancel() {
      this.$emit("shut", false);
    },

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

    // async handleAvatarSuccess(res, file) {
    //   this.fileName = URL.createObjectURL(file.raw);
    //   console.log(this.fileName);

    //   const data = await Pictuce({
    //     fileName: this.fileName,
    //   });
    //   console.log(data);
    //   // console.log(res);
    // },
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
    CanclFn() {
      this.Cancel();
    },
    async send() {
      if (this.form.typeId) {
       await iseditVendingMachine(this.fand.typeId,this.form)
            this.$message.success('修改成功')
      } else {
        await NewVendingMachines(this.form);
        this.$message.success('添加成功')
        this.form = {
          vmRow: undefined,
          vmCol: undefined,
          channelMaxCapacity: 1,
          image: "",
          name: "",
          model: "",
        };
      }

      // console.log(data);
      this.Cancel();
    },
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    fand:{
        type:Object,
    }
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
</style>
