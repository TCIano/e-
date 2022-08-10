<template>
  <el-form class="gzOne">
    <el-form-item class="test1">
      <span>{{uname.bh}}:</span
      ><el-input v-model="input" class="input" style="width:200px" placeholder="请输入" />
    </el-form-item>
    <el-form-item v-if="!right">
      <span>{{uname.zt}}:</span>
      <el-select v-model="value" class="pask" filterable placeholder="请选择">
        <el-option
          v-for="item in newList"
          :key="item.statusId"
          :label="item.statusName"
          :value="item.statusId"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button class="el-icon-search btn" size="small" @click="btn"
        >查询</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Title',
  data() {
    return {
      input: '',
      value: '',
    }
  },

  created() {},

  methods: {
    btn() {
       this.$store.dispatch('facility/getBh', this.input)
       this.$store.dispatch('facility/getZt', this.value)
      // console.log(123);
      this.$emit('btnSearch')
    },
  },
  props: {
    newList: {
      type: [Array,Object],
    },
    right: {
      type: Boolean,
      default: false,
    },
    uname:{
      type:Object,
      default:'运维'
    }
  },
}
</script>

<style scoped lang="less">
.gzOne {
  display: flex;
  .test1 {
    .input {
      width: 100px;
      margin-right: 15px;
      margin-left: 10px;
    }
  }
  .pask {
    margin-left: 15px;
  }
  .btn {
    height: 40px;
    margin-left: 15px;
    background-color: #5f84ff;
    color: #fff;
  }
}
</style>
