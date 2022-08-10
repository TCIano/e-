import request from "@/utils/request";

/**
 *人员统计头部信息
 * @param {String} start 开始时间
 * @param {String} end 结束时间
 * @returns
 */
export const TaskInfoApi = (start, end) => {
  return request({
    url: "/task-service/task/taskReportInfo/" + start + "/" + end,
  });
};

/**
 *获取前几的商品
 * @param {String} start
 * @param {String} end
 * @returns
 */
export const getTopSale = (start, end) => {
  return request({
    url: "/order-service/report/skuTop/" + 10 + "/" + start + "/" + end,
  });
};

/**
 *获取一定时间的订单数
 * @param {Object} params
 * start	是	2020-01-01 00:00:00	开始日期时间
 *end	是	2020-01-01 00:00:00	结束日期时间
 * @returns
 */
export const getOrderCountApi = (params) => {
  return request({
    url: "/order-service/report/orderCount",
    params,
  });
};

/**
 * 获取销售总额
 * @param {Object} params
 * @returns
 */
export const getSaleCountApi = (params) => {
  return request({
    url: "/order-service/report/orderAmount",
    params,
  });
};
