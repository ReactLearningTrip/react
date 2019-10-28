const webpack = require('webpack');
const path = require('path');
const react_all = [
    'react',
    'react-dom',
    'react-router-dom',
    'axios',
    'react-redux',
    // ...其它库
];

module.exports = {
    output: {
        path: path.resolve(__dirname, "../externals"),
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "react_all": react_all,
        "jquery": ["jquery"],
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, "../dist/externals/manifest/[name].manifest.json"),
            name: '[name]',
            context: __dirname,
        }),
        // 这个是用来稳定hash值，防止出现webpack的hash出现莫名的变化
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NamedChunksPlugin()
    ],
};