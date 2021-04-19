// 判断当前客户端，返回PC,iOS,Android
const judgeClient = userAgent => {
  let client = 'PC';
  if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
    client = 'iOS';
  } else if (/(Android)/i.test(userAgent)) {
    client = 'Android';
  }
  return client;
};

module.exports = { judgeClient };
