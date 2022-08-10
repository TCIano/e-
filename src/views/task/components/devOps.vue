<template>
  <div class="app">
    <Title class="title" @btnSearch="btnSearch" :uname="uname" :newList="newList" />
    <Buttom class="btn" @click.native="btnClick" />
    <Table
      :list="list"
      :sum="headerName"
      @changeDesc="changeDesc"
      @currentObj="currentObj"
      @lookDesricpiton="lookDesricpiton"
    />
    <Added :isShow.sync="isShow" :list="list" :fand="fand" ref="added" />
    <descarTwo
      :list="fand"
      :desectwo="desectwo"
      @changeDesc="changeDesc"
      @recreate="recreate"
    />
    <!-- 分页 -->
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
import { getStaList, getGDList } from '@/api'
import Title from '@/components/workOrderTitle'
import Buttom from '@/components/button'
import descarTwo from '@/components/workOrderParticulars'
import Table from '@/components/workOrderTable'
import Added from '@/components/workOrderAppend'
export default {
  components: {
    Title,
    Buttom,
    Table,
    Added,
    descarTwo,
  },
  data() {
    return {
      uname: {
        bh: '工单编号',
        zt: '工单状态',
      },
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        isRepair: true,
      },
      list: [],
      newList: [], //状态
      fand: {}, //当前点击对象
      headerName: [
        { label: '工单编号', props: 'taskCode' },
        { label: '设备编号', props: 'innerCode' },
        { label: '工单类型', props: 'taskType.typeName' },
        { label: '工单方式', props: 'createType' },
        { label: '工单状态', props: 'taskStatusTypeEntity.statusName' },
        { label: '运维人员', props: 'userName' },
      ],
      isShow: false,
      desectwo: false,
    }
  },

  created() {
    this.getStaList()
    this.getGDList()
  },

  methods: {
    async getStaList() {
      const  res  = await getStaList()
      console.log(res);
      this.newList = res
    },
    async getGDList() {
      try {
        const  data  = await getGDList(this.page)
        this.list = data.currentPageRecords
        this.page.totalCount = parseInt(data.totalCount)
        this.oderList()
        
      } catch (error) {}
    //   console.log(data);
    },
    changePage(newPage) {
      this.page.pageIndex = newPage
      this.getGDList()
    },
    async btnSearch() {
      try {
        const  data  = await getGDList({
          taskCode: this.$store.state.facility.bh,
          status: this.$store.state.facility.zt,
        })
        this.list = data.currentPageRecords
        this.oderList()
      } catch (error) {}
    },
    tanShow() {
      this.isShow = true
    },
    currentObj(id) {
      // console.log(id)
      this.fand = id
      this.$refs.added.getList()
    },
    changeDesc(val) {
      this.desectwo = val
    },
    btnClick() {
      this.tanShow()
      this.$refs.added.addFrom = {
        userId: null,
        desc: '',
        innerCode: '',
        productType: null,
        createType: 1,
      }
    //   console.log(123)
    },
    lookDesricpiton(obj) {
      console.log(obj)
      this.$refs.added.addFrom = obj
    },
    recreate() {
      this.tanShow()
    },
  },

  computed: {
    oderList() {
      this.list.map((item) => {
        if (item.createType == 0) {
          item.createType = '自动'
        } else {
          item.createType = '手动'
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.app {
  .title {
    margin-top: 30px;
    margin-left: 30px;
  }
  .btn {
    margin-left: 30px;
    margin-top: 10px;
  }
}
</style>
