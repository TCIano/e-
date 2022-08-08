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

/**
 *  根据区域id获取详情
 * @param {String} regionId 根据区域id获取区域详情
 * @returns
 */
export const getNodeDetialById = (params) => {
  return request({
    url: "/vm-service/node/search",
    params,
  });
};

/**
 *获取区域
 * @param {Object} data
 * regionName	string 区域名称
 * remark	string 备注
 * @returns
 */
export const addRegionApi = (data) => {
  return request({
    method: "POST",
    url: "/vm-service/region",
    data,
  });
};

export const editRegionApi = (id, data) => {
  return request({
    method: "PUT",
    url: "/vm-service/region/" + id,
    data,
  });
};
