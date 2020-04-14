const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const webpackConfigBase = require("./webpack.base.conf");

const webpackConfDev = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "../dist"),
    // 打包多出口文件
    // 生成 a.bundle.js  b.bundle.js
    filename: "./js/[name].bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "../src"),
    publicPath: "/",
    host: "127.0.0.1",
    port: "8089",
    overlay: true, // 浏览器页面上显示错误
    open: true, // 开启浏览器
    // stats: "errors-only", //stats: "errors-only"表示只打印错误：
    // hot: true, // 开启热更新
  },
  plugins: [
    //热更新
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "source-map", // 开启调试模式
};

module.exports = merge(webpackConfigBase, webpackConfDev);
