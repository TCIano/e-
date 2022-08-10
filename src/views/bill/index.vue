<template>
  <div class="main">
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="yyry">
          <div class="title">日销售统计</div>
          <div class="data">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content">
                  <div class="num">{{ this.num }}</div>
                  <div class="text">当日销售量（个）</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <div class="num">{{ this.num }}</div>
                  <div class="text">当日销售额（元）</div>
                </div></el-col
              >
              <el-col :span="6">
                <div class="grid-content">
                  <div class="num">{{ this.num }}</div>
                  <div class="text">当日分成（元）</div>
                </div></el-col
              >
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="ywry">
          <div class="title">月销售统计</div>
          <div class="data">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content">
                  <div class="num2">{{ this.alldata.count }}</div>
                  <div class="text">当月销售量（个）</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <div class="num2">{{ this.alldata.amount }}</div>
                  <div class="text">当月销售额（万元）</div>
                </div></el-col
              >
              <el-col :span="6">
                <div class="grid-content">
                  <div class="num2">{{ this.alldata.divide }}</div>
                  <div class="text">当月分成（元）</div>
                </div></el-col
              >
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>

    <FormBody :tableData="taskList" :tableHead="tableHead">
      <SearchBtn
        :searchContionTask="searchContionTask"
        :alldata="alldata"
        :option="option"
      ></SearchBtn>
    </FormBody>
  </div>
</template>

<script>
import FormBody from "./components/form-body.vue";
import SearchBtn from "./components/search-btn.vue";
import {
  partnerCollectApi,
  dayTotalBillApi,
  monthTotalBillApi,
  orderCountApi,
  orderAmountApi,
  GainpartnersApi,
} from "@/api/bill";
export default {
  components: {
    FormBody,
    SearchBtn,
  },
  data() {
    return {
      num: "",
      value: "",
      radio1: "周",
      radio2: "运营人员",
      //接收后端返回的表格数据
      taskList: [],
      //表格表头数据
      tableHead: [
        {
          column_name: "date",
          column_comment: "订单日期",
        },
        {
          column_name: "ownerName",
          column_comment: "合作商",
        },
        {
          column_name: "ratio",
          column_comment: "分成比例",
        },
        {
          column_name: "orderTotalMoney",
          column_comment: "收入(元)",
        },
        {
          column_name: "orderCount",
          column_comment: "笔数",
        },
        {
          column_name: "totalBill",
          column_comment: "分成金额(元)",
        },
      ],
      //查询下方的数据
      alldata: {
        divide: "",
        count: "",
        amount: "",
        total: "",
      },
      //选项数据
      option: [{ label: "" }],
      form: {
        pageIndex: "",
        pageSize: "",
        startDate: "",
        endDate: "",
        partnerName: ''
      },
    };
  },

  created() {
    this.getpartnerCollect(),
      this.getDayTotalBill(),
      this.getMonthTotalBill(),
      this.orderCount(),
      this.orderAmount(),
      this.Gainpartners();
  },

  methods: {
    // getCurrentTime() {
    //   //获取当前时间并打印
    //   var _this = this;
    //   let yy = new Date().getFullYear(); //年
    //   let mm = new Date().getMonth() + 1; //月
    //   let dd = new Date().getDate(); //日
    //   let hh = new Date().getHours(); //小时
    //   let mf =
    //     new Date().getMinutes() < 10
    //       ? "0" + new Date().getMinutes()
    //       : new Date().getMinutes(); //分钟
    //   let ss =
    //     new Date().getSeconds() < 10
    //       ? "0" + new Date().getSeconds()
    //       : new Date().getSeconds(); //秒数
    //   _this.gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    //   // _this.gettime = yy + "-" + mm + "-" + dd + " " + 23 + ":" + 59 + ":" + 59;

    //   console.log(_this.gettime);
    // },

    async getpartnerCollect() {
      const res = await partnerCollectApi({
        start: "2022-08-01",
        end: "2022-08-09",
      });
      // console.log(res);
      //使用forEach方法来循环遍历并对数据进行处理
      res.currentPageRecords.forEach((item) => {
        item.ratio = item.ratio + "%";
        item.orderTotalMoney = "+" + item.orderTotalMoney / 100;
        item.totalBill = "+" + item.totalBill / 100;
      });
      this.taskList = res.currentPageRecords;
      // console.log(this.taskList);
    },
    async getDayTotalBill() {
      const res = await dayTotalBillApi({
        start: "2022-08-10 00:00:00",
        end: "2022-08-10 23:59:59",
      });
      // console.log(res);
      this.num = res;
    },
    async getMonthTotalBill() {
      const res = await monthTotalBillApi({
        start: "2022-08-01 00:00:00",
        end: "2022-08-09 23:59:59",
      });
      // console.log(res);
      this.alldata.divide = res / 100;
      // console.log(this.divide);
    },
    async orderCount() {
      const res = await orderCountApi({
        start: "2022-08-01 00:00:00",
        end: "2022-08-09 23:59:59",
      });
      // console.log(res);
      this.alldata.count = res;
    },
    async orderAmount() {
      const res = await orderAmountApi({
        start: "2022-08-01 00:00:00",
        end: "2022-08-09 23:59:59",
      });
      // console.log(res);
      // this.amount = (Math.floor(res)/1000000).toFixed(2);
      // console.log(this.amount);
      this.alldata.amount = Math.floor(res / 10000) / 100;
      this.alldata.total = res / 100;
      // console.log(this.amount);
    },
    //获取合作商列表
    async Gainpartners(contion) {
      const res = await GainpartnersApi(contion);
      // console.log(res.currentPageRecords);
      this.option = res.currentPageRecords;
    },
    //查询有问题val是undefined
    async searchContionTask(val) {
      console.log(val);
      this.form.startDate = val.value1[0];
      this.form.endDate = val.value1[1];
      this.form.pageIndex = this.pageIndex;
      this.form.pageSize = this.pageSize;
      this.form.partnerName = val.status
      const res = await partnerCollectApi(this.form);
      console.log(res);
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.yyry {
  background-color: #e9f3ff;
  background-image: url(data:image/png;base64,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),
    url(http://likede2-admin.itheima.net/img/day.4272ef60.png);
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
  height: calc(25vh - 30px);
  height: 220px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
}
.ywry {
  background: #fbefe8
    url(http://likede2-admin.itheima.net/img/month.5c71f45f.png) no-repeat
    calc(100% - 12px) 100%;
  height: calc(25vh - 30px);
  height: 220px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
}

.title {
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 30px;
}
.block {
  margin: 30px;
}
.err {
  position: absolute;
  margin-top: 100px;
  width: 100%;
  height: 100%;
  left: 35%;
  top: 25%;
}
.tips {
  display: flex;
  margin-top: 20px;
  margin-left: 50px;
}

.el-dropdown-link {
  width: 50px;
  height: 20px;
  cursor: pointer;
  color: #ccc;
}

.num {
  text-shadow: 4px 8px 14px rgb(85 132 255 / 50%);
  color: #072074;
  height: 100px;
  font-size: 50px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  line-height: 100px;
  margin-left: 100px;
}
.num2 {
  text-shadow: 4px 8px 14px rgb(85 132 255 / 50%);
  color: #ff5757;
  height: 100px;
  font-size: 50px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  line-height: 100px;
  margin-left: 100px;
}
.text {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #91a7dc;
  line-height: 17px;
  margin-left: 80px;
}
</style>
