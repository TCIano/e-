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
        v-loading="loading"
      >
        <el-form-item label="点位名称" prop="name">
          <el-input
            type="text"
            maxlength="15"
            show-word-limit
            v-model="ruleForm.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="所在区域" prop="regionId">
          <el-select placeholder="请选择" v-model="ruleForm.regionId">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in regionList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属商圈" prop="businessId">
          <el-select placeholder="请选择" v-model="ruleForm.businessId">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in businessList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属合作商" prop="ownerName">
          <el-select
            placeholder="请选择"
            v-model="ruleForm.ownerId"
            @change="selectOwnerId"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in partnerList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址">
          <div class="block">
            <el-cascader
              v-model="addressItem"
              :options="address"
              placeholder="请选择"
              @change="handleChange"
            ></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="备注说明" prop="addr">
          <el-input
            maxlength="40"
            show-word-limit
            type="textarea"
            v-model="oldAddr"
            placeholder="请输入详细地址"
            @change="iptAddr"
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
import { regionData, TextToCode, CodeToText } from "element-china-area-data";
import {
  addNodeApi,
  editNodeApi,
  getBusinessApi,
  getNodeApi,
  getPartnerApi,
  getRegionApi,
} from "@/api";
export default {
  data() {
    return {
      oldAddr: "", //未修改区域
      loading: false,
      regionList: [], //区域列表
      businessList: [], //商圈列表
      partnerList: [], //合作商列表
      ruleForm: {
        name: "", //名称
        regionId: "", //所属区域id
        businessId: "", //所属商圈id
        ownerName: "", //合作商名称
        ownerId: "", //合作商id
        addr: "", //详细地址
        areaCode: "", //最后一级区域id （点位区域）
        createUserId: this.$store.state.user.userInfo.roleId, //创建人id
      },
      addressItem: [], //选中地址
      address: regionData, //详细地址
      rules: {
        name: [
          { required: true, message: "请输入点位名称", trigger: "blur" },
          { max: 15, trigger: "change" },
        ],
        addr: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { max: 40, trigger: "change" },
        ],
        regionId: [
          { required: true, message: "请输选择区域", trigger: "blur" },
        ],
        businessId: [
          { required: true, message: "请选择商圈", trigger: "blur" },
        ],
        ownerName: [
          { required: true, message: "请选择归属合作商", trigger: "blur" },
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
  created() {
    this.getRegion();
    this.getBusiness();
    this.getPartner();
  },
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
        name: "", //名称
        regionId: "", //所属区域id
        businessId: "", //所属商圈id
        ownerName: "", //合作商名称
        ownerId: "", //合作商id
        addr: "", //详细地址
        areaCode: "", //最后一级区域id （点位区域）
        createUserId: "", //创建人id
      };
      this.addressItem = [];
      this.oldAddr = "";
    },
    //取消
    cancel() {
      this.handleClose();
    },
    //确认
    async confirm() {
      await this.$refs.ruleForm.validate();
      if (!this.ruleForm?.id) {
        //添加
        await addNodeApi(this.ruleForm);
        this.$message.success("添加成功");
        //更新操作
        // this.$emit("refreshData");
        // this.ruleForm = {
        //   regionName: "",
        //   remark: "",
        // };
      } else {
        // this.isEdit = false;
        await editNodeApi(this.ruleForm.id, this.ruleForm);
        this.$message.success("修改成功");
      }
      this.$refs.ruleForm.resetFields();
      this.$emit("refreshData");
      this.handleClose();
    },

    //获取父组件传递的信息
    async getIptValue(val, current) {
      console.log(val, current);
      this.loading = true;
      const res = await getNodeApi({
        pageIndex: "1",
        pageSize: "10000",
      });

      // 回显数据处理
      const nodeList = res.currentPageRecords;
      const arr = nodeList.filter((item) => item.id === current.id);
      const currentNode = arr[0].addr;
      console.log(currentNode);

      //截取地址
      const lineIndex = currentNode.lastIndexOf("-");
      if (lineIndex !== -1) {
        const newCurrentNode = currentNode.substr(0, lineIndex);
        // console.log(newCurrentNode);
        const cities = newCurrentNode.split("-");
        console.log(cities);
        // console.log(val);
        // this.addressItem.push(TextToCode[this.ruleForm.areaCode].code);
        this.addressItem = [];
        this.addressItem.push(TextToCode[cities[0]].code);
        console.log(this.addressItem);
        this.addressItem.push(TextToCode[cities[0]][cities[1]].code);
        this.addressItem.push(TextToCode[cities[0]][cities[1]][cities[2]].code);
      } else {
      }
      this.ruleForm = val;
      this.oldAddr = current.addr;
      this.ruleForm.addr =
        CodeToText[this.addressItem[0]] +
        "-" +
        CodeToText[this.addressItem[1]] +
        "-" +
        CodeToText[this.addressItem[2]] +
        "-" +
        this.oldAddr;
      this.loading = false;
    },
    //区域列表
    async getRegion() {
      const res = await getRegionApi({
        pageIndex: "1",
        pageSize: "10000",
      });
      this.regionList = res.currentPageRecords;
    },
    //获取商圈列表
    async getBusiness() {
      const res = await getBusinessApi();
      // console.log(res);
      this.businessList = res;
    },
    //获取合作商
    async getPartner() {
      const res = await getPartnerApi({
        pageIndex: "1",
        pageSize: "10000",
      });
      this.partnerList = res.currentPageRecords;
    },
    //详细地址改变
    handleChange(val) {
      console.log(val);
      this.ruleForm.areaCode = val[val.length - 1];
      this.ruleForm.addr =
        CodeToText[val[0]] +
        "-" +
        CodeToText[val[1]] +
        "-" +
        CodeToText[val[2]] +
        "-" +
        this.oldAddr;
      console.log(this.ruleForm.addr);
    },
    iptAddr() {
      this.ruleForm.addr =
        CodeToText[this.addressItem[0]] +
        "-" +
        CodeToText[this.addressItem[1]] +
        "-" +
        CodeToText[this.addressItem[2]] +
        "-" +
        this.oldAddr;
      // this.ruleForm.addr = this.ruleForm.addr + "-" + this.oldAddr;
    },
    //选取当前合作商id
    selectOwnerId(val) {
      console.log(val);
      this.partnerList.forEach((item) => {
        if (item.id === val) {
          return (this.ruleForm.ownerName = item.name);
        }
      });
    },
  },
};
</script>

<style scoped></style>
