const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
/**
 * 导出方：
 * 
 * 使用 ModuleFederationPlugin 插件后，
 * Webpack 会将 exposes 声明的模块分别编译为独立产物，
 * 并将产物清单、MF 运行时等代码打包进 filename 定义的应用入口文件(Remote Entry File)中
 */
module.exports = {
  mode: "development",
  devtool: false,
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    // 必须指定产物的完整路径，否则使用方无法正确加载产物资源
    publicPath: `http://localhost:8081/dist/`,
  },
  plugins: [
    new ModuleFederationPlugin({
       // MF 应用名称
      name: "app1",
       // MF 模块入口，可以理解为该应用的资源清单
      filename: `remoteEntry.js`,
      // 定义应用导出哪些模块
      exposes: {
        "./utils": "./src/utils",
      },
      // 可被共享的依赖模块[导入导出方都添加这个]- 防止单独打包有重复打包的问题 - 要求两个应用使用 版本号完全相同 的依赖才能被复用
      // 该应用支持共享版本大于等于 4.17.0 小于等于 4.18.0 的 lodash，其它应用所使用的 lodash 版本号只要在这一范围内即可复用
      shared: {
        lodash: {
          requiredVersion: "^4.17.0",
        },
      },
    }),
  ],
  // MF 应用资源提供方必须以 http(s) 形式提供服务
  // 所以这里需要使用 devServer 提供 http(s) server 能力
  devServer: {
    port: 8081,
    hot: true,
  },
};
