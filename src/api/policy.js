import request from "@/utils/request";

// 策略管理

/**
 * 策略管理列表
 * @param {*} params 
 * @returns 
 */
export const policyListApi = (params) => {
  return request({
    url: "/vm-service/policy/search",
    params,
  });
};

// /vm-service/vmType/search

/**
 * 策略搜索
 * @param {*} params 
 * pageIndex 页码
 * pageSize 页数
 * name   名字
 * @returns Promise
 */
export const searchPolicyApi = (params) => {
  return request({
    url: "/vm-service/policy/search",
    params,
  });
};


/**
 *  查看列表详情
 * @param {*} id pageIndex
 * @param {*} params pageSize
 * @returns Promise
 */
export const lookPolicyApi = (id,params) => {
  return request({
    url: "/vm-service/policy/vmList/" + id,
    params,
  });
};

// /vm-service/policy
/**
 * 新增策略管理
 * @param {*} data  
 * policyName 策略名称
 * discount  折扣比例数  undefined: 90 integer
 * @returns 
 */
export const addPolicyApi = (data) => {
  return request({
    url: "/vm-service/policy",
    method: 'POST',
    data,
  });
};

// /vm-service/policy/:policyId
/**
 * 修改策略
 * @param {*} id 策略Id
 * @param {*} data 
 * policyName  策略名
 * discount  折扣值
 * @returns 
 */
export const editPolicyApi = (id,data) => {
  return request({
    url: "/vm-service/policy/" + id,
    method: "PUT",
    data,
  });
};

