<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index"  label="序号">
      </el-table-column>
      <el-table-column
        :prop="item.props"
        :label="item.label"
        v-for="(item, index) in sum"
        :key="index"
      />

      <!-- <el-table-column prop="createTime" label="创建日期">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column> -->
      <el-table-column prop="status" label="设备状态" width="290" v-if="equipment">
        <template v-slot="{ row }">
          <el-tag
            v-for="(item, index) in row.status"
            :class="item ? 'success' : 'error'"
            :key="index"
          >
            <template v-if="index == 10001">
              {{ item ? "在线" : "离线" }}
            </template>
            <template v-else-if="index == 10002">
              {{ item ? "货道" : "货道故障" }}
            </template>
            <template v-else>
              {{ item ? "传动轴" : "传动轴故障" }}
            </template>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template v-slot="{ row }">
          <el-button type="text" size="small" @click="clickFn(row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <slot name="page" class="page"></slot>
  </div>
</template>

<script>
import {
  Commodity,
  Maintenance,
  Replenishment,
  OrdersTotal,
  Saleroom,
} from "@/api/facility";
export default {
  data() {
    return {
      user: {
        start: new Date(new Date() - 24 * 60 * 60 * 1000 * 6)
          .toLocaleDateString()
          .split("/")
          .map((item) => {
            if (item < 10) {
              return "0" + item;
            } else {
              return item;
            }
          })
          .join("-"),
        end: new Date()
          .toLocaleDateString()
          .split("/")
          .map((item) => {
            if (item < 10) {
              return "0" + item;
            } else {
              return item;
            }
          })
          .join("-"),
      },
      newTime: {
        start: "2022-08-01 00:00:00",
        end: "2022-08-07 23:59:59",
        innerCode: this.innerCode,
      },
      product: [],
      popubList: {
        reprirCount: null,
        replenish: null,
        sale: null,
        saleroom: null,
      },
      innerCode:''
    };
  },

  created() {},

  methods: {
    clickFn(obj) {
      // console.log(obj);
      this.$emit("currentObj", obj);
      this.$store.dispatch("facility/getCurrentIndex", obj);
      this.$emit("openPopup",this.product,this.popubList);
      // console.log(this.product,this.popubList);
      this.innerCode=obj.innerCode
      this.$store.commit("facility/getInnerCode", obj.innerCode);
      this.allmethod()
    },
    allmethod() {
      this.Commodity();
      this.Maintenance();
      this.Replenishment();
      this.OrdersTotal();
      this.Saleroom();
    },
    async Commodity() {
      const data = await Commodity(
        this.innerCode,
        this.user.start,
        this.user.end
      );
      console.log(data);

      this.product = data;
    },
    async Maintenance() {
      const data = await Maintenance(
        this.innerCode,
        this.user.start,
        this.user.end
      );
      this.popubList.reprirCount = data;
      console.log(data);
    },
    async Replenishment() {
      const data = await Replenishment(
        this.innerCode,
        this.user.start,
        this.user.end
      );
      this.popubList.replenish = data;
      // console.log(data);
    },
    async OrdersTotal() {
      const data = await OrdersTotal(this.newTime);
      // console.log(data);
      this.popubList.sale = data;
      // console.log(data);
    },
    async Saleroom() {
      const data = await Saleroom(this.newTime);
      this.popubList.saleroom = data;
      // console.log();
    },
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    sum: {
      type: Array,
      required: true,
    },
    equipment:{
      type:Boolean,
      default:false
    }
  },
};
</script>

<style scoped>
.success {
  background-color: #48d598;
  color: #fff;
}
.error {
  background-color: #ffb53a;
  color: #fff;
}
.page {
  margin-top: 10px;
}
</style>
