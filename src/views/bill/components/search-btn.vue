<template>
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <!-- <slot></slot> -->
      <!-- <el-form-item label="合作商" v-if="inputInfo">
        <el-input
          placeholder="请输入"
          v-model="searchContion.taskCode"
        ></el-input>
      </el-form-item> -->

      <el-form-item label="合作商：" v-if="!isSingle">
        <el-select placeholder="请选择" v-model="searchContion.status">
          <el-option
            :label="item.label"
            :value="item.name"
            v-for="(item, index) in option"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="block">
          <span class="demonstration">日期: </span>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="searchContion.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.native="$emit('searchContionTask', searchContion.status)"
          >查询</el-button
        >
      </el-form-item>
      <br />
      <el-form-item>
        <div class="title-num">
          <span
            >笔数统计: <i>{{ this.alldata.count }}</i> 个</span
          >
          <span
            >收入统计: <i>{{ this.alldata.total }}</i> 元</span
          >
          <span
            >分成统计: <i>{{ this.alldata.divide }}</i> 元</span
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { partnerCollectApi } from "@/api/bill";
export default {
  data() {
    return {
      searchContion: {
        status: "",
        value1: [],
      },
      form: {
        pageIndex: "",
        pageSize: "",
        startDate: "",
        endDate: "",
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
    alldata: {
      type: Object,
    },
  },
  created() {},

  methods: {
  },
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
.title-num span {
  margin-right: 50px;
  font-size: 14px;
}
.title-num span i {
  font-weight: 700;
  font-size: 20px;
  font-style: normal;
  color: #ff576d;
}
</style>
