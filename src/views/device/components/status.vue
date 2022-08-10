<template>
  <div>
    <FacilityTitle :uname="uname" @getSou="getSou" class="title" />
    <Table
      :list="List"
      :sum="propertyName"
      @openPopup="openPopup"
      @currentObj="currentObj"
      :equipment="true"
    >
    </Table>
    <pageIndex :page="page" @changePage="changePage" />
    <equipmentZT
      :product="product"
      :popubList="popubList"
      :isShow.sync="isShow"
      :fand="fand"
    />
  </div>
</template>

<script>
import { getList, souList } from "@/api";
import FacilityTitle from "@/components/FacilityTitle";
import Table from "@/components/Table";
import pageIndex from "@/components/Pageindex";

import equipmentZT from "@/components/Popup/equipmentZT.vue";
export default {
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: null,
        totalPage: null,
        innerCode: "",
      },
      uname: "设备编号",
      List: [],
      propertyName: [
        {
          props: "innerCode",
          label: "设备编号",
        },
        {
          props: "type.name",
          label: "设备型号",
        },
        {
          props: "node.name",
          label: "详细地址",
        },
        {
          props: "vmStatus",
          label: "运营状态",
        },
      ],
      isShow: false,
      fand: {},
      product: [],
      popubList: {},
    };
  },

  created() {
    this.getList();
  },

  methods: {
    //获取列表
    async getList() {
      try {
        const data = await getList(this.page);
        // console.log(data);
        this.page.pageIndex = parseInt(data.pageIndex);
        this.page.totalCount = parseInt(data.totalCount);
        this.page.totalPage = parseInt(data.totalPage);
        this.List = data.currentPageRecords;
        // console.log(this.List);
        this.ortherList();
      } catch (error) {}
    },
    //下一页
    changePage(newPage) {
      this.page.pageIndex = newPage;
      this.getList();
    },
    //选择当前点击
    currentObj(id) {
      this.fand = id;

      this.isShow = true;
    },
    //拿到搜素
    async getSou(val) {
      const data = await souList({
        innerCode: val,
      });
      this.List = data.currentPageRecords;
    },
    openPopup(a, b) {
      this.product = a;
      this.popubList = b;
      this.isShow = true;
    },
  },
  components: {
    FacilityTitle,
    Table,
    pageIndex,
    equipmentZT,
  },
  computed: {
    ortherList() {
      this.List.map((item) => {
        if (item.vmStatus == 0) {
          item.vmStatus = "未投放";
        } else if (item.vmStatus == 1) {
          item.vmStatus = "运营";
        } else if (item.vmStatus == 3) {
          item.vmStatus = "撤机";
        }
      });
    },
  },
};
</script>

<style scoped>
.title {
  margin-top: 25px;
  margin-left: 15px;
}
</style>
