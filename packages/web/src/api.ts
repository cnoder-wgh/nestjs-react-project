import http from "./utils/http";

const api = {
  setting: 'vc/setting',
  queryActivityPageListExport: '/edocyun-managementsystem/managementsystem/activityStatistics/activityPageStatisticsExport',

};
const queryActivityPageListExport = (data?: any) => {
  return http({
    url: api.queryActivityPageListExport,
    method: "POST",
    data,
  });
};
const setting = (params?: any) => {
  return http({
    url: api.setting,
    method: "GET",
    params,
  });
};

export default {
    queryActivityPageListExport,
    setting,
};