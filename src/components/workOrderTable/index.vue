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

      <el-table-column prop="createTime" label="创建日期">
        <template v-slot="{ row }">
          {{ row.createTime  }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template v-slot="{ row }">
          <el-button type="text" size="small" @click.native="clickFn(row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//3 取消 4完成 1待办
export default {
  data() {
    return {
      index: 0,
    }
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

  created() {},

  methods: {
    // tacked(row, column, cellValue) {
    //   if (cellValue == 0) {
    //     return '自动'
    //   } else if (cellValue == 1) {
    //     return '手动'
    //   }
    // },
    // pask(row, column, cellValue) {
    //   if (cellValue == 3) {
    //     return '取消'
    //   } else if (cellValue == 4) {
    //     return '完成'
    //   } else if (cellValue == 1) {
    //     return '待办'
    //   }
    // },
    Iindex(index) {
      return index + 1
    },
    clickFn(obj) {
      // console.log(obj);
       this.$emit('currentObj', obj)
       this.$store.dispatch('facility/getGdzt',obj.taskType.typeName)
      this.$emit('changeDesc', true)
      this.$store.dispatch('facility/getCurrentObj',obj)
      this.$emit('lookDesricpiton',obj)
    },
  },
}
</script>

<style scoped></style>
