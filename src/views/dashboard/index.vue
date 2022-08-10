<template>
  <div class="main">
    <el-row :gutter="24" style="height: 120px">
      <el-col :span="18">
        <el-row>
          <el-col :span="15">
            <div class="yyry">
              <div>
                <div class="title" style="display: inline-block">工单统计</div>
                <span style="color: #ccc">{{ time }}</span>
              </div>
              <div class="data">
                <el-row :gutter="12" type="flex" justify="space-around">
                  <el-col :span="6">
                    <div class="grid-content">
                      <div class="num">
                        {{ `${humanInfo[0].total}` + `${humanInfo[1].total}` }}
                      </div>
                      <div class="text">工单总数（个）</div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content">
                      <div class="num">
                        {{
                          humanInfo[0].completedTotal +
                          humanInfo[1].completedTotal
                        }}
                      </div>
                      <div class="text">完成工单（个）</div>
                    </div></el-col
                  >
                  <el-col :span="6">
                    <div class="grid-content">
                      <div class="num">
                        {{
                          humanInfo[0].progressTotal +
                          humanInfo[1].progressTotal
                        }}
                      </div>
                      <div class="text">进行工单（个）</div>
                    </div></el-col
                  >
                  <el-col :span="6">
                    <div class="grid-content">
                      <div class="num">
                        {{
                          humanInfo[0].cancelTotal + humanInfo[1].cancelTotal
                        }}
                      </div>
                      <div class="text">拒绝工单（个）</div>
                    </div></el-col
                  >
                </el-row>
              </div>
            </div>
          </el-col>
          <el-clo :span="11">
            <div class="ywry">
              <div>
                <div class="title" style="display: inline-block">销售统计</div>
                <span style="color: #ccc">{{ time }}</span>
              </div>
              <div class="data">
                <el-row :gutter="9" type="flex" justify="space-around">
                  <el-col :span="8">
                    <div class="grid-content">
                      <div class="num">{{ totalCount }}</div>
                      <div class="text">订单量（个）</div>
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <div class="grid-content">
                      <div class="num">
                        {{ (totalSaleCount / 10000).toFixed(1) }}
                      </div>
                      <div class="text">销售额（万元）</div>
                    </div></el-col
                  >
                </el-row>
              </div>
            </div>
          </el-clo>
        </el-row>
        <el-row>
          <div class="gdzt">
            <div>
              <div class="title" style="display: inline-block">销售数据</div>
              <span style="color: #ccc">{{ time }}</span>
            </div>

            <div style="margin: 30px">
              <el-radio-group
                v-model="radio1"
                size="small"
                text-color="black"
                fill="#6480e3"
              >
                <el-radio-button label="周"></el-radio-button>
                <el-radio-button label="月"></el-radio-button>
                <el-radio-button label="年"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="err">
              <div class="saleDataPro">456</div>
              <div class="saleDataDe">456</div>
              <!-- <img src="@/assets/rxtj/rxtj4.png" alt="" />
              <div class="tips">暂无数据</div> -->
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="rxpm">
          <div>
            <div class="title" style="display: inline-block">商品热榜</div>
            <span style="color: #ccc">{{ time }}</span>
          </div>

          <div class="err" style="display: block; margin-top: -90px">
            <!-- <img src="@/assets/rxtj/rxtj4.png" alt="" />
            <div class="tips">暂无数据</div> -->
            <div
              class="hotSale"
              v-for="(item, index) in hotSaleCount"
              :key="index"
              style="
                display: flex;
                align-items: center;
                justify-content: space-around;
                margin-left: -101px;
              "
            >
              <p style="font-size: 15px; font-weight: 600; margin-left: -60px">
                {{ item.skuName }}
              </p>
              <span style="margin-right: 50px; font-size: 15px">{{
                item.count + "单"
              }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="14">
        <div class="gdzt">
          <div>
            <div class="title" style="display: inline-block">
              合作商点位Top5
            </div>
            <span style="color: #ccc">{{ time }}</span>
          </div>

          <div class="err">
            <!-- <img src="@/assets/rxtj/rxtj4.png" alt="" />
            <div class="tips">暂无数据</div> -->
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="gdzt">
          <div>
            <div class="title" style="display: inline-block">设备异常监控</div>
            <span style="color: #ccc">{{ time }}</span>
          </div>

          <div class="err">
            <!-- <img src="@/assets/rxtj/rxtj4.png" alt="" />
            <div class="tips">暂无数据</div> -->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {
  getOrderCountApi,
  getSaleCountApi,
  getTopSale,
  TaskInfoApi,
} from "@/api";
export default {
  data() {
    return {
      arr: [],
      value: "",
      radio1: "周",
      radio2: "运营人员",
      // pageInfo: {
      //   pageIndex: 1,
      // },
      humanInfo: [],
      totalCount: null,
      totalSaleCount: null,
      hotSaleCount: [], //热销
    };
  },

  created() {
    this.hotSale();
    this.TaskInfo();
    this.getOrderCount();
    this.getSaleCount();
  },
  computed: {
    time() {
      const date = dayjs(Date.now()).format("YYYY-MM-DD");
      const start = dayjs(Date.now()).format("YYYY-MM");

      return start + "-" + "01" + "~" + date;
    },
  },
  methods: {
    // onScroll() {
    //   this.getArea({ pageIndex: `${this.pageInfo.pageIndex + 1}` });
    // },
    //获取热销商品
    async hotSale() {
      const date = dayjs(Date.now()).format("YYYY-MM-DD");
      const start = dayjs(Date.now()).format("YYYY-MM");
      const res = await getTopSale(start + "-" + "01", date);
      this.hotSaleCount = res;
    },
    //获取总数
    async TaskInfo() {
      const date = dayjs(Date.now()).format("YYYY-MM-DD");
      console.log(date);
      const start = dayjs(Date.now()).format("YYYY-MM");
      console.log(start);
      const res = await TaskInfoApi(
        start + "-" + "01" + " 00:00:00",
        date + " 23:59:59"
      );
      console.log(res);
      this.humanInfo = res;
    },
    //获取订单总数
    async getOrderCount() {
      const date = dayjs(Date.now()).format("YYYY-MM-DD");
      const start = dayjs(Date.now()).format("YYYY-MM");
      const res = await getOrderCountApi({
        start: start + "-" + "01" + " 00:00:00",
        end: date + " 23:59:59",
      });
      // console.log(res);
      this.totalCount = res;
    },

    //获取销售总额
    async getSaleCount() {
      const date = dayjs(Date.now()).format("YYYY-MM-DD");
      const start = dayjs(Date.now()).format("YYYY-MM");
      const res = await getSaleCountApi({
        start: start + "-" + "01" + " 00:00:00",
        end: date + " 23:59:59",
      });
      this.totalSaleCount = res;
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
    url(data:image/png;base64,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);
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
  height: calc(25vh - 30px);
  height: 220px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
}
.ywry {
  background: #fbefe8 url(~@/assets/rxtj/rxtj3.png) no-repeat calc(100% - 12px)
    100%;
  /* height: calc(25vh - 30px); */
  height: 220px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
}
.gdzt {
  height: 500px !important;
  position: relative;
  /* min-height: 700px; */
  background: #fff;
  border-radius: 30px;
  display: flex;
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
  display: flex;
  /* justify-content: center; */
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
.rxpm {
  /* height: calc(90vh - 90px); */
  height: 740px;
  /* min-height: 700px; */
  background: #fff;
  border-radius: 30px;
  display: flex;
  position: relative;
}
.choose {
  width: 110px;
  height: 40px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin: 20px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-dropdown-link {
  width: 50px;
  height: 20px;
  cursor: pointer;
  color: #ccc;
}
.el-icon-arrow-down {
  font-size: 12px;
  margin-left: 20px;
}
.check {
  position: absolute;
  margin: 90px;
}
.num {
  text-shadow: 4px 8px 14px rgb(85 132 255 / 50%);
  color: #072074;
  height: 100px;
  font-size: 50px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  line-height: 100px;
  margin-left: 70px;
}
.text {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #91a7dc;
  line-height: 17px;
  margin-left: 50px;
}

.scrollbar {
  white-space: nowrap;
}
.el-scrollbar {
  display: flex;
  justify-content: space-around;
  padding: 0 10px;
}
.el-scrollbar__wrap {
  overflow-y: scroll;
  overflow-x: hidden;
  width: 110%;
  height: 100%;
}
</style>
