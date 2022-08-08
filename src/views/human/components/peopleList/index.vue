<template>
  <div>
    <!-- inp 表头 -->
    <input-form @searchContionList="searchContionTask"> </input-form>
    <!-- 表单 -->
    <form-item
      :tableData="peopleList"
      :tableHead="tableHead"
      @deleteListPeople="deleteListPeople"
      @click.native="addFn"
    >
      <!-- 按钮 -->
      <btn @click.native="addFn"></btn>
      <!-- //分页 -->
      <template #page>
        <pageItem :page="pageInfo" @changePage="changePage" ></pageItem>
      </template>
    </form-item>

     
  </div>
</template>

<script>
import pageItem from "@/components/pageIndex";
import { peopleListApi, delPeopleListApi} from "@/api/people";
import InputForm from "./compoments/input.vue";
import FormItem from "./compoments/form.vue";
import btn from "@/components/button";
export default {
  name:'peopleList',
  data() {
    return {
      //表格数据
      peopleList: [],
      // 负责区域
      quyuList:[],
      
      
      // 分页
      pageInfo: {
        pageIndex: 1, //页数
        totalPage: null, //总页数
        totalCount: null,
        // userName:null//名字
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
      ],
    };
  },
  components: {
    InputForm,
    FormItem,
    btn,
    pageItem,
  },

  created() {
    this.peopleListMd();
    this.getywPeople()
    this.getquyuList()
   
  },
  // 弹框
  // watch: {
  //   currentList: {
  //     deep: true,
  //     immediate: true,
  //     handler(val) {
  //       if (val.id) {
  //         this.formInfo = val
  //       } else {
  //         this.formInfo = {
  //           userName: '',
  //           mobile: '',
  //           role: {
  //             roleId: 2,
  //           },
  //           image: '',
  //           status: true,
  //           regionId: '',
  //         }
  //       }
  //     },
  //   },
  // },

  methods: {
    // 获取人员列表
    async peopleListMd() {
      const res = await peopleListApi(this.pageInfo);
      this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);
      this.peopleList = res.currentPageRecords;
    },
    // 切换分页
    changePage(newPage) {
      this.pageInfo.pageIndex = newPage;
      this.peopleListMd();
    },
    // 查询
    async searchContionTask(val) {
      const res = await peopleListApi({
        userName: val,
      });
      this.peopleList = res.currentPageRecords;
    },
    // 删除
    async deleteListPeople() {
      const res = await delPeopleListApi(this.peopleList.id);
      // console.log(res);
      this.peopleListMd(res.currentPageRecords);
    },
    // 添加
    addFn() {
      // console.log(11);
    },
 
     
    
  },
};
</script>

<style scoped lang="less">
.setting {
  border: 0;
  background-color: rgb(251, 244, 240) !important;
  color: black;
}

</style>
