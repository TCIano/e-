<template>
  <div>
    <FacilityTitle :uname="uname" @getSou="getSou" class="title" />
    <div class="buttom">
      <Button class="btn" @click.native="addedEnd" />
      <el-button @click="selectll" size="mini">批量操作</el-button>
    </div>
    <!-- 表单 -->
    <el-table
      ref="multipleTable"
      :data="List"
      row-key="id"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column prop="innerCode" label="设备编号" reserve-selection>
      </el-table-column>
      <el-table-column prop="type.name" label="设备型号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="详细地址" prop="region.name"></el-table-column>
      <el-table-column label="合租商" prop="ownerName"></el-table-column>
      <el-table-column
        label="设备状态"
        prop="vmStatus"
        :formatter="Sizer"
      ></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="text" size="mini" @click="aisle(row)"
            >货道</el-button
          >
          <el-button type="text" size="mini" @click="tactics(row)"
            >策略</el-button
          >
          <el-button type="text" size="mini" @click="isEidtFn(row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])"
          >切换第二、第三行的选中状态</el-button
        >
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </el-table>
    <!-- 详情弹出层 -->
    <el-dialog title="修改设备" :visible.sync="dialogVisible" width="50%">
      <el-form :model="currentObj" label-width="80px">
        <el-form-item>机器编号：{{ currentObj.innerCode }}</el-form-item>
        <el-form-item>供货时间：{{ currentObj.lastSupplyTime }}</el-form-item>
        <el-form-item>设备类型：{{ status }}</el-form-item>
        <el-form-item v-if="currentObj.type"
          >设备容量：{{ currentObj.type.channelMaxCapacity }}</el-form-item
        >
        <el-form-item
          >设备点位：
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in Leavel"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="currentObj.node"
          >合作商：{{ currentObj.node.ownerName }}</el-form-item
        >
        <el-form-item v-if="currentObj.region"
          >所属区域：{{ currentObj.region.name }}</el-form-item
        >
        <el-form-item v-if="currentObj.node"
          >设备地址：{{ currentObj.node.addr }}</el-form-item
        >
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 策略弹出层 -->
    <el-dialog
      v-if="this.tacticsObj.innerCode"
      title="策略管理"
      :visible.sync="isShow"
      width="50%"
    >
      <el-row>
        <el-col :span="12">机器编号：{{ this.tacticsObj.innerCode }}</el-col>
        <el-col :span="12">策略名称：{{ this.tacticsObj.policyName }}</el-col>
        <el-col :span="12">策略方案：{{ this.tacticsObj.discount }}%</el-col>
      </el-row>
      <el-button class="Cancl" @click="CancelStrategy">取消策略</el-button>
    </el-dialog>

    <!-- 批量策略管理 -->
    <el-dialog v-else title="批量策略管理" :visible.sync="isShow" width="50%">
      <el-row class="clgl">
        <el-col :span="24"
          ><span>选择策略：</span
          ><el-select v-model="pathch" placeholder="请选择">
            <el-option
              v-for="item in tacticsStatusList"
              :key="item.value"
              :label="item.policyName"
              :value="item.policyId"
            >
            </el-option> </el-select
        ></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="btnClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增设备 -->
    <el-dialog title="新增设备" :visible.sync="added" width="50%">
      <el-form label-width="80px">
        <el-form-item>设备编号：系统自动生成</el-form-item>
        <el-form-item
          >选择型号：
          <el-select v-model="model" placeholder="请选择">
            <el-option
              v-for="item in SelectModels"
              :key="item.value"
              :label="item.name"
              :value="item.typeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          >选择点位：
          <el-select v-model="gssp" placeholder="请选择">
            <el-option
              v-for="item in PointList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="added = false">取 消</el-button>
        <el-button type="primary" @click="btnOk">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 货道 -->
    <el-dialog title="货道设置" :visible.sync="huodaoShow" width="50%">
      <div>
        <div>
          <el-row class="express">
            <el-col>货道行数:{{ typeInfo.vmRow }}</el-col
            ><el-col>货道列数{{ typeInfo.vmCol }}</el-col
            ><el-col>货道容量（个）:{{ typeInfo.channelMaxCapacity }}</el-col
            ><el-button @click="znphBtn">智能排货</el-button>
          </el-row>
        </div>
        <div>
          <el-scrollbar class="scrollbar">
            <div class="box">
              <div
                class="task"
                v-for="(item, index) in merchandise"
                :key="index"
              >
                <span>{{ item.channelCode }}</span>
                <div class="test">
                  <div>
                    <img v-if="item.sku" :src="item.sku.skuImage" alt="" />
                  </div>
                  <div>
                    <span v-if="item.sku" class="yinliao">{{
                      item.sku.skuName
                    }}</span>
                  </div>
                </div>
                <div>
                  <span
                    ><el-button
                      type="text"
                      size="mini"
                      @click="addSPFN(item, index)"
                      >添加</el-button
                    >
                    <el-button
                      type="text"
                      size="mini"
                      @click="delRevise(item, index)"
                      >删除</el-button
                    ></span
                  >
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <el-dialog
        width="50%"
        title="智能排货"
        :visible.sync="Visible"
        append-to-body
      >
        <div class="tall">
          <div v-for="(item, index) in poupoTwo" :key="index" class="talls">
            <div>
              <img :src="item.image" alt="" style="width: 50px; height: 80px" />
            </div>
            <div>{{ item.skuName }}</div>
          </div>
        </div>
      </el-dialog>

      <el-dialog
        width="50%"
        title="选择商品"
        :visible.sync="SearchPopub"
        append-to-body
      >
        <div class="tall">
          <div
            v-for="(item, index) in addList"
            :key="index"
            class="talls"
            @click="groupClick(item.skuName, item)"
          >
            <div>
              <img
                :src="item.skuImage"
                alt=""
                style="width: 50px; height: 80px"
              />
            </div>
            <div>{{ item.skuName }}</div>
          </div>
        </div>

        <pageIndex :page="pageAdd" @changePage="changePageAdd" />
        <el-button @click="xuanzeSp">确认</el-button>
      </el-dialog>
      <el-button @click="AisleConfiguration">确认</el-button>
    </el-dialog>
    <!-- 货道 -->

    <!-- 分页 -->
    <pageIndex :page="page" @changePage="changePage" />
  </div>
