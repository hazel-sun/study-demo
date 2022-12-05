const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin
} = require("webpack").container;

module.exports = {
  mode: "development",
  devtool: false,
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    // 模块使用方也依然使用 ModuleFederationPlugin 插件搭建 MF 环境
    new ModuleFederationPlugin({
      // 使用 remotes 属性声明远程模块列表
      remotes: {
        // 地址需要指向导出方生成的应用入口文件
        app1: "app1@http://localhost:8081/dist/remoteEntry.js", //cdn地址
      },
      // 可被共享的依赖模块[导入导出方都添加这个]- 防止单独打包有重复打包的问题 - 要求两个应用使用 版本号完全相同 的依赖才能被复用
      // 该应用支持共享版本大于等于 4.17.0 小于等于 4.18.0 的 lodash，其它应用所使用的 lodash 版本号只要在这一范围内即可复用
      shared: {
        lodash: {
          requiredVersion: "^4.17.0",
          shareScope: 'foo' // 其它应用所共享的 lodash 库必须同样声明为 foo 空间才能复用 - 在多团队协作时能够切分出多个资源共享空间，降低依赖冲突的概率
        },
      },
    }),
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    port: 8082,
    hot: true,
    open: true,
  },
};
/**
 * main.js中使用远程模块的时候
 * 使用异步导入语法 import("module") 引入模块
 */