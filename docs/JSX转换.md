# JSX转换

## React项目结构

- react
- react-reconciler
- 各种宿主环境的包(react-dom)
- shared(公用辅助方法，宿主环境五官)

JSX转换属于react包

## JSX转换

- 可以使用Babel进行测试

包括两部分

- 编译时
- 运行时: jsx方法或者React.createElement

编译时候由于babel编译实现，我们来实现运行时即可

- 实现jsx方法
  - packages/react/src.jsx.ts,
  - packages/react/index.ts
  - packages/shared/ReactSymbol.ts
  - Packages/shared/ReactTypes.ts
- 实现打包
  - 对应上述两3方法，打包对应文件
  - react/jsx-dev-runtime.js (dev)
  - react/jsx-runtime.js (prod)
  - React
  * 编写scripts/rollup
    - utils.js
    - react.config.js
    - 安装插件进行转换
    ```
    pnpm i -D -w rollup-plugin-typescript2, @rollup/plugin-commonjs
    ```
    - 安装riamraf在打包之前进行删除
    ```
    "build:dev": "rollup --bundleConfigAsCjs --config scripts/rollup/react.config.js"
    ```
    - 安装rollup-plugin-generate-package-json
- 实现调试打包结果的环境
  - pnpm link
    - pnpm link --global
    - pnpm link react --global
