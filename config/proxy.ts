/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  pro: {
    '/hrs-api/': {
      target: '',
      changeOrigin: true,
      pathRewrite: { '^/hrs-api': '' },
    },
  },
  dev: {
    '/hrs-api/': {
      target: 'http://localhost:8080/',
      changeOrigin: true,
      pathRewrite: { '^/hrs-api': '' },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
