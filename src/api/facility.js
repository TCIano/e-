import request from "@/utils/request";

//售货机列表
export const getList = (params) => {
  return request({
    url: "/vm-service/vm/search",
    params
  });
};
//获取售货机商品销量
export const Commodity=(innerCode,start,end)=>{
    return request({
        url:`/order-service/report/skuCollect/${innerCode}/${start}/${end}`
    })
}
//获取售货机维修次数
export const Maintenance=(innerCode,start,end)=>{
  return request({
    url:`/task-service/task/repairCount/${innerCode}/${start}/${end}`
  })
}
//获取售货机补货次数
export const Replenishment=(innerCode,start,end)=>{
  return request({
    url:`/task-service/task/supplyCount/${innerCode}/${start}/${end}`
  })
}
//获取一定时间范围之内的订单总数
export const OrdersTotal=(params)=>{
  return request({
    url:`/order-service/report/orderCount`,
    params
  })
}
//获取一定时间范围之内的收入
export const Saleroom=(params)=>{
  return request({
    url:'/order-service/report/orderAmount',
    params
  })
}
