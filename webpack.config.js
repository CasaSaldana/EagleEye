var path = require("path");
var webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    //    filename: "css/[name].[contenthash].css",
    filename: "css/[name].css",
    //disable: process.env.NODE_ENV === "development"
});

var PROD = false;

for (let arg of process.argv) {
    if (arg == '--env=1') {
        PROD = true;
    }
}

module.exports = {
    entry: {
        app: "./src/build.jsx"
    },
    output: {
        path: path.join(__dirname, "builds"),
        filename: PROD ? "[name].min.js" : "[name].js",
        library: ["[name]"],
        libraryTarget: "umd"
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js(x)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }, 
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development 
                    fallback: "style-loader"
                })
            }
        ],
    },

    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({ minimize: true }), extractSass
    ] : [extractSass]
};