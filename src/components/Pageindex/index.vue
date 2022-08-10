<template>
  <div>
    <el-row type="flex" justify="center" align="middle" style="heigth: 60px">
      <el-pagination
        :current-page="page.pageIndex"
        :page-size="page.pageSize"
        :total="page.totalCount"
        layout="prev,pager,next"
        @current-change="changePage"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    changePage(newPage) {
      this.$emit('changePage',newPage)
    },
  },
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
