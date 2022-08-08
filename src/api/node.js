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

/**
 *
 * @param {String} id 当前区域id
 * @param {Object} data
 * regionName	string	必须		区域名称
 * remark	string	必须		备注
 * @returns
 */
export const editRegionApi = (id, data) => {
  return request({
    method: "PUT",
    url: "/vm-service/region/" + id,
    data,
  });
};

/**
 *
 * @param {String} id 当前区域id
 * @returns
 */
export const delRegionApi = (id) => {
  return request({
    method: "DELETE",
    url: "/vm-service/region/" + id,
  });
};

/**
 * 点位搜索
 * @param {Object} params
 * pageIndex	否
 * pageSize	否
 * name	否		点位名称
 * regionId	否		区域id
 *
 *id	number	非必须		id
 *name	string	非必须		名称
 *ratio	number	非必须		分成比例
 *contact	string	非必须		联系人
 *phone	string	非必须		联系电话
 *
 * @returns
 */
export const getNodeApi = (params, data) => {
  return request({
    url: "/vm-service/node/search",
    params,
    data,
  });
};
