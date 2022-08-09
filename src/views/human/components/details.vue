<template>
  <el-dialog title="人员详情" :visible="visible" width="50%" @close="onClose">
    <div class="container">
      <span>人员名称：{{ list.userName }} </span>
      <span>角色：{{ list.roleName }} </span>
      <span>联系电话：{{ list.mobile }} </span>
    </div>
    <span>负责区域：{{ list.regionName }}</span>
    <div>
      <!-- <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label=""> </el-table-column>
        <el-table-column
          prop="total"
          label="总工单数"
          style="background-color: red"
        >
        </el-table-column>
        <el-table-column prop="refuse" label="拒绝工单"> </el-table-column>
        <el-table-column prop="achive" label="完成工单"> </el-table-column>
        <el-table-column prop="doing" label="进行中工单"> </el-table-column>
      </el-table> -->
      <div class="bottom">
        <div class="a">1</div>

        <div class="a">总工单数</div>

        <div class="a">拒绝工单</div>

        <div class="a">完成工单</div>

        <div class="a">进行中工单</div>
      </div>

      <div class="data">
        <div class="a">本周</div>

        <div class="a">{{day.total}}</div>

        <div class="a">{{day.cancelCount}}</div>

        <div class="a">{{day.workCount}}</div>

        <div class="a">{{day.progressTotal}}</div>
      </div>

      <div class="data">
        <div class="a">本月</div>

        <div class="a">{{month.total}}</div>

        <div class="a">{{month.cancelCount}}</div>

        <div class="a">{{month.workCount}}</div>

        <div class="a">{{month.progressTotal}}</div>
      </div>

      <div class="data">
        <div class="a">本年</div>

        <div class="a">{{year.total}}</div>

        <div class="a">{{year.cancelCount}}</div>

        <div class="a">{{year.workCount}}</div>

        <div class="a">{{year.progressTotal}}</div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer"> </span>
  </el-dialog>
</template>

<script>
import { getdetailsApi } from "@/api/request";
import { getUserInfo } from "@/api/user";
export default {
  name:'details',
  data() {
    return {
      tableData: [
        {
          date: "本周",
          total: "1",
          refuse: "1",
          achive: "1",
          doing: "1",
        },
        {
          date: "本月",
          total: "1",
          refuse: "1",
          achive: "1",
          doing: "1",
        },
        {
          date: "本年",
          total: "1",
          refuse: "1",
          achive: "1",
          doing: "1",
        },
      ],
      list: {},
      year:[],
      month:[],
      day:[]
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    
    userId:{
      type:[Number,String]
    }
    
  },

  created() {
    this.getYearList()
    this.getmonthList();
    this.getdayList()
    
    
  },

  methods: {
    
    // 获取用户工作量(工单统计)  年
    async getYearList() {
      // moment().format('YYYY-MM-DD HH:mm:ss')
      const year = await getdetailsApi({
        userId:this.userId,
        start:'2022-01-01 00:00:00',
        end:'2022-08-09 23:59:59'
      });
      // console.log(year);  
      this.year = year
      console.log(this.year);
    },
    // 获取用户工作量(工单统计)  月
    async getmonthList() {
      // moment().format('YYYY-MM-DD HH:mm:ss')
      const month = await getdetailsApi({
        userId:this.userId,
        start:'2022-08-01 00:00:00',
        end:'2022-08-09 23:59:59'
      });
      this.month = month 
      console.log(this.month);
    },
    // 获取用户工作量(工单统计)  日
    async getdayList() {
      // moment().format('YYYY-MM-DD HH:mm:ss')
      const day = await getdetailsApi({
        userId:this.userId,
        start:'2022-08-04 00:00:00',
        end:'2022-08-09 23:59:59'
      });
      this.day = day 
      console.log(this.day);
    },


    async getDetailsInfo(id) {
      const res2 = await getUserInfo(id);
      // console.log(res2);
      this.list = res2;
      // console.log(this.list);
    },
    onClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: space-between;
}
span {
  margin-bottom: 20px;
}
.bottom {
  margin-top: 26px;
  background: #f7f8fd;
  height: 60px;
  border: 1px solid #d8dde3;
  display: flex;
  align-items: center;
  .a {
    line-height: 40px;
    border-right: 1px solid #d8dde3;
    width: 20%;
    text-align: center;
  }
}
.data {
  height: 60px;
  border: 1px solid #d8dde3;
  display: flex;
  align-items: center;
  .a {
    line-height: 40px;
    border-right: 1px solid #d8dde3;
    width: 20%;
    text-align: center;
  }
}
</style>
