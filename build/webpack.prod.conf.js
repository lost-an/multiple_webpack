const path = require("path");

const webpack = require("webpack");
const merge = require("webpack-merge");

//清理outputPath目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//抽离css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩css文件压缩
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
//压缩js
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

//引入 BaseWebpack Config
const webpackConfigBase = require("./webpack.base.conf.js");

const webpackConfigProd = {
  mode: "production", // 通过 mode 声明生产环境
  output: {
    path: path.resolve(__dirname, "../dist"),
    // 打包多出口文件
    // 生成 a.bundle.[hash].js  b.bundle.[hash].js
    filename: "./js/[name].[chunkhash:8].js",
    publicPath: "./",
  },
  devtool: "none",
  plugin: [
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: false,
      verbose: false, //开启在控制台输出信息
    }),
    // 分离css插件参数为提取出去的路径
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].min.css",
      //个人习惯将css文件放在单独目录下
      //publicPath:'../'   //如果你的output的publicPath配置的是 './' 这种相对路径，那么如果将css文件放在单独目录下，记得在这里指定一下publicPath
    }),
    //压缩css
    new OptimizeCssPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    //上线压缩js
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: false,
          drop_console: true,
        },
      },
    }),
  ],
};

module.exports = merge(webpackConfigBase, webpackConfigProd);
