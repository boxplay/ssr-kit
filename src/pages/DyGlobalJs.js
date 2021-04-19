/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { loadJs } from '../utils';
import { isMobile } from '../utils/tool/browserUtils';
import { currentEnv } from '../utils/config';

const DyGlobalJs = () => {
  // 初始化移动端调试工具
  const initEruda = () => {
    if (['prod'].includes(currentEnv)) return;
    if (isMobile()) {
      const data = [
        loadJs({
          src: '//cdn.jsdelivr.net/npm/eruda@2.4.1/eruda.min.js',
          insert: 'head'
        }),
        loadJs({
          src: '//cdn.jsdelivr.net/npm/eruda-dom@2.0.0/eruda-dom.min.js',
          insert: 'head'
        }),
        loadJs({
          src: '//cdn.jsdelivr.net/npm/eruda-fps@2.0.0/eruda-fps.min.js',
          insert: 'head'
        }),
        loadJs({
          src: '//cdn.jsdelivr.net/npm/eruda-code@2.0.0/eruda-code.min.js',
          insert: 'head'
        })
      ];
      Promise.all(data).then(() => {
        eruda?.init({
          useShadowDom: true
        });
        eruda?.add(erudaDom);
        eruda?.add(erudaFps);
        eruda?.add(erudaCode);
      });
    }
  };

  // 加载第三方sdk
  const loaderSdk = () => {
    // loadJs({ src: '/static/gio.js' });
  };

  const init = async () => {
    initEruda();
    loaderSdk();
  };

  useEffect(() => {
    init();
  }, []);

  return null;
};

export default DyGlobalJs;
