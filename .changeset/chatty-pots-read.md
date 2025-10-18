---
"@lemon-design-xx/core": major
---

移除 Material UI (MUI) 依赖，改为纯 Tailwind CSS 实现

BREAKING CHANGES:
- 移除了所有 MUI 相关依赖和组件
- 组件样式现在完全基于 Tailwind CSS
- 移除了 @mui/material 和 @emotion 相关的 peer dependencies

迁移指南：
1. 移除项目中的 MUI 相关依赖
2. 确保项目中已正确配置 Tailwind CSS
3. 更新组件导入路径（如果有使用 MUI 组件的话）
4. 检查并更新依赖于 MUI 主题的样式代码
