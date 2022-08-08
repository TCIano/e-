import request from '@/utils/request'


export function getdetailsApi(params) {
  return request({
    url: 'task-service/task/userWork',
    method: 'get',
    params
  })
}