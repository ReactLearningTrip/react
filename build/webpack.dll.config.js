var path = require('path');
var webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    context: __dirname, // 这里配置的context就是后面dll的context
    entry: {
        'react_all': ['react', 'react-dom', 'react-router-dom','history','axios','react-redux','redux'],
        'jquery': ['jquery'],
    },
    output: {
        path: path.resolve(__dirname, "../lib"),
        filename: '[name].dll.js',
        library: 'lib_[name]',
        // *** 这里不要添加libraryTarget，否则webpack打包时会出错。
        // （提示是__WEBPACK__EXTERNAL__MODULE__xxx未定义） ***
        // libraryTarget: 'umd'
    },
    resolve: {
      
    },
    // 这里没有写loaders，如果有需要可以自行添加loaders
    plugins: [
        // *** 这里很关键 ***
        new CleanWebpackPlugin(),
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8
          }),
        new webpack.DllPlugin({ // 因为上面写了context，所以这里可以不指定context
            // 这里manifest的名字必须要有变量，因为类似上面的core和asset会分别创建一个manifest，
            // 如果名称相同，manifest会生成不规范的json，在引用时会报错。
            path: path.resolve(__dirname, "../lib/manifest/[name].manifest.json"),
            name: 'lib_[name]' // *** 这里的名字必须与output.library一致 ***
        }),
        // 这个是用来稳定hash值，防止出现webpack的hash出现莫名的变化
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NamedChunksPlugin()
    ]
}