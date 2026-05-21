# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概况

塔罗牌占卜 Web 应用，纯前端 SPA。React 18 + TypeScript + Vite 5，Tailwind CSS 3 样式，Zustand 状态管理，DeepSeek API 提供 AI 深度解读。

## 常用命令

```bash
npm install          # 安装依赖（仅项目内 node_modules）
npm run dev          # 启动开发服务器 → http://localhost:5173
npm run build        # 生产构建（生成图片 data URI → tsc 类型检查 → vite build → 内联单文件）
npm run preview      # 预览生产构建
npx tsc --noEmit     # 仅类型检查
```

## 构建产物

`npm run build` 后 `dist/` 目录只有一个文件：

```
dist/index.html  (~4.7MB)  单文件，双击即可在浏览器打开
```

构建流程：
1. `scripts/generate-card-images.mjs` 读取 `public/cards/` 下所有图片，转为 base64 data URI，写入 `src/data/card-images.ts`
2. `tsc -b` 类型检查
3. `vite build` + `vite-plugin-singlefile` 将 JS/CSS/图片全部内联进单个 HTML
4. `rm -rf dist/cards` 清理多余目录

需 `base: './'`（相对路径）+ `HashRouter`（非 BrowserRouter）才能在 `file://` 协议下正常运行。

## 路径别名

`@/` → `src/`（vite.config.ts + tsconfig.json 均已配置）

## 架构概览

### 状态机（Zustand app-store）

ReadingPhase 驱动整个占卜流程：
```
idle → selecting-spread → shuffling → drawing → revealing → generating → complete
```

- `app-store.ts`：spreadConfig、userQuestion、phase、drawnCards、aiReading、aiStreaming
- `settings-store.ts`：deepseekApiKey + deepseekModel，通过 Zustand persist 中间件存入 localStorage，key 名 `tarot-settings`

### 路由

| 路径 | 页面 | 导航守卫 |
|------|------|----------|
| `/` | HomePage | - |
| `/spread-setup` | SpreadSetupPage | - |
| `/shuffle` | ShufflePage | spreadConfig 为空时重定向到 `/spread-setup` |
| `/reading` | ReadingPage | drawnCards 为空时重定向到 `/shuffle` |
| `/settings` | SettingsPage | - |

### AI 解读流程

1. `ReadingPage` 挂载时，若 `phase === 'generating'` 且有 apiKey，调用 `useDeepSeek().generateReading()`
2. `generateReading` 调用 `prompt-builder.ts` 构建 prompt → `deepseek-api.ts` 发起流式 fetch
3. API 返回完整文本后，用正则提取 `整体概述`/`逐牌解读`/`综合建议` 三段，写入 `aiReading`
4. `onChunk` 回调目前是空操作，流式进度不实时显示；解析在 API 全部返回后一次性完成
5. API 请求失败时，`aiReading` 写入错误信息（预设牌义仍显示）

### 牌阵系统

- `SpreadConfig` 是联合类型：`{ mode: 'template', template: SpreadTemplate }` | `{ mode: 'custom', positions: SpreadPosition[] }`
- 模板数据在 `src/data/spread-templates.ts`（5 个预设：单张指引、三张牌、五张牌十字阵、凯尔特十字、关系牌阵）
- 自定义牌阵 1-15 张，`SpreadBuilder` 组件提供动态表单

### 卡片组件

- `TarotCard` 使用 CSS Module（`TarotCard.module.css`）实现 3D 翻转：aspect-ratio 5/7，perspective 800px，0.6s transition
- `TarotCard` 内部有 `useEffect` 同步 `isRevealed` prop → 内部 `flipped` 状态，确保"全部翻开"按钮正常工作
- `CardBack` 是纯内联 SVG（星芒 + 曼陀罗图案），不依赖外部图片文件
- `CardFace` 加载图片失败时自动降级为 CSS 渐变占位符显示牌名
- `CardInterpretation`（解读页面）也渲染卡片图片，逆位牌旋转 180°

## 关键文件

| 文件 | 作用 |
|------|------|
| `src/data/major-arcana.ts` | 22 张大阿尔卡纳（愚者→世界），中文名/正逆位关键词/描述 |
| `src/data/minor-arcana.ts` | 56 张小阿尔卡纳（权杖/圣杯/宝剑/星币），程序化生成 |
| `src/data/deck.ts` | 合并 78 张牌 + Fisher-Yates 洗牌 |
| `src/data/card-images.ts` | **自动生成** — 78张卡片图片的 base64 data URI，由 `scripts/generate-card-images.mjs` 生成 |
| `src/data/spread-templates.ts` | 5 个预设牌阵模板 |
| `src/services/prompt-builder.ts` | DeepSeek system prompt + 用户 prompt 模板 |
| `src/services/deepseek-api.ts` | 流式 fetch，SSE 解析，Bearer auth |
| `src/store/settings-store.ts` | API Key 存 localStorage，不写入任何文件 |
| `src/pages/ReadingPage.tsx` | AI 解读入口，apiKey 存在时始终渲染 AI 区域 |
| `scripts/generate-card-images.mjs` | 读取 `public/cards/` 图片，生成 `src/data/card-images.ts` |

