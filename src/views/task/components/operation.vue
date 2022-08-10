<template>
   <div class="app">
    <Title :newList="newList" class="title" @btnSearch="btnSearch" :uname="uname" />
    <el-button @click="getHb">工单配置</el-button>
    <el-dialog :visible="two" title="工单配置">
      <el-input v-model="alertValue" />
      <el-button @click="btn">确认</el-button>
    </el-dialog>
    <Buttom class="btn" @click.native="btnClick" />
    <Added
      ref="added"
      :isShow.sync="isShow"
      :list="list"
      :fand="fand"
      :isBuqd="true"
    />
    <Table
      @changeDesc="changeDesc"
      @currentObj="currentObj"
      :list="list"
      :sum="headerName"
      @lookDesricpiton="lookDesricpiton"
    />
    <descarTwo
      :status="true"
      :list="fand"
      :desectwo="desectwo"
      @changeDesc="changeDesc"
      @recreate="recreate"
    />
    <!-- 分页 -->
    <PageIndex :page="page" @changePage="changePage" />
  </div>
</template>

<script>
import Title from '@/components/workOrderTitle'
import Buttom from '@/components/button'
import { getStaList, getGDList, BHyjz, SZbz } from '@/api'
import descarTwo from '@/components/workOrderParticulars'
import Table from '@/components/workOrderTable'
import PageIndex from '@/components/Pageindex'
import Added from '@/components/workOrderAppend'
export default {
  name:'GDGL',
  components: {
    Title,
    Buttom,
    descarTwo,
    Table,
    PageIndex,
    Added,
  },
  data() {
    return {
      newList: [], //状态列表
      list: [], //列表
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        isRepair: false,
      }, //分页
      fand: {}, //当前点击对象
      isShow: false, // 添加
      uname: {
        bh: '工单编号',
        zt: '工单状态',
      }, //自定义输入框名字
      headerName: [
        { label: '工单编号', props: 'taskCode' },
        { label: '设备编号', props: 'innerCode' },
        { label: '工单类型', props: 'taskType.typeName' },
        { label: '工单方式', props: 'createType' },
        { label: '工单状态', props: 'taskStatusTypeEntity.statusName' },
        { label: '运营人员', props: 'userName' },
      ],
      desectwo: false,
      alertValue: '', //预警值
      two: false,
      isEdit: false,
    }
  },

  created() {
    this.getStaList()
    this.getGDList()
  },

  methods: {
    // 获取状态列表
    async getStaList() {
      const  res  = await getStaList()
      console.log(res)
      this.newList = res
      // console.log(this.newList)
    },
    //获取数据
    async getGDList() {
      try {
        const  data  = await getGDList(this.page)
        this.list = data.currentPageRecords
        this.page.totalCount = parseInt(data.totalCount)
        // console.log(this.list)
        this.oderList()
      } catch (error) {}
    },
    //下一页
    changePage(newPage) {
      // console.log(newPage)
      this.page.pageIndex = newPage
      this.getGDList()
    },
    //查询
    async btnSearch() {
      try {
        const  data  = await getGDList({
          taskCode: this.$store.state.facility.bh,
          status: this.$store.state.facility.zt,
        })
        console.log(data);
        this.list = data.currentPageRecords
        this.oderList()
      } catch (error) {}
    },
    //当前对象
    currentObj(id) {
      // console.log(id)
      this.fand = id
      // console.log(this.$refs.added);
      this.$refs.added.getList()
    },
    //页面显示
    changeDesc(val) {
      this.desectwo = val
    },
    async getHb() {
      const  data = await BHyjz()
      console.log(data)
      this.alertValue = data
      this.two = true
    },
    async btn() {
      const data = await SZbz({
        alertValue: this.alertValue,
      })
      console.log(data)
      // console.log(this.HByjz);
    },
    tanShow() {
      this.isShow = true
    },
    recreate() {
      this.tanShow()
    },
    //查看详情
    lookDesricpiton(obj) {
      console.log(obj)
      this.$refs.added.addFrom = obj
    },
    //新增
    btnClick() {
      this.tanShow()
      this.$refs.added.addFrom = {
        userId: null,
        desc: '',
        innerCode: '',
        productType: null,
        createType: 1,
      }
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
    //     otherList() {
    //   this.list.map((item) => {
    //     if (item.taskStatus == 1) {
    //       item.taskStatus = '待办'
    //     } else if (item.taskStatus == 3) {
    //       item.taskStatus = '取消'
    //     } else if (item.taskStatus == 4) {
    //       item.taskStatus = '完成'
    //     }
    //   })
    // },
  },
  watch: {},
}
</script>

<style scoped>
 .title {
    margin-top: 30px;
    margin-left: 30px;
  }
  .btn {
    margin-left: 30px;
    margin-top: 10px;
  }
</style>
