const Router = require('@koa/router');
const { createProxyMiddleware } = require('http-proxy-middleware');
const c2k = require('koa2-connect');
const proxyTable = require('../config/proxy.js');
const { judgeClient } = require('../utils');
const { koaRender } = require('../utils/koaRender');
const { routeData } = require('./routeData');

const router = new Router();

module.exports = function (app) {
  const handle = app.getRequestHandler();

  routeData.forEach(item => {
    router.get(item.path, ctx => {
      item.redirect && ctx.response.redirect(item.redirect);

      let newComponent = item.component;
      if (!newComponent) {
        const pcFlag = judgeClient(ctx.req.headers['user-agent']) === 'PC';
        newComponent = pcFlag ? item.componentPc : item.componentH5;
      }
      koaRender({
        app,
        ctx,
        component: newComponent,
        data: item
      });
      ctx.respond = false;
    });
  });

  Object.keys(proxyTable).forEach(context => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
      options = { target: options };
    }
    router.get(
      '(.*)',
      c2k(createProxyMiddleware(options.filter || context, options))
    );
  });

  router.get('(.*)', ctx => {
    handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  return router;
};
