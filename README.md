# React Admin 模板 - 快速开始

## 项目启动

```bash
cd react-admin-template
pnpm install  # 如未安装依赖
pnpm dev      # 启动开发服务器
```

访问：http://localhost:5173

## 登录

- **用户名**：任意（会自动保存，建议输入 `admin`）
- **密码**：任意
- **记住我**：勾选后，下次登录会自动填充用户名

## 功能导航

登录后可以访问以下页面：

### 1. Dashboard（首页）

- 路径：`/dashboard`
- 功能：
  - 查看统计卡片
  - **权限控制演示**（可以看到不同权限的按钮显示效果）

### 2. 上传演示

- 路径：`/upload-demo`
- 功能：
  - 单图上传（最大 5MB）
  - 多图上传（最多 5 张，最大 10MB）
  - 文档上传（支持 PDF、Word、Excel，最大 20MB）

### 3. 深色模式

- 点击顶部导航栏右侧的 **太阳/月亮图标** 切换
- 主题会自动保存，刷新后保持

## 技术栈

- **构建**: Vite 6
- **框架**: React 19 + TypeScript
- **UI**: Ant Design 6.0
- **样式**: TailwindCSS 3.x + SCSS Modules
- **状态**: Zustand (带持久化)
- **路由**: React Router DOM v6
- **网络**: Axios (支持 Token 无感刷新)
- **规范**: ESLint + Prettier (Google 风格)

## 开发建议

### 1. 添加新页面

1. 在 `src/features/` 下创建功能模块
2. 在 `src/router/index.tsx` 中添加路由
3. 在 `src/layouts/BasicLayout.tsx` 中更新侧边栏菜单

### 2. 权限控制

```typescript
import Permission from '@/components/Permission';

<Permission permission="user:edit">
  <Button>编辑</Button>
</Permission>
```

### 3. 使用上传组件

```typescript
import UploadFile from '@/components/UploadFile';

<UploadFile
  accept="image/*"
  maxSize={5}
  maxCount={1}
  onChange={(fileList) => console.log(fileList)}
/>
```

### 4. API 调用

```typescript
import request from '@/utils/request';

// 自动处理 Token 注入和刷新
const data = await request.get<UserInfo>('/api/user/info');
```

## 目录结构

```
src/
├── api/              # API 定义 (通用/共享)
├── assets/           # 静态资源
├── components/       # 通用组件 (全局共享)
│   ├── Permission/   # 权限控制组件
│   └── UploadFile/   # 上传组件
├── features/         # 业务功能模块 (Feature-based Architecture)
│   ├── Auth/         # 认证模块 (Login)
│   ├── Dashboard/    # 仪表盘模块
│   └── UploadDemo/   # 上传演示模块
├── hooks/            # 通用 Hooks
├── layouts/          # 布局组件
│   └── BasicLayout.tsx
├── router/           # 路由配置
│   ├── AuthGuard.tsx # 路由守卫
│   └── index.tsx
├── store/            # 全局状态管理
│   ├── themeStore.ts # 主题状态
│   └── userStore.ts  # 用户状态
├── styles/           # 全局样式
├── utils/            # 工具函数
│   └── request.ts    # Axios 封装
├── App.tsx
└── main.tsx
```

## 架构设计

本项目采用 **Feature-based (按特性分层)** 架构，旨在提高可维护性和可预测性。

### 核心原则

1. **就近原则 (Colocation)**: 与特定功能相关的所有代码 (Components, Hooks, API, Types) 均存放在 `src/features/<FeatureName>` 目录下。
2. **严格的作用域分离**: 只有被多个 Feature 共享的代码才放入 `src/components` 或 `src/utils`。
3. **逻辑分离**: 业务逻辑封装在 Custom Hooks 中，组件主要负责 UI 渲染。

### 新增 Feature 流程

1. 在 `src/features/` 下创建功能目录 (PascalCase)。
2. 创建主组件 (e.g., `MyFeature.tsx`) 和 导出文件 (`index.ts`)。
3. 在 `src/router/index.tsx` 中引入并配置路由。

## 常用命令

```bash
pnpm dev      # 开发
pnpm build    # 构建
pnpm lint     # 代码检查
pnpm preview  # 预览构建产物
```

## 注意事项

1. **环境变量**：在 `.env` 文件中配置 `VITE_API_URL`
2. **Token 刷新**：需要后端提供 `/auth/refresh` 接口
3. **权限数据**：目前是 Mock 数据，需要对接后端接口获取真实权限
