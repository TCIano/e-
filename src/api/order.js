import request from "@/utils/request";

// /api/order-service/order/search

/**
 * 
 * @returns 获取订单管理列表
 */
export const getOrderList = () => {
  return request({
    url: "/order-service/order/search",
  });
};

// 订单搜索
// /api/order-service/order/search
export const searchOrderList = (params) => {
  return request({
    url: "/order-service/order/search",
    params,
  });
};