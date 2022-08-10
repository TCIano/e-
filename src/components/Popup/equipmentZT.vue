<template>
  <div>
    <el-dialog title="设备详情" :visible="isShow" width="50%" @close="Cancel">
      <div>
        <span>销售量：{{ this.popubList.sale }}</span>
        <span> 销售额：{{ this.popubList.saleroom }}</span>
        <span>补货次数：{{ this.popubList.replenish }}</span>
        <span>维修次数：{{ this.popubList.reprirCount }}</span>
      </div>
      <div>
        <p>商品销量</p>
        <el-row class="arrp" :span="24">
          <el-col
            :span="12"
            class="add"
            v-for="(item, index) in product"
            :key="index"
            ><span>{{ item.skuName }}:</span
            ><span style="margin-left: 20px">{{ item.count }}</span></el-col
          >
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "Zt",
  data() {
    return{

    }
  },

  created() {},

  methods: {

    Cancel() {
      this.$emit("update:isShow", false);
    },

  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    fand: {
      type: Object,
      required: true,
    },
    product:{
      type:Array,
    },
    popubList:{
      type:Object
    }
  },
};
</script>

<style scoped>
.add {
  border: 1px solid #ccc;
}
</style>
