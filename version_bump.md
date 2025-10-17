# 如何在 pnpm Monorepo 中安全地提升版本

本文档旨在解释在当前 `lemon-design` 项目中，如何正确地为单个包（例如 `@lemon-design-xx/core`）提升版本号，并说明为什么不能直接使用 `npm version` 或 `pnpm version`。

---

## 核心问题：为什么 `npm version` 和 `pnpm version` 会失败？

在 pnpm 的 monorepo（工作区）中，包之间的依赖关系通常使用 `workspace:` 协议来表示，例如：

```json
"dependencies": {
  "@lemon-design-xx/utils": "workspace:*"
}
```

当你尝试在 `packages/core` 目录下直接或间接（通过 `pnpm --filter`）运行 `npm version` 时，会遇到 `EUNSUPPORTEDPROTOCOL` 错误。这是因为 **npm 的 `version` 命令不认识 `workspace:` 这种协议**，在解析 `package.json` 时会直接报错并退出。

同样，如果你尝试使用 `pnpm version`，它在执行过程中会触发一个递归循环，因为 `pnpm version` 会再次调用 `version` 脚本，导致无限循环的错误。

## 解决方案：使用自定义版本提升脚本

为了解决这个问题，我们创建了一个独立的 Node.js 脚本，它不依赖 `npm` 或 `pnpm` 的 `version` 命令，而是直接读取、修改和写回 `package.json` 文件。

- **脚本位置**: `packages/core/scripts/bump-version.cjs`
- **`package.json` 配置**: 在 `packages/core/package.json` 中，`version` 脚本被配置为执行此脚本：
  ```json
  "scripts": {
    "version": "node ./scripts/bump-version.cjs"
  }
  ```

这个脚本的优势在于：
1.  **环境独立**：它是一个纯 Node.js 脚本，不依赖任何包管理器的特定行为。
2.  **功能纯粹**：只负责更新 `version` 字段，不执行任何 Git 操作（如 commit 或 tag），将 Git 操作的控制权完全交还给你或 Lerna。
3.  **避免错误**：因为它不解析依赖，所以 `workspace:` 协议不会引发任何问题。

---

## 如何提升版本：分步指南

要为 `@lemon-design-xx/core` 包提升版本，请遵循以下步骤。

### 1. 运行版本提升命令

在项目**根目录**下，执行以下命令。请将 `<type>` 替换为你想要的版本更新类型。

```bash
# pnpm --filter <package_name> run <script_name> <...args>
pnpm --filter @lemon-design-xx/core run version <type>
```

其中 `<type>` 可以是：
- `patch`：补丁版本，例如 `1.2.3` -> `1.2.4`
- `minor`：次版本，例如 `1.2.3` -> `1.3.0`
- `major`：主版本，例如 `1.2.3` -> `2.0.0`
- `x.y.z`：一个具体的版本号，例如 `1.5.0`

**示例：提升一个补丁版本**

```bash
pnpm --filter @lemon-design-xx/core run version patch
```

执行后，你会看到类似 `v1.2.4` 的输出，表示 `packages/core/package.json` 中的版本号已成功更新。

### 2. 检查变更

此时，只有 `packages/core/package.json` 文件被修改了。你可以通过 `git status` 或在 IDE 中查看确认。

### 3. 提交并发布

版本号更新后，你就可以继续执行发布流程了，例如：

- **对于 Lerna 自动发布**：
  ```bash
  # Lerna 会自动处理 Git commit 和 tag
  pnpm run publish
  ```

- **对于手动发布（`from-git`）**：
  1.  `git add .`
  2.  `git commit -m "chore(release): bump core to v1.2.4"`
  3.  `git tag @lemon-design-xx/core@1.2.4`
  4.  `lerna publish from-git --yes`

---

遵循以上指南，你就可以在当前项目中安全、可靠地管理版本号了。

---

## 附录：`npm version` 的标准执行流程

`npm version` 是一个复合命令，当在**一个标准的、非 monorepo** 的 Git 仓库中运行时，它会严格按照以下生命周期顺序执行一系列操作：

1.  **检查 Git 工作区状态 (Check Git Status)**
    *   命令首先会检查你的 Git 工作区是否是“干净”的（即没有未提交的修改）。如果存在未提交的变更，`npm version` 会立即失败并退出，以防止意外地将不完整的代码变更包含在版本提交中。

2.  **执行 `preversion` 脚本 (Run `preversion` script)**
    *   如果 `package.json` 的 `scripts` 中定义了 `preversion` 脚本，该脚本会被执行。这通常用于在版本提升前运行一些检查，例如代码风格检查、单元测试等，确保即将发布的版本是稳定可靠的。
    *   如果 `preversion` 脚本执行失败（以非零状态码退出），整个 `npm version` 过程会中止。

3.  **提升版本号 (Bump Version)**
    *   根据你提供的参数（`patch`, `minor`, `major` 或具体版本号），`npm version` 会修改 `package.json` 文件中的 `version` 字段。

4.  **执行 `version` 脚本 (Run `version` script)**
    *   在 `package.json` 更新**之后**、Git 提交**之前**，如果定义了 `version` 脚本，它会被执行。这个阶段可以用来执行一些与新版本号相关的构建任务，例如根据新版本号更新文档中的版本信息。

5.  **创建 Git 提交和标签 (Create Git Commit and Tag)**
    *   这是 `npm version` 的核心功能之一。它会自动执行以下 Git 操作：
        *   `git add package.json` (以及 `package-lock.json`，如果存在且被修改)
        *   `git commit -m "vX.Y.Z"` (提交信息默认为版本号，可以通过 `-m` 参数自定义)
        *   `git tag vX.Y.Z` (创建一个与新版本号同名的 annotated tag)
    *   如果你不希望执行这一步，可以添加 `--no-git-tag-version` 参数。在我们的项目中，正是利用了这个参数来将 Git 的控制权交还给 Lerna 或用户手动操作。

6.  **执行 `postversion` 脚本 (Run `postversion` script)**
    *   在 Git 提交和标签创建**之后**，如果定义了 `postversion` 脚本，它会被执行。这通常用于执行一些清理工作，或者将新创建的 Git 标签推送到远程仓库（例如 `git push && git push --tags`）。

### 总结

`npm version` 的设计初衷是为了在一个独立的包中自动化“版本提升 -> Git 标记”这个标准流程。然而，在 pnpm monorepo 环境下，它的 Git 功能以及对 `workspace:` 协议的不支持使其变得不适用，这也是我们选择自定义脚本的根本原因。