<template>
  <div>
    <el-dialog title="设备详情" :visible="isShow" width="50%"  :before-close="cancel">
      <div>
        <span @click="canel">销售量：{{this.sale}}</span> <span> 销售额：{{this.saleroom}}</span> <span>补货次数：{{this.replenish}}</span>
        <span>维修次数：{{this.reprirCount}}</span>
      </div>
      <div >
        <p>商品销量</p>
         <el-row class="arrp" :span='24'>
           <el-col :span="12" class="add"  v-for="(item,index) in product" :key="index" ><span>{{item.skuName}}:</span><span style="margin-left:20px">{{item.count}}</span></el-col>
         </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {Commodity,Maintenance,Replenishment,OrdersTotal,Saleroom} from '@/api/facility'
export default {
    name:'Zt',
  data() {
    return {
        user:{
            start:new Date(new Date() - 24*60*60*1000*6).toLocaleDateString().split('/').map(item=>{if (item<10){return '0'+ item}else {return item}}).join('-'),
            end:new Date().toLocaleDateString().split('/').map(item=>{if (item<10){return '0'+ item}else {return item}}).join('-'),
            innerCode:this.$store.state.facility.currentIndex.innerCode,
        },
        newTime:{
          start:'2022-08-01 00:00:00',
          end:'2022-08-07 23:59:59',
          innerCode:this.$store.state.facility.currentIndex.innerCode,
        },
        product:[],
        reprirCount:null,
        replenish:null,
        sale:null,
        saleroom:null
    };
  },

  created() {
    this.Commodity()
    this.Maintenance()
    this.Replenishment()
    this.OrdersTotal()
    this.Saleroom()
  },

  methods: {
   async Commodity(){
    const data=await Commodity(
        this.user.innerCode,
        this.user.start,
        this.user.end,

    )
    // console.log(data);

    this.product=data
    },
    async Maintenance(){
      const data=await Maintenance( this.user.innerCode,
        this.user.start,
        this.user.end,)
      console.log(data);
      this.reprirCount=data
    },
    async Replenishment(){
      const data=await Replenishment( this.user.innerCode,
        this.user.start,
        this.user.end,)
        this.replenish=data
    },
    async OrdersTotal(){
      const data=await OrdersTotal(this.newTime)
      // console.log(data);
      this.sale=data
    },
    async Saleroom(){
      const data=await Saleroom(this.newTime)
      this.saleroom=data
    },
    // cancel(){
    //   this.$emit('update:isShow',false)
    // }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    fand:{
        type:Object,
        required:true
    }
  },
};
</script>

<style scoped>
.add{
  border: 1px solid #ccc;
}
</style>