## 图片资源

### 放置位置

`public/cards/` — 78 张 WebP 卡片图片 + 1 张卡背

### 文件名规则

由 `src/data/major-arcana.ts` 和 `src/data/minor-arcana.ts` 中每张牌的 `imageFile` 字段定义（当前为 `.webp`）：

| 范围 | 文件名 | 数量 |
|------|--------|------|
| 大阿尔卡纳 | `m00.webp` ~ `m21.webp`（愚者→世界） | 22 张 |
| 权杖 | `w01.webp` ~ `w14.webp` | 14 张 |
| 圣杯 | `c01.webp` ~ `c14.webp` | 14 张 |
| 宝剑 | `s01.webp` ~ `s14.webp` | 14 张 |
| 星币 | `p01.webp` ~ `p14.webp` | 14 张 |
| 牌背 | `card-back.webp` | 1 张（可选，CardBack 组件有内联 SVG 回退） |

### 图片处理流水线（已完成）

1. AI 图像生成器输出 5 张精灵图（m/w/c/s/p.png）→ 放入 `fig/`（已删除）
2. `fig/crop-tool.html` 裁剪精灵图为单张卡片 → 78 张 PNG（已删除）
3. `fig/resize-tool.html` 缩放至 350×600 并转 WebP → 78 张（已删除）
4. 最终 WebP 文件放入 `public/cards/`，由构建脚本内联为 data URI

### 注意事项

- **格式**：WebP（当前），改为 PNG/JPG 需同步修改 card 数据中的 `imageFile` 后缀
- **尺寸**：350×600，牌面比例 5:7（与 `TarotCard.module.css` 中 `aspect-ratio: 5/7` 一致）
- **加载失败**：`CardFace.tsx` 的 `onError` 自动降级为 CSS 渐变占位符，不会白屏
- **内联方式**：图片通过 base64 data URI 内联进 HTML，无需外部文件
- **卡背**：`CardBack.tsx` 使用内联 SVG，不依赖外部文件。若提供 `card-back.webp`，`CardFace` 会自动使用
- **构建体积**：78 张 WebP 内联约 4.3MB，最终 HTML 约 4.7MB

## 动画

### 已有动画

| 文件 | 内容 |
|------|------|
| `src/components/card/TarotCard.module.css` | 3D 翻转动画（0.6s cubic-bezier），perspective 800px |
| `src/pages/ShufflePage.tsx` | 翻牌交互（点击翻开一张、"全部翻开"按钮） |

### 可增强的位置

| 位置 | 文件 | 建议 |
|------|------|------|
| 洗牌动画 | `ShufflePage.tsx` | 用 `framer-motion` 的 `AnimatePresence` / `layout` 做卡牌飞入、洗牌交错效果 |
| 翻牌特效 | `TarotCard.module.css` | 可加 `box-shadow` 光晕或 scale 微动效 |
| 页面过渡 | `App.tsx` | 用 framer-motion `AnimatePresence` 做路由切换淡入淡出 |
| AI 加载 | `Spinner.tsx` | 改成旋转塔罗星芒 SVG |
| 首页入场 | `HomePage.tsx` | 三步说明逐个浮现 |

### 注意事项

- `framer-motion` 已安装，直接 import 即可使用
- 优先用 CSS 动画（`TarotCard.module.css`），仅在布局变化（进出场、列表重排）时用 framer-motion

## .gitignore

已配置，忽略以下内容：
- `node_modules/` — 依赖
- `dist/` — 构建产物
- `*.tsbuildinfo` — TypeScript 增量编译缓存
- `src/data/card-images.ts` — 自动生成的图片 data URI（运行 `node scripts/generate-card-images.mjs` 重新生成）

## 其他注意事项

- 纯前端 SPA，无后端，无数据库，所有数据仅浏览器内存 + localStorage
- 删除项目文件夹即可完全清除，无全局残留
- DeepSeek API Key 通过 Zustand persist 存 localStorage，不上传任何服务器
- `noUnusedLocals` 和 `noUnusedParameters` 设为 `false`，未使用变量不会阻断构建
- CSS `@import` 必须在 `@tailwind` 指令之前
