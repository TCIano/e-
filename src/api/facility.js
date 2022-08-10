import request from "@/utils/request";

//售货机列表
export const getList = (params) => {
  return request({
    url: "/vm-service/vm/search",
    params,
  });
};
//获取售货机商品销量
export const Commodity = (innerCode, start, end) => {
  return request({
    url: `/order-service/report/skuCollect/${innerCode}/${start}/${end}`,
  });
};
//获取售货机维修次数
export const Maintenance = (innerCode, start, end) => {
  return request({
    url: `/task-service/task/repairCount/${innerCode}/${start}/${end}`,
  });
};
//获取售货机补货次数
export const Replenishment = (innerCode, start, end) => {
  return request({
    url: `/task-service/task/supplyCount/${innerCode}/${start}/${end}`,
  });
};
//获取一定时间范围之内的订单总数
export const OrdersTotal = (params) => {
  return request({
    url: `/order-service/report/orderCount`,
    params,
  });
};
//获取一定时间范围之内的收入
export const Saleroom = (params) => {
  return request({
    url: "/order-service/report/orderAmount",
    params,
  });
};
//搜索售货机(售货机列表)
export const souList = (params) => {
  return request({
    url: "/vm-service/vm/search",
    params,
  });
};
//售货机类型列表(搜索) /api/vm-service/vmType/search
export const TypeList = (params) => {
  return request({
    url: "/vm-service/vmType/search",
    params,
  });
};
// 图片上传
export const Pictuce = (data) => {
  return request({
    url: "/vm-service/sku/fileUpload",
    method:'post',
    data,
  });
};
//新增售货机类型
export const NewVendingMachines=(data)=>{
  return request({
    url:'/vm-service/vmType',
    method:'post',
    data
  })
}
//售货机类型删除
export const deleteVendingMachine=(id)=>{
  return request({
    url:`/vm-service/vmType/${id}`,
    method:'DELETE'
  })
}
//售货机类型修改
export const iseditVendingMachine=(id,data)=>{
  return request({
    url:`/vm-service/vmType/${id}`,
    method:'put',
    data
  })
}
//应用策略
export const tactics=()=>{
  return request({
    url:'/vm-service/vm/applyPolicy',
    method:'put'
  })
}
//策略列表
export const tacticsList=(params)=>{
  return request({
    url:'/vm-service/policy',
    params
  })
}
//点位搜索
export const LevelManagement=(params)=>{
  return request({
    url:'/vm-service/node/search',
    params
  })
}
//修改售货机点位
export const ModificationVending =(id,nodeid)=>{
  return request({
    url:`/vm-service/vm/${id}/${nodeid}`,
    method:'put'
  })
}
//查询售货机策略
export const QueryStrategy=(id)=>{
  return request({
    url:`/vm-service/policy/vmPolicy/${id}`
  })
}

//取消策略
export const CancelStrategy=(id,policyId)=>{
  return request({
    url:`/vm-service/vm/cancelPolicy/${id}/${policyId}`,
    method:'put'
  })
}

//应用策略
export const applicationStrategy=(data)=>{
  return request({
    url:'/vm-service/vm/applyPolicy',
    method:'put',
    data
  })
}
//新增售货机
export const addNewVendingMachines=(data)=>{
  return request({
    url:'/vm-service/vm',
    method:'post',
    data
  })
}
//获取售货机货道详情
export const VendingMachinesDetails=(id)=>{
  return request({
    url:`/vm-service/channel/channelList/${id}`
  })
}

//售货机类型详情
export const VendingMachineDetailDesc=(id)=>{
  return request({
    url:`/vm-service/vmType/${id}`
  })
}

//商圈列表
export const BusinessCircleList=(data)=>{
  return request({
    url:'/vm-service/businessType',
    data
  })
}

//获取商圈下销量前10的商品(补货推荐)
export const ReplenishmentRecommendation=(id)=>{
  return request({
    url:`/vm-service/sku/businessTop10/${id}`
  })
}

//商品搜索
export const SpSearch=(params)=>{
  return request({
    url:'/vm-service/sku/search',
    params
  })
}

//货道配置
export const AisleConfiguration=(data)=>{
  return request({
    url:'/vm-service/channel/channelConfig',
    method:'put',
    data
  })
}