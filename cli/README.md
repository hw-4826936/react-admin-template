# create-react-admin-app

React Admin 模板项目的 CLI 脚手架工具。

## 安装

### 全局安装

```bash
npm install -g create-react-admin-app
# 或
pnpm add -g create-react-admin-app
```

### 使用 npx (推荐)

无需安装，直接使用：

```bash
npx create-react-admin-app my-app
```

## 使用方法

### 基本用法

```bash
create-react-admin-app <project-name>
```

### 选项

- `-t, --template <template>`: 指定模板版本 (默认: latest)
- `--skip-install`: 跳过依赖安装
- `-h, --help`: 显示帮助信息
- `-V, --version`: 显示版本号

### 示例

```bash
# 创建新项目
npx create-react-admin-app my-admin-app

# 创建项目并跳过依赖安装
npx create-react-admin-app my-admin-app --skip-install

# 使用特定模板版本
npx create-react-admin-app my-admin-app -t v1.0.0
```

## 本地开发

如果你想在本地开发和测试 CLI 工具，有以下几种方式：

### 方式一：直接使用 node（推荐，无需全局链接）

```bash
# 1. 同步模板文件
cd ..  # 回到项目根目录
pnpm run cli:sync

# 2. 进入 CLI 目录并安装依赖
cd cli
pnpm install

# 3. 直接使用 node 运行
node index.js test-app
```

### 方式二：使用 npm link（如果 pnpm link 失败）

```bash
cd cli
pnpm install
npm link --global  # 使用 npm 而不是 pnpm

# 测试
create-react-admin-app test-app
```

### 方式三：配置 pnpm 全局目录后使用 pnpm link

如果遇到 `ERR_PNPM_NO_GLOBAL_BIN_DIR` 错误，先配置 pnpm：

```bash
# Windows (PowerShell)
pnpm config set global-bin-dir "$env:LOCALAPPDATA\pnpm"

# macOS/Linux
pnpm config set global-bin-dir "$HOME/.local/share/pnpm"

# 然后链接
cd cli
pnpm install
pnpm link --global

# 测试
create-react-admin-app test-app
```

### 方式四：使用项目根目录的脚本

在项目根目录的 `package.json` 中添加脚本后直接使用：

```bash
# 在项目根目录
pnpm run cli:sync  # 同步模板
pnpm run cli:test my-app  # 创建项目
```

## 发布到 npm

1. 更新 `cli/package.json` 中的版本号
2. 在 `cli` 目录下运行：

```bash
npm publish
```

发布后，用户可以通过以下方式使用：

```bash
npx create-react-admin-app my-app
```
