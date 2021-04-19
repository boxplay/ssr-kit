import request from '../utils/request';

/**
 * 请求首页
 * https://文档链接
 */
export const getData = async payload => {
  return request.get(`http://demo`, {
    params: payload
  });
};

/**
 * 请求首页
 * https://文档链接
 */
export const saveData = async payload => {
  return request.post('http://demo', {
    data: payload
  });
};

export const getHomeData = async () => {
  console.log('接口读取 ');
  const res = await request.get(
    `https://ali-cyb-cdn.kaikeba.com/kkb-plat/aboutData/aboutData.json`
  );
  return {
    code: 0,
    data: res.data
  };
};
