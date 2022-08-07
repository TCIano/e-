import request from "@/utils/request";

/**
 * 区域列表
 * @param {Object} params 
 *  pageIndex	否		当前页码
    pageSize	否		每页数据个数
    name	否		区域名称
 * @returns 
 */
export const getRegionApi = (params) => {
  return request({
    url: "/vm-service/region/search",
    params,
  });
};
