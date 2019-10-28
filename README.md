# react全家桶+antdesignUI框架  
- 1.0 [webpack打包优化](#webpack打包优化)  
- 1.1 [文件路径优化](#文件路径优化)  
- 1.2 [提供全局第三方插件引用](#提供全局第三方插件引用)  
- 1.3 [antdesign按需加载](#antdesign按需加载)   
- 1.4 [配置文件打包切分规则](#[配置文件打包切分规则)  
- 1.5 [文件打包压缩成gzip，配合ngnix进行快速下载](#文件打包压缩成gzip，配合ngnix进行快速下载)  
- 1.6 [css文件切分，预处理器和后处理器的应用](#css文件切分，预处理器和后处理器的应用)  
- 1.7 [分离第三方插件，避免重新打包和版本发布重新下载](#分离第三方插件，避免重新打包和版本发布重新下载)  
- 1.8 [开启热更新机制](#开启热更新机制)  
- 2.0 [redux储存全局公共信息（简单套路使用）](#redux储存全局公共信息（简单套路使用)  
- 3.0 [react路由](#react路由)  
- 3.1 [路由按需加载](#路由按需加载)  
- 3.2 [路由缓存](#路由缓存)  
- 4.0 [antdesign自定义组件](#antdesign自定义组件)  
- 4.1 [antdesign表单应用](#antdesign表单应用)  
- 4.2 [antdesign中英文](#antdesign中英文)  
   
## webpack打包优化
### webpack.base.js
 `const path = require('path');
let DEV_HOST = JSON.stringify('http://192.168.1.241:8102') 
let PUB_HOST = JSON.stringify('http://192.168.1.241:8103')
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
};`
#### webpack.dev.config.js
const path = require('path');
let base = require("./webpack.base.js"),
    // merge() 合并配置选项
    merge = require('webpack-merge'),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(base, {
    // 开发模式
    mode: "development",
    
    devtool: "#cheap-module-eval-source-map",
    
    // webpack plugin -> https://webpack.docschina.org/plugins/
    plugins: [
        // 复制无需参与构建的文件到输出位置
        // new copyWebpackPlugin([
        //     {
        //         from: "src/js_modules/react/dev/react.js",
        //         to: "js/"
        //     },
        //     {
        //         from: "src/js_modules/react-dom/dev/react-dom.js",
        //         to: "js/"
        //     },
        //     {
        //         from: "img/**/*.*",
        //         to: ""
        //     }
        // ]),
        
        // 自动在输出位置创建html文件，并在html文件自动注入加载bundle的script标签或link标签
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            chunks: ["main", "vendor"],
            inject: true,
            chunksSortMode: "auto"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '192.168.106.38',
        port:'80',
        hot:true,
    }
});
#### webpack.build.config.js   
`const path = require('path');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let base = require('./webpack.base.js'),
    merge = require('webpack-merge'),
    webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin')
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    UglifyJsPlugin=require('uglifyjs-webpack-plugin')
    WebpackMd5Hash = require('webpack-md5-hash');



// 获取dll文件的manifest
function getDllManifest () {
    var plugins = []
    Object.keys({
        'react_all': ['react', 'react-dom', 'react-router-dom','axios','react-redux'],
        'jquery': ['jquery']
    }).forEach((name) => {
        plugins.push(
            new webpack.DllReferencePlugin({
                context: __dirname, // 这里的context必须与DllPlugin中的context保持一致
                manifest: path.resolve(__dirname, "../lib/manifest/[name].manifest.json").replace(/\[name\]/gi, name)
            })
        )
    })
    return plugins
}

module.exports = merge(base, {
    mode: 'production',
    entry: {
        index:path.resolve(__dirname, '../src/index.js')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                  loader: MiniCssExtractPlugin.loader,
                }, 'css-loader', 'postcss-loader', 'less-loader']
            }
            
        ]
    },
    plugins: [
        
        new CleanWebpackPlugin(),
        // new WebpackMd5Hash(),
        // new BundleAnalyzerPlugin(),
        // *** 所以这里可能会引入多个DllReferencePlugin，具体要看有几个manifest文件了。***
        ...getDllManifest(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8
          }),
        
        
        
        // dll文件需要插件将其引入到html文件中，以方便后续使用
        new HtmlWebpackIncludeAssetsPlugin({
            append: false,
            assets: [{
                path: path.resolve(__dirname, '../'),
                glob: '*.js',
                globPath: path.resolve(__dirname, '../lib/')
            }],
        }),
        
        // 将dll文件拷贝到你的dist目录下
        new CopyWebpackPlugin([
            {
                // 这里是dll文件当前所在的文件目录
                from: path.resolve(__dirname, '../lib/'),
                // 这里是生产环境的资源地址
                to: path.resolve(__dirname, '../dist/'),
                // 过滤static中的部分文件
                ignore: ['.*', 'manifest/*']
            }
        ]),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[name].[id].css'
          }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            // chunks: ['index','main', 'vendor'],
            inject: true,
            chunksSortMode: 'auto',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            append: false,
            // publicPath:path.resolve(__dirname, './'),
            assets: [{
                path: './',
                glob: '*.js',
                globPath: path.resolve(__dirname, '../lib/')
            }],
        }),
        
        // 将dll文件拷贝到你的dist目录下
        new CopyWebpackPlugin([
            {
                // 这里是dll文件当前所在的文件目录
                from: path.resolve(__dirname, '../lib/'),
                // 这里是生产环境的资源地址
                to: path.resolve(__dirname, '../dist/'),
                // 过滤static中的部分文件
                ignore: ['.*', 'manifest/*']
            }
        ]),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ],
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
                jquery: {
                    name: "jquery",
                    priority: -10
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,  // 匹配node_modules目录下的文件
                    priority: -10   // 优先级配置项
                },
                default: {
                    minChunks: 2,
                    priority: -20,   // 优先级配置项
                    reuseExistingChunk: true
                }
            }
        }
    }
});`
   
   
   
## 文件路径优化
   
   
   
   
   
   
## 提供全局第三方插件引用
   
   
   
   
   
   
## antdesign按需加载
   
   
   
   
   
   
## 配置文件打包切分规则
   
   
   
   
   
   
## 文件打包压缩成gzip，配合ngnix进行快速下载
   
   
   
   
   
   
## css文件切分，预处理器和后处理器的应用
   
   
   
   
   
   

## 分离第三方插件，避免重新打包和版本发布重新下载
   
   
   
   
   
   
## 开启热更新机制
   
   
   
   
   
   
## redux储存全局公共信息（简单套路使用）
   
   
   
   
   
   
## react路由
   
   
   
   
   
   
## 路由按需加载
   
   
   
   
   
   
## 路由缓存
   
   
   
   
   
   
## antdesign自定义组件
   
   
   
   
   
## antdesign表单应用
   
   
   
   
   
## antdesign中英文


