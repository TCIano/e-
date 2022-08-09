import request from '@/utils/request'

/**
 * 获取用户工作量(工单统计)
 * @param {*} params 
 * userId   当前行id
 * start 示例  2020-10-01 00:00:00
 * end 示例  2020-10-31 00:00:00
 * @returns 
 */
export function getdetailsApi(params) {
  return request({
    url: 'task-service/task/userWork',
    method: 'get',
    params
  })
}


export function getAreaApi(params) {
  return request({
    url: 'vm-service/region/search',
    method: 'get',
    params
  })
}

export function getSearchApi(params) {
  return request({
    url: '/user-service/user/searchUserWork',
    method: 'get',
    params
  })
}