const path = require("path");

const webpack = require("webpack");
const glob = require("glob");
//html模版
const HtmlWebpackPlugin = require("html-webpack-plugin");
//静态资源输出 拷贝静态文件
const CopyWebpackPlugin = require("copy-webpack-plugin");

// 引入loader rules
const rules = require("./webpack.loader.conf.js");

//return htmlWebpackPluginConfig
const htmlConfig = (pathName) => {
  return {
    template: `./src/pages/${pathName}/index.html`,
    // filename: "index.[contenthash].html", //打包后的文件名 + Long Term Caching
    filename: `${pathName}.html`, //打包后的文件名
    // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    chunks: [pathName, "vendors"],
    hash: true, //开启hash  ?[hash]
    minify:
      process.env.NODE_ENV === "development"
        ? false
        : {
            // 压缩参数
            removeAttributeQuotes: false, //是否删除属性双引号
            collapseWhitespace: false, //是否折叠空白
          },
    inject: true, //资源加入到底部，把模块引入到html文件的底部
  };
};

//动态各目录下添加入口 index.js
const getEntry = (function () {
  const entry = {};
  let htmlPlugins = [];
  //读取src目录所有page入口
  glob.sync("./src/pages/*/index.js").forEach(function (filePath) {
    var name = filePath.match(/\/pages\/(.+)\/index.js/);
    name = name[1];
    entry[name] = filePath;
    //插入htmlConfigPlugin插件
    const htmlPlugin = new HtmlWebpackPlugin(htmlConfig(name, [name]));
    htmlPlugins.push(htmlPlugin);
  });
  return { entry, htmlPlugins };
})();

console.log(getEntry.entry, getEntry.htmlPlugins);

module.exports = {
  entry: getEntry.entry,
  module: {
    rules: [...rules],
  },
  plugins: [
    ...getEntry.htmlPlugins,
    new webpack.ProvidePlugin({
      // npm i jquery -S 安装jquery，然后利用ProvidePlugin这个webpack内置API将jquery设置为全局引入，从而无需单个页面import引入
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    //静态资源输出
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../src/assets"),
        to: "./assets",
        ignore: [".*"],
      },
    ]),
  ],
};
