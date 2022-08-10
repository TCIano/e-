import request from '@/utils/request'
import store from '@/store'
// 工单状态列表
export const getStaList = () => {
  return request({
    url: '/task-service/task/allTaskStatus',
  })
}
// 订单管理
export const getDD = (params) => {
  return request({
    url: '/order-service/order/search',
    params,

  })
}
// 工单列表
export const getGDList=(params)=>{
  return request({
    url:'/task-service/task/search',
    params
  })
}
//根据售货机获取维修人员列表
export const getWXlist =(id)=>{
  return request({
    url:`/user-service/user/repairerList/${id}`
  })
}
//获取所有工单类型
export const getStatusList =(val)=>{
  return request({
    url:'/task-service/taskType/list',
    val
  })
}
//新建工单
export const addGD=(data)=>{
  return request({
    url:'/task-service/task/create',
    method:'post',
    data
  })
}
// 补货详情
export const BHdescrption=(id)=>{
  return request({
    url:`/task-service/taskDetails/${id}`
  })
}
//获取补货预警值
export const BHyjz=()=>{
  return request({
    url:'/task-service/task/supplyAlertValue'
  })
}
//设置
export const SZbz=(data)=>{
  return request({
    url:"/task-service/task/autoSupplyConfig",
    method:'post',
    data
  })
}
//获取售货机货道详情
export const SHdescription=(id)=>{
  return request({
    url:`/vm-service/channel/channelList/${id}`
  })
}

