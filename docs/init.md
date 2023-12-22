# 初始化项目

- pnpm初始化

```
npm install -g pnpm
pnpm init
```

初始化pnpm-workspace.yaml

- eslint安装

```
pnpm i eslint -D -w
```

初始化

```
npx eslint --init
```

初始化相关配置并安装需要的包

配置.eslintrc.json
安装ts的eslint插件

```
pnpm i -D -w @typescript-eslint/eslint-plugin
```

- 代码风格: prettier
  安装

```
pnpm i prettier -D -w
```

配置.prettier.json文件

prettier集成到eslint中

```
pnpm i eslint-config-prettier eslint-plugin-prettier -D -w
```

- commit规范检查
  - 安装husky, 拦截commit命令

```
pnpm i husky -D -w
```

- 初始化husky

```
npx husky install
```

- 将pnpm lint纳入commit时husky将执行的脚本

```
npx husky add .husky/pre-commit "pnpm lint"
```

- 对commit提交信息进行检查

```
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D -w
```

配置commitlintrc.js

```
module.exports = {
    extends:['@commitlint/config-conventional']
}
```

- 将commitlint集成到husky

```
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```

- conventional规范集意义:

```
//提交的类型：摘要信息
<type>: <subject>
```

type:

- feat: 添加新功能
- fix
- chore: 一些不影响功能的更改
- docs: 文档
- perf: 性能优化
- refactor: 代码重构
- test: 测试代码

* 配置tsconfig
  tsconfig.json
* 打包工具
  - 使用rollup,简洁，打包产物可读性高
  - pnpm i -D -w rollup
