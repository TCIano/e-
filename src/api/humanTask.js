import request from "@/utils/request";

/**
 *人员统计头部信息
 * @param {String} start 开始时间
 * @param {String} end 结束时间
 * @returns
 */
export const TaskInfoApi = (start, end) => {
  return request({
    url: "/task-service/task/taskReportInfo/" + start + "/" + end,
  });
};
