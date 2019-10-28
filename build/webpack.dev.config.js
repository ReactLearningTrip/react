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
        port:'8086',
        hot:true,
    }
});