const path = require('path');
// let DEV_HOST = JSON.stringify('http://39.106.119.207:8102')  //远程服务器
let DEV_HOST = JSON.stringify('http://192.168.1.241:8102')  //杨红霞本地
let DEV_HOST1 = JSON.stringify('http://192.168.1.241:8103')  //杨红霞本地
let DEV_HOST2 = JSON.stringify('http://39.106.119.207:8102')  //远程服务器
let PUB_HOST = JSON.stringify('http://192.168.1.241:8103')
// let PUB_HOST = JSON.stringify('http://39.106.119.207:8102')
    // merge() 合并配置选项
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    // 开发模式
    mode: "development",
    entry: path.resolve(__dirname, '../src/index.js'),
    
    output: {
        // 打包后的 bundle 的生成位置（E:/react-template/dist/）
        path: path.resolve(__dirname, "../dist/"),

        filename: 'js/[name].[hash].js',       
        chunkFilename: 'js/[name].[chunkhash].js',
        publicPath: "/"
    },
    resolve: {
        alias: {
            pages: path.join(__dirname, '../src/pages'),
            component: path.join(__dirname, '../src/component'),
            common_fn: path.join(__dirname, '../src/common_fn'),
            router: path.join(__dirname, '../src/router'),
            style: path.join(__dirname, '../src/style'),
            actions: path.join(__dirname, '../src/redux/actions'),
            reducers: path.join(__dirname, '../src/redux/reducers')
        }
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../index.html')
        }),
        new webpack.DefinePlugin({
        HOST: process.env.NODE_ENV === 'production' ? PUB_HOST : DEV_HOST,
        HOST1: process.env.NODE_ENV === 'production' ? PUB_HOST : DEV_HOST1,
        HOST2: process.env.NODE_ENV === 'production' ? PUB_HOST : DEV_HOST2,
        }),
       
        new webpack.ProvidePlugin({//提供全局
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery":"jquery",
            React:"react",
            ReactDom:"react-dom"
        })
    ],
    module: {
        /**
         * 各种类型模块的处理规则
         * 特别说明：
         * 1. use属性表示模块使用什么loader
         * 2. 模块可以使用多个loader，处理顺序为use属性的数组的第一个到最后一个
        */
        rules: [
            // 图片文件小于8192byte时，转换为base64字符串
            {
                test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|svg)(\?t=\d+)?$/,
                exclude: /node_modules/,
                use: ["url-loader?limit=8192"]
            },
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {loader: 'react-hot-loader/webpack'},
                    {loader: 'babel-loader'},
                    {loader: 'awesome-typescript-loader'}
                ]
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        babelrc:true,
                        plugins:[
                            ['import',[{libraryName:"antd",style:'css'}]]
                        ]
                    }
                }],
                
            },
            
            /**
             * 处理css模块 
             * loader说明：
             * 1. style-loader 将css文件以
             *      <link rel="stylesheet" href="path/to/file.css">
             *      的形式插入到html文件
             * 2. css-loader 处理css的 @import语句 与 url() ，同时压缩代码
             * 3. postcss-loader 对css做一些加工处理，具体的配置放在postcss.config.js，比如给              *    css自动添加浏览器厂商前缀。如果不知道css浏览器厂商前缀的，请自行百度。
            */
            {
                test: /\.css$/,
                exclude:'/node_modules/',
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader',
                        options: {
                        sourceMap: true,
                        config: {
                            path: './postcss.config.js'
                        }
                        }
                    }
                ]
            },
            
            /**
             * 处理less模块
             * 特别说明：
             * 1. Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，                 *      使 CSS 更易维护和扩展。
             * 2. Less中文网：http://lesscss.cn/
            */
            {
                test: /\.less$/,
                exclude:'/node_modules/',
                use: ["style-loader", "css-loader", "less-loader"]
            },
            
        ]
    },
    externals: {
       
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                default: false,
                vendor: {
                    name: "vendor",
                    priority: 99
                }
            }
        }
    }
};