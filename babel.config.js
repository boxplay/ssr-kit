module.exports = function (api) {
  const env = api.env();
  const isProd = ['pre', 'prod'].includes(process.env.INIT_ENV);

  const config = {
    presets: [
      'next/babel',
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['ie >=10', 'last 2 version', '> 5%', 'not dead']
          },
          modules: false
          // "useBuiltIns": "usage"
        }
      ]
    ],
    plugins: [
      ['import', { libraryName: 'antd', style: true }, 'antd'],
      [
        'import',
        {
          libraryName: 'antd-mobile',
          style: true
        },
        'antd-mobile'
      ],
      isProd && 'transform-remove-console',
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
    ].filter(Boolean)
  };

  return config;
};
