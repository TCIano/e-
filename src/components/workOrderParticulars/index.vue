<template>
  <div>
    <el-dialog title="订单信息" :visible="desectwo" @close="btnCanel">
      <el-form :model="list">
        <div class="zrren">
          <div><img src="../../assets/404_images/xz.png" alt="" /></div>
          <div><img src="../../assets/404_images/quxiao.png" alt="" /></div>
        </div>
        <div class="csdn">
          <el-form-item label="设备编号" style="width: 280px">
            <span>{{ list.innerCode }}</span>
          </el-form-item>
          <el-form-item label="创建日期" style="width: 250px">
            <span>{{ list.createTime }}</span>
          </el-form-item>
        </div>
        <div class="csdn">
          <el-form-item label="取消日期" style="width: 280px">
            <span>{{ list.updateTime }}</span>
          </el-form-item>
          <el-form-item label="运维人员" style="width: 250px">
            <span>{{ list.userName }}</span>
          </el-form-item>
        </div>
        <div class="csdn">
          <el-form-item label="工单类型" style="width: 280px">
            <span>{{ $store.state.facility.gdzt }}</span>
          </el-form-item>
          <el-form-item label="工单方式" style="width: 250px">
            <span>{{ list.createType == 0 ? '自动' : '手动' }}</span>
          </el-form-item>
        </div>
        <div class="csdn">
          <el-form-item label="取消原因" style="width: 280px">
            <span>{{list.desc}}</span>
          </el-form-item>
          <el-form-item label="补货数量" style="width: 250px" v-if="status">
            <el-button @click="BTclick">补货详情</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-dialog
        width="50%"
        title="补货详情"
        :visible.sync="innerVisible"
        append-to-body
      >
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="channelCode"
        label="货道编号"
        >
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="商品"
        >
      </el-table-column>
      <el-table-column
        prop="expectCapacity"
        label="补货数量">
      </el-table-column>
    </el-table>
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cxClick">重新创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {BHdescrption} from '@/api'
export default { 
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      tableData:[],
    }
  },

  created() {},

  methods: {
    btnCanel() {
      this.$emit('changeDesc',false)
    },
   async BTclick(){
      this.innerVisible = true
    const data=  await BHdescrption(this.list.taskId)
    this.tableData=data
    
    // console.log(data);
    },
    cxClick(){
      this.$emit('changeDesc',false)
      this.$emit('recreate',true)
    }
  },
  props: {
    desectwo: {
      type: Boolean,
      default: false,
    },
    list: {
      type: [Array, Object],
      required: true,
    },
    status:{
      type:Boolean,
      default:false
    }
  },
  computed: {},
}
</script>

<style scoped>
.zrren {
  background-color: #ccc;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.csdn {
  display: flex;
  justify-content: space-between;
}
.dialog-footer{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
