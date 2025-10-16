# Lerna + npm 发布流程（独立版本模式）

本指南详细说明在本仓库（pnpm workspace + Lerna 8）中，如何以“独立版本模式”发布某个包（例如 `packages/core`），涵盖准备事项、发布步骤、常见问题与坑位，以及参考资料。

## 目录
- 环境与前置条件
- 版本策略与配置
- 发布核心包的推荐流程
- 仅发布单包的两种可靠方式
- 常见问题与易错点
- 参考资料

---

## 环境与前置条件
- Node：`>= 16`
- pnpm：`>= 8`
- Lerna：已在根 `devDependencies` 中（本项目已配置）
- Git：工作区必须干净（无未提交变更）
- npm：已登录并具备发布权限（包含作用域 `@lemon-design-xx` 的发布权；开启 2FA 的账户需在发布时完成验证）

检查登录状态：

```
npm whoami
```

如未登录：

```
npm login
```

> 注意（Windows PowerShell）：命令分隔建议使用 `;`，部分环境不支持 `&&`。

---

## 版本策略与配置

本仓库使用“独立版本模式”（Independent Versioning），每个包维护自己的版本号，只有发生变更的包才会抬版本并打标签。

- 配置文件：`lerna.json`

```
{
  "version": "independent",
  "npmClient": "pnpm",
  "packages": ["packages/*"],
  "command": {
    "version": {
      "conventionalCommits": true,
      "message": "chore(release): publish %s"
    },
    "bootstrap": {
      "ignore": "npm-*",
      "npmClientArgs": ["--no-package-lock"]
    }
  }
}
```

> 说明：
> - `version: "independent"` 表示独立版本模式。
> - `command.version.conventionalCommits: true` 启用规范化提交（Conventional Commits），Lerna 根据提交生成版本号变化与 CHANGELOG。
> - `message` 为版本提交信息模板，`%s` 会替换为版本号。
> - `bootstrap` 配置与 pnpm 的工作流兼容，避免生成 `package-lock.json`。

---

## 发布核心包的推荐流程

目标：仅发布 `@lemon-design-xx/core`，其他包不受影响（不会抬版本、不会发布）。

发布前检查：
- 确保 `packages/core/package.json` 的 `name`、`version`、`main/module/types/files` 等字段正确。
- 版本号不可与 npm 已存在版本重复。
- 工作区干净：

```
git status
```

如需清理（谨慎操作，会丢弃未保存更改）：

```
git reset --hard HEAD; git clean -fd
```

推荐发布步骤（两种）：

### 方式 A：from-package（更直观，建议）
1) 在 `packages/core` 仅抬版本（例如补丁版）：

```
pnpm --filter @lemon-design-xx/core version patch
```

2) 在根目录发布“所有尚未发布的新版本”（只会发布刚抬版本的包）：

```
lerna publish from-package --yes
```

> 注意：
> - `from-package` 根据包内 `package.json` 的版本与 npm 注册表的版本差异决定发布对象，不会影响其他未改动的包。
> - 如启用 2FA，会提示在浏览器完成授权。

### 方式 B：version + from-git（适合需要 Git 标签的流程）
1) 在根目录执行仅为 `core` 打标签（独立模式下只给有变更的包打对应 tag）：

```
lerna version --force-publish @lemon-design-xx/core --yes
```

2) 从刚生成的标签发布到 npm：

```
lerna publish from-git --yes
```

> 注意：
> - Lerna 8 的 `publish` 不再支持 `--scope` 直接筛选包，需通过“打标签后从标签发布”或“from-package”策略实现只发布单包。
> - 如果根 `package.json` 存在 `version` 脚本且调用了 `lerna version`，会在 Lerna 的 `version` 生命周期中递归触发，导致工作区脏（EUNCOMMIT）。建议根 `version` 脚本保持空或只输出（本仓库已设置为 `echo`）。

---

## 仅发布单包的两种可靠方式

- from-package（推荐）：手动或脚本抬该包版本，然后 `lerna publish from-package` 只发布尚未发布的版本。
- from-git：先通过 `lerna version` 为目标包打标签，再 `lerna publish from-git` 发布对应标签；其他无标签的包不会发布。

对比：
- from-package 更直接，依赖 `package.json` 的版本变化。
- from-git 更贴近“版本即标签”的流程，适合严格的版本/发布审计策略。

---

## 常见问题与易错点

- E403 Forbidden：
  - 可能原因：未登录、无作用域发布权限、版本已存在、组织策略禁止、2FA 未完成。
  - 处理：`npm login`；确认包 `name` 与作用域；检查版本唯一；完成 2FA；确保你是该包的维护者。

- EPRIVATE：
  - 原因：根或目标包 `package.json` 标记为 `"private": true`。
  - 处理：确保要发布的包没有 `private: true`（示例 `example`/`storybook` 通常保持私有，`core` 不应私有）。

- Lerna 8 不支持 `publish --scope`：
  - 处理：使用 `from-package` 或 `from-git` 达到同等效果。

- 工作区脏（EUNCOMMIT）：
  - 原因：`lerna version` 过程会变更多个文件（含 CHANGELOG），若脚本递归触发或者中途取消，工作区可能残留未提交文件。
  - 处理：提交变更或清理：`git reset --hard HEAD; git clean -fd`。

- Windows PowerShell 命令分隔：
  - 部分环境不支持 `&&`，使用 `;` 分隔命令。

- 版本重复：
  - `npm publish` 会报错 `You cannot publish over previously published versions`。
  - 处理：抬升到新版本（例如 `1.0.4` → `1.0.5`）。

- workspace:* 依赖链接：
  - `example` 依赖 `core` 使用 `workspace:*`，本地开发时自动连接最新构建；发布与安装时会解析为对应版本。

---

## 参考资料

- Lerna（Nx 维护）文档：
  - Version 命令：https://lerna.js.org/docs/api-reference/commands/version
  - Publish 命令：https://lerna.js.org/docs/api-reference/commands/publish
  - Independent vs Fixed 版本策略：https://lerna.js.org/docs/features/version-and-publish

- pnpm workspace 文档：
  - https://pnpm.io/workspaces

- npm 发布与 2FA：
  - https://docs.npmjs.com/about-two-factor-authentication
  - https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages

---

## 小结
在独立版本模式下，配合 `from-package` 或 `version + from-git`，可以精准地只发布目标包（如 `@lemon-design-xx/core`），避免影响其他包的版本与发布。遵循上面的准备、步骤与注意事项，可以稳定地完成发布流程。