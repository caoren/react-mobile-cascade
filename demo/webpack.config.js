var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isDeploy = process.env.NODE_ENV === 'production';
var config = {
    entry : {
        test : path.resolve(__dirname,'test.jsx')
    },
    output : {
        path : path.resolve(__dirname, '../demo'),
        filename : '[name].js'
    },
    module : {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.(css|less)?$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        browsers: ['IOS >= 7.0', 'Android >= 4.0']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    devtool: isDeploy ? false : 'source-map'
}
if(isDeploy){
    config.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.UglifyJsPlugin({
           compress: {
               warnings: false
           }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ];
}
else{
    config.plugins = [
        new ExtractTextPlugin("[name].css")
    ];
}

module.exports = config;