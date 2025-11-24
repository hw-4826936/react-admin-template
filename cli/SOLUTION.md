# 解决 pnpm link --global 错误

如果遇到 `ERR_PNPM_NO_GLOBAL_BIN_DIR` 错误，可以使用以下解决方案：

## 方案一：直接使用 node（最简单，推荐）

无需全局链接，直接运行：

```bash
# 1. 同步模板文件
pnpm run cli:sync

# 2. 创建项目（在项目根目录）
pnpm run cli:create my-app

# 或进入 cli 目录
cd cli
pnpm install
node index.js my-app
```

## 方案二：配置 pnpm 全局目录

### Windows (PowerShell)

```powershell
# 设置全局 bin 目录
pnpm config set global-bin-dir "$env:LOCALAPPDATA\pnpm"

# 验证配置
pnpm config get global-bin-dir

# 然后链接
cd cli
pnpm install
pnpm link --global
```

### Windows (CMD)

```cmd
pnpm config set global-bin-dir "%LOCALAPPDATA%\pnpm"
cd cli
pnpm install
pnpm link --global
```

### macOS/Linux

```bash
pnpm config set global-bin-dir "$HOME/.local/share/pnpm"
cd cli
pnpm install
pnpm link --global
```

## 方案三：使用 npm link

如果 pnpm link 仍然有问题，可以使用 npm：

```bash
cd cli
pnpm install
npm link --global

# 测试
create-react-admin-app test-app
```

## 方案四：使用 npx（发布后）

如果已经发布到 npm，可以直接使用：

```bash
npx create-react-admin-app my-app
```

## 验证安装

链接成功后，可以验证：

```bash
# 检查命令是否可用
which create-react-admin-app  # macOS/Linux
where create-react-admin-app   # Windows

# 测试创建项目
create-react-admin-app test-app
```
