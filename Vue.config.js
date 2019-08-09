const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // 基本路径
    publicPath: './',

    configureWebpack: {
        externals: {
            'AMap': 'AMap'
        }
    },

    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config) => {
        config.resolve.alias
            .set('assets', resolve('src/assets'))
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,

    // webpack-dev-server 相关配置
    devServer: {
        proxy: {
            '/app': {
                target: 'http://192.168.222.240:8100',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/app': ''
                }
            },
            '/apx': {
                target: 'http://192.168.222.118:8800',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/apx': ''
                }
            },
            '/api': {
                target: 'http://115.231.197.122:6312',
            },
           
        }
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }

}