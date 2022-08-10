<template>
  <div>
    <FacilityTitle :uname="uname" @getSou="getSou" class="title" />
    <Button class="btn" @click.native="addBtn"/>
    <el-table :data="List">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column label="型号名称" prop="name"></el-table-column>
      <el-table-column label="设备图片">
        <template v-slot="{ row }">
          <img
            :src="row.image"
            alt=""
            style="width: 50px; height: 50px; border-radius: 50%"
          />
        </template>
      </el-table-column>
      <el-table-column label="货道行" prop="vmRow"></el-table-column>
      <el-table-column label="货道列" prop="vmCol"></el-table-column>
      <el-table-column
        label="设备容量"
        prop="channelMaxCapacity"
      ></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="text" size="mini" @click="isEidt(row)">修改</el-button>
          <el-button type="text" size="mini" style="color: red" @click.native="deleteFn(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <DeviceType :fand='currentObj' ref="currentObj" @shut='shut' :isShow.sync='isShow'/>
    <PageIndex :page="page" @changePage="changePage" />
  </div>
</template>

<script>
import {TypeList,deleteVendingMachine} from '@/api'
import FacilityTitle from '@/components/FacilityTitle'
import Button from '@/components/button'
import PageIndex from '@/components/Pageindex'
import DeviceType from '@/components/Popup/DeviceType.vue'
export default {
  data () {
    return {
      uname:'型号搜索',
      page:{
        pageIndex:1,
        pageSize:10,
        totalCount:0,
      },
      List:[],
      isShow:false, //新建
      currentObj:{}
    }
  },

  created () {
    this.TypeList()
  },

  methods: {
   async TypeList(){
      const data=await TypeList(this.page)
      console.log(data);
      this.List=data.currentPageRecords
      this.page.totalCount=parseInt(data.totalCount)
      // console.log(this.List);
    },
    changePage(newPage){
      this.page.pageIndex=newPage
      this.TypeList()
    },
  async  getSou(val){
      const data=await TypeList({
        name:val
      })
      // console.log(data);
      this.List=data.currentPageRecords
    },
    shut(){
      this.isShow=false
    },
    addBtn(){
      this.isShow=true
      this.$refs.currentObj.form={
        vmRow: undefined,
        vmCol: undefined,
        channelMaxCapacity: 1,
        image: "",
        name:'',
        model:''
      }
    },
   async deleteFn(obj){
      // console.log(obj.typeId);
      await deleteVendingMachine(obj.typeId)
      // console.log(data);
      this.$message.success('删除成功')
      this.TypeList()
    },
    async isEidt(obj){
      this.isShow=true
      console.log(obj);
      this.currentObj=obj
      this.$refs.currentObj.form=obj
    }

  },
  components:{
    FacilityTitle,
    Button,
    PageIndex,
    DeviceType
  }
}
</script>

<style scoped>
.title {
  margin-top: 25px;
  margin-left: 15px;
}
.btn {
  margin-top: 50px;
  margin-left: 15px;
}
</style>
