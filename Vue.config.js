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
    productionSourceMap: process.env.NODE_ENV==='development'?true:false,

    // webpack-dev-server 相关配置
    devServer: {
        proxy: {
            '/apx': {
                target: 'http://47.96.165.125:8820',
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