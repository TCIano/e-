<template>
  <el-dialog title="新增工单" :visible.sync="isShow" width="50%">
    <el-form :model="addFrom">
      <div class="gdlx">
        <el-form-item>
          <span>设备编号：</span
          ><el-input
            v-model="addFrom.innerCode"
            style="width: 300px"
            placeholder="请输入"
            @blur="getWXlist"
          />
        </el-form-item>
      </div>
      <el-form-item>
        <div class="gdlx">
          <span>工单类型：</span
          ><el-select v-model="addFrom.productType" placeholder="请选择">
            <el-option
              v-for="item in gdztList"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            >
            </el-option>
          </el-select>
        </div>
      </el-form-item>

      <el-form-item v-if="isBuqd" class="gdlx">
        <span>补货数量：</span
        ><el-button @click="innerVisible = true">补货清单</el-button>
        <el-dialog
          width="50%"
          title="内层 Dialog"
          :visible.sync="innerVisible"
          append-to-body
        >
          <el-table :data="bhdq" style="width: 100%">
            <el-table-column prop="channelCode" label="货道编号">
            </el-table-column>
            <el-table-column prop="sku.skuName" label="商品名称">
            </el-table-column>
            <el-table-column prop="currentCapacity" label="当前容量">
            </el-table-column>
            <el-table-column label="还可添加">
              <template v-slot="{ row }">
                {{ row.currentCapacity - row.maxCapacity }}
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-form-item>

      <el-form-item>
        <div class="gdlx">
          <span>运维人员：</span
          ><el-select v-model="addFrom.userId" placeholder="请选择">
            <el-option
              v-for="item in listName"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            >
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="gdlx">
          <span>备注：</span
          ><el-input
            type="textarea"
            style="width: 300px"
            placeholder="请输入内容"
            v-model="addFrom.desc"
          >
          </el-input>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Canel">取 消</el-button>
      <el-button type="primary" @click.native="add">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getWXlist, getStatusList, addGD, SHdescription } from '@/api'
export default {
  name: 'Added',
  data() {
    return {
      addFrom: {
        userId: null,
        desc: '',
        innerCode: '',
        productType: null,
        createType: 1,
      },
      listName: [],
      alertValue: 50,
      gdztList: [],
      innerVisible: false,
      bhdq: [],
    }
  },

  created() {
    this.getStatusList()
  },

  methods: {
    async getWXlist() {
      const  data  = await getWXlist(this.addFrom.innerCode)
      // console.log(data)
      this.listName = data
      this.SHdescription()
    },
    async getStatusList() {
      const  data  = await getStatusList(this.alertValue)
      this.gdztList = data
      // console.log(data);
      // this.gdztList = this.gdztList.filter((item) => item.type == 1)
      // console.log(this.gdztList);
    },
    async add() {
        if(this.addFrom.taskId){
          console.log(123);
        }else{
          console.log(456);
          await addGD(this.addFrom)
        }
        
        // console.log(data);

          this.addFrom = {
            userId: null,
            desc: '',
            innerCode: '',
            productType: null,
          }

        this.Canel()
        // console.log(error);
    },
    Canel() {
      this.$emit('update:isShow', false)
    },
    getList() {
      // this.addFrom = this.fand
      this.addFrom.productType = this.$store.state.facility.gdzt
      this.addFrom.innerCode = this.$store.state.facility.currentObj.innerCode
      this.addFrom.userId = this.$store.state.facility.currentObj.userId
      this.addFrom.desc = this.$store.state.facility.currentObj.desc
    },
    async SHdescription() {
      const data  = await SHdescription(this.addFrom.innerCode)
      console.log(data)
      this.bhdq = data
    },
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      required: true,
    },
    fand: {
      type: Object,
      required: true,
    },
    isBuqd: {
      type: Boolean,
      default: false,
    },
    isEdit:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    // currentSum(){
    //  return this.bhdq.maxCapacity-this.bhdq.currentCapacity
    // }
  },
}
</script>

<style scoped>
.gdlx {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
