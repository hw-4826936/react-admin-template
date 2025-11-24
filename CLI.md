# CLI 脚手架工具使用指南

本项目包含一个 CLI 脚手架工具，可以快速创建基于当前模板的新项目。

## 📦 发布 CLI 工具

### 方式一：发布到 npm (推荐)

1. **准备 CLI 包**

```bash
# 同步项目文件到模板目录
pnpm run cli:sync

# 进入 CLI 目录
cd cli

# 安装依赖
pnpm install
```

2. **测试 CLI 工具**

```bash
# 在 CLI 目录下全局链接
pnpm link --global

# 测试创建项目
create-react-admin-app test-app
```

3. **发布到 npm**

```bash
cd cli

# 更新版本号
npm version patch  # 或 minor, major

# 发布
npm publish
```

发布后，用户可以通过以下方式使用：

```bash
npx create-react-admin-app my-app
```

### 方式二：使用本地路径

如果不想发布到 npm，可以通过以下方式使用：

```bash
# 在项目根目录
pnpm run cli:sync  # 同步模板文件

# 使用本地 CLI
node cli/index.js my-app
```

或者创建一个全局脚本：

```bash
# 在 package.json 中添加
"scripts": {
  "create": "node cli/index.js"
}

# 使用
pnpm create my-app
```

## 🚀 使用 CLI 工具

### 基本用法

```bash
# 使用 npx (推荐，无需安装)
npx create-react-admin-app my-admin-app

# 或全局安装后使用
npm install -g create-react-admin-app
create-react-admin-app my-admin-app
```

### 选项

- `--skip-install`: 跳过依赖安装
- `-t, --template <version>`: 指定模板版本（未来功能）

### 示例

```bash
# 创建项目并自动安装依赖
npx create-react-admin-app my-admin-app

# 创建项目但跳过依赖安装
npx create-react-admin-app my-admin-app --skip-install
```

## 🔧 开发 CLI 工具

### 目录结构

```
cli/
├── index.js              # CLI 入口文件
├── lib/
│   └── create.js         # 核心创建逻辑
├── scripts/
│   └── sync-template.js  # 同步模板脚本
├── template/             # 模板文件目录
├── package.json          # CLI 包配置
└── README.md            # CLI 使用文档
```

### 更新模板

当项目结构或文件发生变化时，需要同步模板：

```bash
pnpm run cli:sync
```

这个命令会将当前项目的文件复制到 `cli/template` 目录，排除 `node_modules`、`dist` 等不需要的文件。

### 本地测试

```bash
# 1. 同步模板
pnpm run cli:sync

# 2. 进入 CLI 目录并安装依赖
cd cli
pnpm install

# 3. 全局链接（可选）
pnpm link --global

# 4. 测试
create-react-admin-app test-app
# 或
node index.js test-app
```

## 📝 CLI 工具功能

- ✅ 交互式项目名称输入
- ✅ 自动复制模板文件
- ✅ 替换项目名称变量
- ✅ 自动安装依赖（可选）
- ✅ 友好的命令行提示
- ✅ 错误处理和提示

## 🎯 未来增强

- [ ] 支持多个模板版本
- [ ] 支持自定义模板路径
- [ ] 支持选择包管理器（npm/yarn/pnpm）
- [ ] 支持 Git 初始化
- [ ] 支持 TypeScript/JavaScript 选择

