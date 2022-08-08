<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" :index="Iindex" label="序号">
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
      <el-table-column prop="status" label="设备状态" width="290">
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
export default {
  data() {
    return {
      Iindex: 1,
    };
  },

  created() {},

  methods: {
    clickFn(id) {
      // console.log(id);
      this.$emit('currentObj', id)
      this.$store.dispatch('facility/getCurrentIndex',id)
      this.$emit('openPopup')
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
