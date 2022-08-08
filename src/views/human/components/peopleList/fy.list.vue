<template>
  <div>
    <input-form
      @searchContionTask="searchContionTask"
    >
    </input-form>
    <form-item :tableData="peopleList" :tableHead="tableHead">
      <btn></btn>
      
      <template #page>
        
       <!-- //分页 -->
        <pageItem
          :pageInfo="pageInfo"
          @prevClick="prevClick"
          @nextClick="nextClick"
        ></pageItem>
      </template>
    </form-item>
  </div>
</template>

<script>
import pageItem from "@/components/pageItem";
import { peopleListApi } from "@/api/people";
import InputForm from "./compoments/input.vue";
import FormItem from "./compoments/form.vue";
import btn from "@/components/button";
export default {
  data () {
    return {
      //表格数据
      peopleList: [],
      // 分页
      pageInfo: {
        pageIndex: 1, //页数
        totalPage: null, //总页数
        totalCount: null,
      },
       //表头数据
      tableHead: [
        {
          column_name: "userName",
          column_comment: "人员名称",
        },
        {
          column_name: "regionName",
          column_comment: "归属区域",
        },
        // {
        //   column_name: "roleName",
        //   column_comment: "角色",
        // },
        {
          column_name: "mobile",
          column_comment: "联系电话",
        }
       
      ],
    }
  },
  components: {
    InputForm,
    FormItem,
    btn,
    pageItem,
  },

  created () {
    this.peopleListMd()
  },

  methods: {
    // 获取人员列表
   async peopleListMd() {
      const res = await peopleListApi()
      console.log(res);
      
      console.log(res.currentPageRecords);
      this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);
      this.peopleList = res.currentPageRecords;
      // console.log(peopleList);
      
    },
     //获取下一页
    async nextClick() {
      // const res = await searchTask({
      //   pageIndex: `${this.pageInfo.pageIndex + 1}`,
      // });
      // this.pageInfo.pageIndex = parseInt(res.pageIndex);

      // this.taskList = res.currentPageRecords;
      this.searchTask({ pageIndex: `${this.pageInfo.pageIndex + 1}` });
    },
    //上一页
    async prevClick() {
      // const res = await searchTask({
      //   pageIndex: `${this.pageInfo.pageIndex - 1}`,
      // });
      // this.pageInfo.pageIndex = parseInt(res.pageIndex);

      // this.taskList = res.currentPageRecords;
      this.searchTask({ pageIndex: `${this.pageInfo.pageIndex - 1}` });
    },
  
  }
}
</script>

<style scoped lang='less'>
.setting {
  border: 0;
  background-color: rgb(251, 244, 240) !important;
  color: black;
}
</style>
