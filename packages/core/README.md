# @lemon-design-xx/core

现代 React 组件库，基于 TailwindCSS 构建，提供常用 UI 组件与类型支持。

## 特性
- 基于 Material UI 与 Tailwind 的现代样式
- 提供 `Button`、`Card`、`Input` 等核心组件
- 提供 ESM/CJS 构建与类型定义（`dist/index.esm.js`、`dist/index.js`、`dist/index.d.ts`）
- 支持按需引入与类型安全

## 安装

```bash
npm install @lemon-design-xx/core
# 或
pnpm add @lemon-design-xx/core
```

需要的 peer 依赖（确保你的项目已安装）：

- `react` >= 18
- `react-dom` >= 18


## 使用示例

```tsx
import React from 'react';
import { Button, Card, Input } from '@lemon-design-xx/core';
// 如果你的构建工具未自动合并 CSS，请显式引入样式
// import '@lemon-design-xx/core/dist/index.css';

export default function App() {
  return (
    <div>
      <Button variant="primary">点击我</Button>
      <Card title="卡片标题">卡片内容</Card>
      <Input label="输入框" placeholder="请输入内容" />
    </div>
  );
}
```

### Button
- 变体：`primary`、`secondary`、`outline`、`ghost`
- 尺寸：`sm`、`md`、`lg`
- 状态：`loading`、`disabled`

### Card
- 支持标题、副标题与操作区
- 可配置边框与阴影

### Input
- 基于原生 input
- 支持验证与错误提示、帮助文本

## 样式与 Tailwind

- 组件库内部使用 Tailwind 生成样式文件，并通过构建产物导出：`dist/index.css` / `dist/index.esm.css`
- 大多数 bundler 会自动处理依赖中的 CSS。如果你的构建未自动合并，请在应用入口显式引入：

```ts
import '@lemon-design-xx/core/dist/index.css';
```

## 构建与类型

- CJS：`dist/index.js`
- ESM：`dist/index.esm.js`
- 类型：`dist/index.d.ts`

## 仓库与反馈

- 仓库地址：https://github.com/lemon-design-xx/lemon-design
- 问题反馈：https://github.com/lemon-design-xx/lemon-design/issues

## 许可证

MIT