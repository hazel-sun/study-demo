 pnpm i -D webpack webpack-cli
 Webpack 默认会将所有第三方依赖都打包进产物中 - 但在开发 NPM 库时则很可能导致代码冗余
 "prepublishOnly": "webpack --mode=production" - 在发布前自动执行编译命令
 在 package.json 文件中，使用 main 指定项目入口，同时使用 module 指定 ES Module 模式下的入口，以允许用户直接使用源码版本