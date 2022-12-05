// webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  /**
   * 业务方只需使用 source-map-loader 就可以将这段 Sourcemap 信息加载到自己的业务系统中，实现框架级别的源码调试能力
   */
  devtool: 'source-map',
  mode: "development",
  entry: "./src/index.js",
  // Webpack 编译过程会跳过 externals 所声明的库 - 常用于 NPM 库开发场景[有些时候业务库已经打包了一些库，避免重复打包]
  // externals: {
  //   lodash: {
  //     commonjs: "lodash",
  //     commonjs2: "lodash",
  //     amd: "lodash",
  //     root: "_",
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  externals: [nodeExternals()], // 排除所有 node_modules 模块
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    // Webpack 会将模块直接挂载到全局对象上
    // window._.add(1, 2)
    library: {
      name: "_", // 在浏览器环境下使用 script 加载该库时，可直接使用这个名字调用模块，
      type: "umd", // 编译产物的模块化:commonjs、umd、module、jsonp -通常选用兼容性更强的 umd 方案
      /**
       * 代码被包装成 UMD(Universal Module Definition) 模式
       * 这种形态会在 NPM 库启动时判断运行环境，自动选择当前适用的模块化方案
       */
      //  peerDependencies: {
      //   "lodash": "^4.17.21"
      // }
    },
  }, 
};