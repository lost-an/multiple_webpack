const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlConfig = (pathName, chunks) => {
  return {
    template: `./src/pages/${pathName}/index.html`,
    // filename: "index.[contenthash].html", //打包后的文件名 + Long Term Caching
    filename: `${pathName}.html`, //打包后的文件名
    // config: config.template,
    chunks: chunks,
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
    const htmlPlugin = new HtmlWebpackPlugin(htmlConfig(name, [name]));
    htmlPlugins.push(htmlPlugin);
  });
  return { entry, htmlPlugins };
})();

console.log("enter", getEntry);
