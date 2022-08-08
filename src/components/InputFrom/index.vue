<template>
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <!-- <slot></slot> -->
<<<<<<< HEAD

      <el-form-item label="工单编号">
=======
      <el-form-item :label="inputInfo.one" v-if="inputInfo">
>>>>>>> 4d664ea341afb09eb919fff81498631db2f1207e
        <el-input
          placeholder="请输入"
          v-model="searchContion.taskCode"
        ></el-input>
      </el-form-item>
<<<<<<< HEAD

      <el-form-item label="工单状态">
=======
      <el-form-item :label="inputInfo.two" v-if="!isSingle">
>>>>>>> 4d664ea341afb09eb919fff81498631db2f1207e
        <el-select placeholder="请选择" v-model="searchContion.status">
          <el-option
            :label="item.label"
            :value="index + 1"
            v-for="(item, index) in option"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.native="$emit('searchContionTask', searchContion)"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchContion: {
        status: "",
        taskCode: "",
      },
    };
  },
  props: {
    option: {
      type: Array,
    },
    isSingle: {
      type: String,
    },
    inputInfo: {
      type: Object,
    },
  },
  created() {},

  methods: {},
};
</script>

<style scoped>
.search {
  background-color: #fff;
  width: 100%;
  height: 70px;
  /* line-height: 70px; */
  padding-top: 15px;
  padding-left: 15px;
  margin-bottom: 30px;
}
</style>
