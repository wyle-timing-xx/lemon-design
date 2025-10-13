# 🍋 Lemon Design System

一个基于 React + MUI + TailwindCSS 的现代组件库，使用 pnpm + Lerna 进行多包管理。

## ✨ 特性

- 🎨 **现代化设计** - 基于 Material-UI 和 TailwindCSS 的美观组件
- 📦 **多包管理** - 使用 Lerna 管理多个相关包
- 🚀 **快速开发** - 集成 Storybook 进行组件开发和文档
- 📱 **响应式** - 完全响应式设计，支持各种屏幕尺寸
- 🎯 **TypeScript** - 完整的 TypeScript 支持
- 🔧 **可定制** - 高度可定制的主题和样式

## 📦 包结构

```
lemon-design/
├── packages/
│   ├── core/           # 核心组件库
│   ├── storybook/      # Storybook 文档
│   └── example/        # 示例应用
├── lerna.json          # Lerna 配置
└── package.json        # 根包配置
```

## 🚀 快速开始

### 安装依赖

```bash
# 安装 pnpm (如果还没有安装)
npm install -g pnpm

# 安装所有依赖
pnpm install
```

### 开发

```bash
# 启动所有包的开发服务器
pnpm dev

# 或者单独启动某个包
pnpm --filter @lemon-design-xx/core dev
pnpm --filter @lemon-design-xx/storybook storybook
pnpm --filter @lemon-design-xx/example dev
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @lemon-design-xx/core build
```

## 📚 使用组件

```tsx
import { Button, Card, Input } from '@lemon-design-xx/core';

function App() {
  return (
    <div>
      <Button variant="primary">点击我</Button>
      <Card title="卡片标题">
        卡片内容
      </Card>
      <Input label="输入框" placeholder="请输入内容" />
    </div>
  );
}
```

## 🎨 组件

### Button 按钮

支持多种变体和尺寸：

- **变体**: primary, secondary, outline, ghost
- **尺寸**: sm, md, lg
- **状态**: loading, disabled

### Card 卡片

灵活的卡片组件：

- 支持标题和副标题
- 可配置操作区域
- 可控制边框和阴影

### Input 输入框

基于 MUI TextField 的输入组件：

- 支持多种变体
- 内置验证和错误处理
- 支持帮助文本

## 🛠️ 技术栈

- **React 18** - 用户界面库
- **TypeScript** - 类型安全
- **Material-UI** - 基础组件库
- **TailwindCSS** - 样式框架
- **Lerna** - 多包管理
- **pnpm** - 包管理器
- **Storybook** - 组件文档
- **Rollup** - 构建工具
- **Vite** - 开发服务器

## 📖 开发指南

### 添加新组件

1. 在 `packages/core/src/components/` 中创建组件文件
2. 在 `packages/core/src/index.ts` 中导出组件
3. 在 `packages/storybook/src/stories/` 中创建 Storybook 故事
4. 更新相关文档

### 主题定制

组件库使用 TailwindCSS 进行样式定制，可以在 `tailwind.config.js` 中修改主题配置。

## 📄 许可证

MIT License
