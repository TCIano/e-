<template>
  <div>
    <inputForm @change="change"></inputForm>

    <From :tableHead="tableHead"  :tableData="policyList" @addPolicyBtn="addPolicyBtn" @editPolicyBtn="editPolicyBtn" :pageInfo="pageInfo">
       <template #page>
        <!-- //分页 -->
        <pageItem
          :pageInfo="pageInfo"
          @prevClick="prevClick"
          @nextClick="nextClick"
        ></pageItem>
      </template>
    </From>
  </div>
</template>

<script>
import inputForm from "./compoments/inp.vue";
import From from "./compoments/form.vue";
import pageItem from "@/components/pageItem";
import { policyListApi , searchPolicyApi,addPolicyApi,editPolicyApi } from '@/api/policy'


export default {
  
  name: "order",
  data() {
    return {
      tableHead: [
        {
          column_name: "policyName",
          column_comment: "策略名字",
        },
        {
          column_name: "discount",
          column_comment: "策略方案",
        },
        {
          column_name: "createTime",
          column_comment: "创建时间",
        },
        
      ],
      policyList:[], //列表
     policypage:{},
     pageInfo: {
        pageIndex: 1, //页数
        totalPage: null, //总页数
        totalCount: null,
      },
    };
  },
  components: {
    inputForm,
    From,
    pageItem
    
  },

  created() {
   this.policyListFn()
  },

  methods: {
    // 获取列表
   async policyListFn(val) {
     const res = await policyListApi(val)
     console.log(res);
     res.currentPageRecords.forEach((item) => {
        
        item.createTime = item.createTime.replace(/-/g, ".");
        item.createTime = item.createTime.replace(/T/g, " ");
      });
       this.pageInfo.pageIndex = parseInt(res.pageIndex);
      this.pageInfo.totalPage = parseInt(res.totalPage);
      this.pageInfo.totalCount = parseInt(res.totalCount);

      
     this.policyList = res.currentPageRecords
     this.policypage = res
     console.log(this.policypage);
    },
    // 查询列表
   async change(val) {
      console.log(val);
     console.log(this.policyList);
      const res = await searchPolicyApi({
        pageIndex: this.policypage.pageIndex,
        pageSize: this.policypage.pageSize,
        policyName:val
      })
      console.log(res);
      console.log(123333);
      this.policyList = res.currentPageRecords
      
    },
    // 添加
   async addPolicyBtn(val) {
    const res = await addPolicyApi(val)
        console.log(res);
        this.policyListFn()
    },
    // 编辑
   async editPolicyBtn(val) {
    console.log(val);
      console.log(11);
      const res = await editPolicyApi(val.policyId,{
        policyName: val.policyName,
        discount: val.discount
      })
        console.log(res);
        this.policyListFn()

    },

     //获取下一页
     nextClick() {
      this.policyListFn({ pageIndex: `${this.pageInfo.pageIndex + 1}` });
    },
    //上一页
     prevClick() {
      this.policyListFn({ pageIndex: `${this.pageInfo.pageIndex - 1}` });
    },
  }
  }
</script>

<style scoped></style>
