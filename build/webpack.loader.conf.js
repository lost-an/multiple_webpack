const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离css文件

const env = process.env.NODE_ENV !== "production";

module.exports = [
  {
    test: /\.jsx?$/, //匹配文件
    use: ["babel-loader"],
    exclude: /node_modules/, //排除node_modules目录
  },
  {
    test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          outputPath: "assets", //输出目录
          limit: 10240, //10K
          esModule: false, //esModule 设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
          name: "[name]_[hash:6].[ext]",
        },
      },
    ],

    exclude: /node_modules/,
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ["url-loader"],
  },
  {
    test: /\.css$/, //正则 $ 结束位置
    use: [
      env
        ? "style-loader"
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //配置
              reloadAll: true,
            },
          },
      "css-loader",
      "postcss-loader",
      // "sass-loader",
      //"less-loader",
    ],
    exclude: /node_modules/,
  },
];
