<template>
  <div>
    <inputForm :pageSize="pageSize" :pageIndex="pageIndex" @change="change"></inputForm>

    <From :tableHead="tableHead" :tableData="orderList">
      <!-- //分页 -->
      <template #page>
        <pageItem :page="pageInfo"></pageItem>
      </template>
    </From>
  </div>
</template>

<script>
import pageItem from "@/components/pageIndex";
import inputForm from "./compoments/inputFrom.vue";
import From from "./compoments/form.vue";
import { getOrderList ,searchOrderList} from "@/api/order";


export default {
  
  name: "order",
  data() {
    return {
      tableHead: [
        {
          column_name: "orderNo",
          column_comment: "订单编号",
        },
        {
          column_name: "skuName",
          column_comment: "商品名称",
        },
        {
          column_name: "amount",
          column_comment: "订单金额(元)",
        },
        {
          column_name: "innerCode",
          column_comment: "设备编号",
        },
        {
          column_name: "status",
          column_comment: "订单状态",
        },
        {
          column_name: "createTime",
          column_comment: "订单日期",
        },
      ],
      // 分页
      pageInfo: {
        pageIndex: 1, //页数
        totalPage: null, //总页数
        totalCount: null,
        // userName:null//名字
      },
      orderList: [],
      pageIndex: "",
      pageSize: "",
      // 改动
       form:{
        pageIndex:'',
        pageSize:'',
        orderNo:'',
        startDate:'',
        endDate:''
      },
    };
  },
  components: {
    inputForm,
    From,
    pageItem,
  },

  created() {
    this.getOrderList();
  },

  methods: {
    
    async getOrderList() {
      const res = await getOrderList();
      console.log(res);
      res.currentPageRecords.forEach((item) => {
        if (item.status === 0) {
          item.status = "创建";
        } else if (item.status === 1) {
          item.status = "支付完成";
        } else if (item.status === 2) {
          item.status = "出货成功";
        } else {
          item.status = "出货失败";
        }
      });
      this.pageIndex = res.pageIndex;
      this.pageSize = res.pageSize;

      this.orderList = res.currentPageRecords;
    
      
    },
    // 切换分页
    changePage(newPage) {
      this.pageInfo.pageIndex = newPage;
      this.getOrderList();
    },
    // 改动
    async change(val) {
      
      this.form.startDate = val.value1[0];
      this.form.endDate = val.value1[1];
      this.form.pageIndex = this.pageIndex;
      this.form.pageSize = this.pageSize;
      this.form.orderNo = val.orderNo
      

      const res = await searchOrderList(this.form);
      console.log(res);
      res.currentPageRecords.forEach((item) => {
        if (item.status === 0) {
          item.status = "创建";
        } else if (item.status === 1) {
          item.status = "支付完成";
        } else if (item.status === 2) {
          item.status = "出货成功";
        } else {
          item.status = "出货失败";
        }
      });
      this.orderList = res.currentPageRecords;
    },
  },
};
</script>

<style scoped></style>
