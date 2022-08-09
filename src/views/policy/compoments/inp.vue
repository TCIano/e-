<template>
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <!-- <slot></slot> -->
      <el-form-item label="策略搜索：">
        <el-input placeholder="请输入" v-model="name"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" 
        @click="$emit('change',name)"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "policyInput",
  data() {
    return {
        name:''

    };
  },
  props: {

  },
  created() {},

  methods: {

}
}
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
