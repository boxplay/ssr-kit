const withPlugins = require('next-compose-plugins');
const withStylus = require('@zeit/next-stylus');
const withCss = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const withTM = require('next-transpile-modules');
const cssLoaderGetLocalIdent = require('css-loader/lib/getLocalIdent');
const fs = require('fs');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const { INIT_ENV } = process.env;
const { plugins } = require('./build/webpack.common');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './src/pages/antd-custom.less'),
    'utf8'
  )
);

const nextConfig = {
  distDir: 'dist',
  env: {
    INIT_ENV
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    if (config.externals) {
      const includes = [/(antd-mobile|antd)/];
      config.externals = config.externals.map(external => {
        if (typeof external !== 'function') return external;
        return (ctx, req, cb) => {
          return includes.find(include =>
            req.startsWith('.')
              ? include.test(path.resolve(ctx, req))
              : include.test(req)
          )
            ? cb()
            : external(ctx, req, cb);
        };
      });
    }

    config.module.rules.unshift({
      test: /\.(js|mjs)$/,
      // exclude: /@babel(?:\/|\\{1,2})runtime/,\
      include: [resolveApp('./node_modules/@kkb')],
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: '10',
                browsers: ['ie >=10', 'last 2 version', '> 5%', 'not dead']
              },
              modules: false
            }
          ],
          ['babel-preset-react-app/dependencies', { helpers: true }]
        ],
        plugins: [
          '@babel/plugin-transform-react-jsx',
          '@babel/plugin-transform-runtime',
          '@babel/proposal-object-rest-spread',
          '@babel/plugin-syntax-dynamic-import', // 动态导入
          '@babel/plugin-syntax-import-meta',
          '@babel/plugin-proposal-function-sent', // 转换成es5
          ['@babel/plugin-proposal-class-properties', { loose: true }],
          '@babel/plugin-proposal-export-namespace-from',
          // 转换语法处理
          '@babel/plugin-transform-destructuring', // 结构赋值
          '@babel/plugin-transform-arrow-functions', // 箭头函数
          '@babel/plugin-transform-async-to-generator', // 二个插件解决async语法问题
          '@babel/plugin-transform-regenerator',
          '@babel/plugin-proposal-numeric-separator',
          '@babel/plugin-proposal-throw-expressions',
          '@babel/plugin-transform-template-literals' // 字符串模板
        ],
        cacheDirectory: true,
        cacheCompression: false
      }
    });
    config.plugins.push(...plugins);
    return config;
  }
};

module.exports = withPlugins(
  [withCss, withStylus, withLess, withTM, withBundleAnalyzer],
  {
    cssModules: true,
    camelCase: true,
    transpileModules: ['antd', 'antd-mobile'],
    lessLoaderOptions: {
      modifyVars: themeVariables, // make your antd custom effective
      javascriptEnabled: true
    },
    cssLoaderOptions: {
      localIdentName: '[local]___[hash:base64:5]',
      getLocalIdent: (context, localIdentNames, localName, options) => {
        const hz = context.resourcePath.replace(context.rootContext, '');
        if (/node_modules\/@kkb\/daji/.test(hz)) {
          return cssLoaderGetLocalIdent(
            context,
            localIdentNames,
            localName,
            options
          );
        }

        if (/node_modules/.test(hz)) {
          return localName;
        }
        return cssLoaderGetLocalIdent(
          context,
          localIdentNames,
          localName,
          options
        );
      }
    },
    postcssLoaderOptions: {
      config: {
        ctx: {
          theme: JSON.stringify(process.env.REACT_APP_THEME)
        }
      }
    },
    // next内置images组件，hostname配置
    images: {
      domains: ['img.kaikeba.com']
    },
    ...nextConfig
  }
);
