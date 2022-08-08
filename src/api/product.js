import request from "@/utils/request";

/**
 * 获取商品列表
 * @returns 
 */
export function getproductApi(params) {
    return request({
    url: '/vm-service/skuClass/search',
    method: 'GET',
    
    })
}

//修改
export function addProductApi(params) {
    return request({
    url: '/vm-service/skuClass/:classId',
    method: 'PUT',
    
    })
}

//删除
/**
 * 删除商品类型
 * @param {*} id 要删除的商品类型id
 * @returns promise
 */
export function delProductApi(id) {
    return request({
    url: '/vm-service/skuClass' + id,
    method: 'DELETE',
    
    })
}