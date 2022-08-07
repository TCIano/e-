import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function searchUserWork(params) {
  return request({
    url: '/user-service/user/searchUserWork',
    method: 'get',
    params
  })
}
