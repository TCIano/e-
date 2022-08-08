import request from "@/utils/request";

export const peopleListApi = (params) => {
  return request({
    url: "/user-service/user/search",
    params
  });
};

/**
 * 删除人员
 * @param {*} id 
 * @returns Promise
 */
export const delPeopleListApi = (id) => {
  return request({
    url: "/user-service/user/" + id,
    method: "DELETE",
  });
};

// /api/user-service/role

/**
 * 获取运维人员和维修人员
 * @returns Promise
 */
export const getywPeople = () => {
  return request({
    url: '/user-service/role'
  });
};

// /api/vm-service/region/search
// 获取地区区域
export const getquyuList = (params) => {
  return request({
    url: "/vm-service/region/search",
    params,
  });
};

// 修改消息
export const editUserInfoApi = (id,data) => {
  return request({
    url: "/user-service/user/" + id,
    method: 'PUT',
    data,
  });
};
// 上传头像  

export const getUserServeFileUploadApi = (data) => {
  return request({
    url: "vm-service/sku/fileUpload",
    method: "POST",
    data,
  });
};




