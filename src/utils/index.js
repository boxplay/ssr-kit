/* eslint-disable */
export const checkServer = () => {
  return typeof window === 'undefined';
};

/**
 * 动态插入js
 * @insert 标签script插入位置，head顶位置，为空插入在底部
 * @async 是否异步加载
 */
export const loadJs = ({ src, insert, async = true }) => {
  return new Promise((res, rej) => {
    const elementJs = document.createElement('script');
    elementJs.src = src;
    elementJs.type = 'text/javascript';
    elementJs.async = async;
    elementJs.onload = () => res({ code: 0 });
    elementJs.onerror = err => rej({ code: 1, err });

    if (insert === 'head') {
      document.head.appendChild(elementJs);
    } else {
      document.body.appendChild(elementJs);
    }
  });
};

/**
 * 通用时间格式转换，将时间戳转换自己需要的格式
 *
 * [fmt] 第二参数类型字符串，注意指定
 * 年(y)、月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) ，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *
 * customFormatDate(时间戳, "yyyy-MM-dd hh:mm:ss.S") 转换后 2016-07-02 08:09:04.423
 */
export const customFormatDate = (UnixTime, fmt) => {
  if (!UnixTime) return '';
  const dateTime = new Date(parseInt(UnixTime * 1000));
  const o = {
    'M+': dateTime.getMonth() + 1, // 月份
    'd+': dateTime.getDate(), // 日
    'h+': dateTime.getHours(), // 小时
    'm+': dateTime.getMinutes(), // 分
    's+': dateTime.getSeconds(), // 秒
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), // 季度
    S: dateTime.getMilliseconds() // 毫秒
  };
  let newDataStrin = fmt || 'yyyy-MM-dd hh:mm:ss.S';
  if (/(y+)/.test(newDataStrin)) {
    newDataStrin = newDataStrin.replace(
      RegExp.$1,
      `${dateTime.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(newDataStrin)) {
      newDataStrin = newDataStrin.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return newDataStrin;
};

/**
 * 设置storage值
 */
export const setStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

/**
 * 获取指定storage值
 */
export const getStorage = key => {
  if (!key || key !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

/**
 * 移除指定storage内的值
 */
export function removeStorage(key) {
  return localStorage.removeItem(key);
}

/**
 * 获取url参数数据，返回obj对象
 */
export const getUrlToJson = url => {
  try {
    const strUrl = url || window?.location?.href || '';
    const temp1 = strUrl.split('?');
    const pram = temp1[1];
    if (pram === 'undefined' || !pram) {
      return {};
    }
    const keyValue = pram.split('&');
    const obj = {};
    for (let i = 0; i < keyValue.length; i++) {
      const item = keyValue[i].split('=');
      const key = item[0];
      const value = item[1];
      obj[key] = value;
    }
    return obj;
  } catch (error) {
    return {};
  }
};

export const delUrlParams = (url, name) => {
  // 根据#号拆分
  const poundArr = url.split('#');
  // ？拆分
  let questionArr = [];
  if (poundArr) {
    // 把#接上
    poundArr.forEach((element, index) => {
      if (index > 0) {
        element = `#${element}`;
      }
      const tempArr = element.split('?');
      if (!tempArr) {
        return true;
      }
      tempArr.forEach((item, idx) => {
        // 保留问号
        if (idx > 0) {
          item = `?${item}`;
        }
        questionArr.push(item);
      });
    });
  } else {
    questionArr = url.split('?');
    if (questionArr) {
      questionArr.forEach((item, idx) => {
        if (idx > 0) {
          item = `?${item}`;
        }
      });
    }
  }

  if (!questionArr) {
    return url;
  }

  // &符号的处理
  const andArr = [];
  questionArr.forEach((item, index) => {
    const andIdx = item.indexOf('&');
    if (andIdx <= -1) {
      andArr.push(item);
      return true;
    }

    const tempAndArr = item.split('&');
    tempAndArr.forEach((ele, idx) => {
      if (idx > 0) {
        ele = `&${ele}`;
      }
      andArr.push(ele);
    });
  });

  let newUrl = '';
  andArr.forEach(item => {
    const nameIndex = item.indexOf(`${name}=`);
    // 不拼接要删除的参数
    if (nameIndex > -1) {
      // 保留第一个问号
      const questionIdx = item.indexOf('?');
      if (questionIdx == 0) {
        newUrl += '?';
      }
      return true;
    }
    newUrl += item;
  });

  return newUrl.replace(/\?\&/g, '?');
};

// pc端七牛缩略图，指定宽
export const getPcThumbImg = ({ url, width, height }) => {
  let newUrl = `${url}?imageView2/2/w/${width || 200}`;
  if (height) {
    newUrl += `/h/${height}`;
  }
  return newUrl;
};

// 移动端七牛缩略图，指定宽
export const getMobileThumbImg = ({ url, width, height }) => {
  let newUrl = `${url}?imageView2/0/w/${width || 200}`;
  if (height) {
    newUrl += `/h/${height}`;
  }
  return newUrl;
};
