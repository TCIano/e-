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

/**
 * 获取商圈列表
 * @returns promise
 */
export const getBusinessApi = () => {
  return request({
    url: "/vm-service/businessType",
  });
};

/**
 * 获取合作商列表
 * @returns promise
 */
export const getPartnerApi = (params) => {
  return request({
    url: "/user-service/partner/search",
    params,
  });
};

/**
 *
 * @param {Object} data
 * name	string	必须		名称
 * addr	string	必须		详细地址
 * areaCode	string	必须		最后一级区域Id
 * createUserId	integer	必须		创建人Id
 * regionId	string	必须		所属区域Id
 * businessId	integer	必须		所属商圈Id
 * ownerId	integer	必须		合作商Id
 * ownerName	string	必须		合作商名称
 * @returns
 */
export const addNodeApi = (data) => {
  return request({
    method: "POST",
    url: "/vm-service/node",
    data,
  });
};

export const editNodeApi = (id, data) => {
  return request({
    method: "PUT",
    url: "/vm-service/node/" + id,
    data,
  });
};

/**
 * 点位详情
 * @param {String} id 点位id
 * @returns
 */
export const nodeDetailApi = (id) => {
  return request({
    url: "/vm-service/node/vmList/" + id,
  });
};

/**
 * 删除点位
 * @param {String} id 点位id
 * @returns
 */
export const delNodeApi = (id) => {
  return request({
    method: "DELETE",
    url: "/vm-service/node/" + id,
  });
};

/**
 * 合作商搜索
 * @param {Object} params
 * pageIndex	否
 * pageSize	否
 * name	否		合作商名称
 * @returns
 */
export const searchPartnerApi = (params) => {
  return request({
    url: "/user-service/partner/search",
    params,
  });
};

/**
 *
 * @param {Object} data
 * name	string	非必须		合作商名称
 *account	string	非必须		账号
 *password	string	必须		密码
 *ratio	number	非必须		分成比例
 *contact	string	非必须		联系人
 *phone	string	非必须		联系电话
 *mobile	string	必须		手机号
 * @returns
 */
export const addPartnerApi = (data) => {
  return request({
    method: "POST",
    url: "/user-service/partner",
    data,
  });
};

/**
 *
 * @param {String} id 合作商id
 * @param {Object} data
 * id	number	非必须		id
 *name	string	非必须		名称
 *ratio	number	非必须		分成比例
 *contact	string	非必须		联系人
 *phone	string	非必须		联系电话
 *mobile	string	必须		手机号
 * @returns
 */
export const editPartnerApi = (id, data) => {
  return request({
    method: "PUT",
    url: "/user-service/partner/" + id,
    data,
  });
};

/**
 * 重置合作商密码
 * @param {String} id 合作商id
 * @returns
 */
export const resetPassApi = (id) => {
  return request({
    method: "PUT",
    url: "/user-service/partner/resetPwd/" + id,
  });
};

/**
 * 删除合作商
 * @param {String} id 合作商id
 * @returns
 */
export const delPartnerApi = (id) => {
  return request({
    method: "DELETE",
    url: "/user-service/partner/" + id,
  });
};
