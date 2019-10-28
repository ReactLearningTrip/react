const path = require('path');
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
});