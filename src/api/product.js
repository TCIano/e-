import request from "@/utils/request";

/**
 * 获取商品列表和搜索
 * @returns 
 */
export function getproductApi(params) {
    return request({
    url: '/vm-service/skuClass/search',
    method: 'GET',
    params
    })
}

//修改
/**
 * 修改商品类型名称
 * @param {*} id classId
 * @param {*} data className
 * @returns promise
 */
export function setProductApi(id) {
    return request({
    url: '/vm-service/skuClass/' + id ,
    method: 'GET',
    })
}

export function editProductApi(id, data) {
    return request({
    url: '/vm-service/skuClass/' + id ,
    method: 'PUT',
    data
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
    url: '/vm-service/skuClass/' + id,
    method: 'DELETE',
    
    })
}

// 商品管理-start
export function manageProductApi(params) {
    return request({
    url: '/vm-service/sku/search',
    method: 'GET',
    params
    })
}

export function getProductTypeApi() {
    return request({
        url:'/vm-service/skuClass/search',
      
    })
}


// 商品管理-end
//新增
/**
 * 新增商品类型
 * @param {String} data 传递商品类型名
 * @returns promise
 */
export function addProductApi(data) {
    return request({
    url: '/vm-service/skuClass',
    method: 'POST',
    data
    })
}
