import request from "@/utils/request";

//合作商列表
export function GainpartnersApi() {
    return request({
    url: '/user-service/partner/search',
    method: 'GET',
    
    })
}

//订单总数
export function orderCountApi(params) {
    return request({
    url: '/order-service/report/orderCount',
    method: 'GET',
    params
    })
}

//收入
export function orderAmountApi(params) {
    return request({
    url: '/order-service/report/orderAmount',
    method: 'GET',
    params
    })
}

//日分成总数
export function dayTotalBillApi(params) {
    return request({
    url: '/order-service/report/totalBill',
    method: 'GET',
    params
    })
}

//月分成总数
export function monthTotalBillApi(params) {
    return request({
    url: '/order-service/report/totalBill',
    method: 'GET',
    params
    })
}

//获取列表接口
export function partnerCollectApi(params) {
    return request({
    url: '/order-service/report/partnerCollect',
    method: 'GET',
    params
    })
}