</template>

<script>
import FacilityTitle from "@/components/FacilityTitle";
import {
  souList,
  LevelManagement,
  ModificationVending,
  QueryStrategy,
  CancelStrategy,
  tacticsList,
  applicationStrategy,
  TypeList,
  addNewVendingMachines,
  VendingMachinesDetails,
  VendingMachineDetailDesc,
  BusinessCircleList,
  ReplenishmentRecommendation,
  SpSearch,
  AisleConfiguration
} from "@/api";
import Button from "@/components/button";
import pageIndex from "@/components/Pageindex";
export default {
  name: "Manage",
  data() {
    return {
      uname: "设备编号",
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        totalCount: 0,
      },
      List: [], //总列表
      dialogVisible: false,
      currentObj: {},
      value: "",
      Leavel: [], //状态列表
      isShow: false,
      tacticsObj: {}, //策略列表
      tacticsStatusList: [], //策略状态列表
      pathch: "", //选择当前的状态
      innerCodeList: [], //选中id
      added: false, //新增设备
      pages: {
        pageIndex: 1,
        pageSize: 1000,
      },
      SelectModels: [],
      PointList: [],
      gssp: "",
      model: null,
      createUserId: this.$store.state.user.userInfo.userId,
      huodaoShow: false,
      merchandise: [],
      typeInfo: {},
      Visible: false,
      businessId: null,
      poupoTwo: [],
      SearchPopub: false,
      addList: [],
      pageAdd: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
      },
      newImage: '',
      oldImage: '',
      reviseIndex:'',
      name: '',
      innerCode:'',
      channelList:[]
    };
  },

  created() {
    this.souList();
  },

  methods: {
    async souList() {
      const data = await souList(this.page);
      this.page.totalCount = parseInt(data.totalCount);
      this.List = data.currentPageRecords;
      // console.log(data);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.innerCodeList = val.map((item) => item.innerCode);
      // console.log(this.innerCodeList);
      // this.multipleSelection = val;
    },
    //过滤器
    Sizer(row, column, cellvalue) {
      if (cellvalue == 0) {
        return "未投放";
      } else if (cellvalue == 1) {
        return "运营";
      } else if (cellvalue == 3) {
        return "撤机";
      }
    },
    //分页
    changePage(newPage) {
      this.page.pageIndex = newPage;
      this.souList();
    },
    //搜索
    async getSou(val) {
      const data = await souList({
        innerCode: val,
      });
      // console.log(data);
      this.List = data.currentPageRecords;
    },
    //修改
    isEidtFn(obj) {
      // console.log(obj);
      this.dialogVisible = true;
      this.currentObj = obj;
      this.getLevelManagement();
      this.value = obj.node.name;
    },
    //获取状态列表await
    async getLevelManagement() {
      const data = await LevelManagement();
      // console.log(data);
      this.Leavel = data.currentPageRecords;
    },
    //详情确认
    async confirm() {
      this.dialogVisible = false;
      const data = await ModificationVending(
        this.currentObj.id,
        this.currentObj.nodeId
      );
      console.log(data);
    },
    //点击策略
    async tactics(obj) {
      const data = await QueryStrategy(obj.innerCode);
      const res = await tacticsList();
      this.tacticsStatusList = res;
      // console.log(data);
      // console.log(res);
      this.innerCodeList.push(obj.innerCode);
      // console.log(this.innerCodeList);
      this.tacticsObj = data;
      this.isShow = true;
    },
    //取消策略
    async CancelStrategy() {
      const data = await CancelStrategy(
        this.tacticsObj.innerCode,
        this.tacticsObj.policyId
      );
      // console.log(data);
      this.isShow = false;
    },
    //修改策略
    async btnClick() {
      const data = await applicationStrategy({
        innerCodeList: this.innerCodeList,
        policyId: this.pathch,
      });
      // console.log(data);
    },
    //全部
    async selectll() {
      const res = await tacticsList();
      this.tacticsStatusList = res;
      this.isShow = true;
    },
    //新增
    async addedEnd() {
      this.added = true;
      const data = await TypeList(this.pages);
      const res = await LevelManagement(this.pages);
      // console.log(res);
      // console.log(data);
      this.PointList = res.currentPageRecords;
      this.SelectModels = data.currentPageRecords;
    },
    //添加确认
    async btnOk() {
      const data = await addNewVendingMachines({
        vmType: this.model,
        nodeId: this.gssp,
        createUserId: this.createUserId,
      });
      this.added = false;
    },
    //货道数据
    async aisle(obj) {
      this.huodaoShow = true;
      const data = await VendingMachinesDetails(obj.innerCode);
      const res = await VendingMachineDetailDesc(obj.type.typeId);
      this.typeInfo = res;
      this.businessId = obj.businessId;
      // console.log(obj);
      console.log(data);
      this.merchandise = data;
      this.channelList=data
      this.channelList=this.channelList.map((item)=>{
        var str={}
        
      })
      console.log(this.channelList);
      // console.log(res);
    },
    //智能排货
    async znphBtn() {
      this.Visible = true;
      //  const arw =await BusinessCircleList(this.businessId)
      //  console.log(arw);
      const data = await ReplenishmentRecommendation(this.businessId);
      console.log(data);
      this.poupoTwo = data;
    },
    //添加

    async addSPFN(item,index) {
     console.log(item);
      const data = await SpSearch(this.pageAdd);
      console.log(data);
      this.innerCode=item.innerCode
      this.addList = data.currentPageRecords;
      this.pageAdd.totalCount = parseInt(data.totalCount);
      // console.log(this.pageAdd.totalCount);
      this.reviseIndex = index
      this.oldImage = item.sku.skuImage
       this.SearchPopub = true;
      // console.log(this.reviseIndex );
      // console.log(this.oldImage);
    },
    changePageAdd(newPage) {
      this.addSPFN();
      this.pageAdd.pageIndex = newPage;

    },
        // 删除图片
    delRevise(item, index) {
      this.merchandise[index].sku.skuImage =
        'data:image/png;base64,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'
    },
     groupClick(name, item) {
      console.log(item)
      this.newImage = item.skuImage
      this.name = name
    },
    //选择商品
    xuanzeSp(){
      let index = this.reviseIndex
      this.merchandise[index].sku.skuImage=this.newImage
      this.merchandise[index].sku.skuName=this.name
      this.SearchPopub=false
    },
    //保存
  async  AisleConfiguration(){
      const data=await AisleConfiguration({
              innerCode:  this.innerCode,
       channelList: this.channelList
      }

      )
      console.log(data);
    }
  },
  components: {
    FacilityTitle,
    Button,
    pageIndex,
  },
  computed: {
    status() {
      if (this.currentObj.vmStatus == 0) {
        return "未投放";
      } else if (this.currentObj.vmStatus == 1) {
        return "运营";
      } else if (this.currentObj.vmStatus == 3) {
        return "撤机";
      }
    },
  },
};
</script>

<style scoped lang="less">
.title {
  margin-top: 25px;
  margin-left: 15px;
}
.btn {
  margin-top: 50px;
  margin-left: 15px;
  margin-bottom: 35px;
}
.buttom {
  display: flex;
  text-align: center;
  align-items: center;
}
.Cancl {
  display: flex;
  margin: auto;
}
.express {
  display: flex;
  background-color: #ccc;
  align-items: center;
  justify-content: center;
}
.scrollbar {
  height: 390px;
  max-width: 800px;
  .box {
    max-height: 500px;
    width: 850px;
    display: flex;
    flex-wrap: wrap;
    .task {
      height: 180px;
      width: 160px;
      margin: 5px;
      .test {
        img {
          width: 80px;
          height: 80px;
        }
        .yinliao {
          font-size: 8px;
        }
      }
    }
  }
}

.tall {
  display: flex;
  flex-wrap: wrap;
  .talls {
    width: 180px;
    height: 150px;
  }
}

.el-scrollbar {
  overflow: hidden;
  position: relative;
}
.el-scrollbar__wrap {
  scroll-behavior: smooth;
  overflow: scroll;
  height: 100%;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.scrollbar > div {
  overflow-x: hidden;
}
/*隐藏浏览器自带的水平滚动条*/
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
