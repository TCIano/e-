import request from '@/utils/request'


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