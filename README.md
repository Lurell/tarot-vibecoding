# 塔罗占卜

> 探索你的命运，倾听内心声音

*Vibecoding 出品 — Claude Code + DeepSeek V4 全程AI辅助开发*

纯前端塔罗牌占卜 Web 应用。支持自定义牌阵、3D翻转抽牌动画、AI 深度解读。构建产物为单个 HTML 文件，无需服务器，双击即可分享给任何人使用。

## 功能

- **5 种预设牌阵** — 单张指引、三张牌（过去·现在·未来）、五张牌十字阵、凯尔特十字、关系牌阵
- **自定义牌阵** — 自由创建 1~15 张牌的任意牌阵，定义每张牌的位置含义
- **3D 翻牌动画** — CSS 3D Transform 实现卡牌翻转，支持逐张翻开 / 一键全部翻开
- **正逆位解读** — 每张牌预设中英文关键词和中文描述，78 张牌完整覆盖
- **AI 深度解读** — 接入 DeepSeek API，流式生成个性化的整体概述、逐牌解读和综合建议
- **单文件发布** — 构建后仅一个 ~4.7MB 的 HTML 文件，双击即可在浏览器中打开
- **零环境要求** — 纯前端 SPA，无需 Node.js、无需网络（AI 功能除外）、无需安装任何软件

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 5 + vite-plugin-singlefile |
| 样式 | Tailwind CSS 3 + CSS Module |
| 状态管理 | Zustand（localStorage 持久化） |
| 路由 | React Router v6（HashRouter） |
| 动画 | Framer Motion + CSS 3D Transform |
| 图标 | lucide-react |
| AI | DeepSeek API（流式 chat completions） |
| 图片 | 78 张像素风 WebP 卡片，base64 内联 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 构建产物 → dist/index.html（单文件，双击打开）
```

## 项目结构

```
tarot/
├── public/cards/          # 78 张 WebP 卡片图片
├── scripts/
│   └── generate-card-images.mjs  # 图片 → base64 data URI
├── src/
│   ├── components/
│   │   ├── card/          # TarotCard、CardFace、CardBack（3D 翻转）
│   │   ├── reading/       # CardInterpretation、AiReading
│   │   ├── spread/        # SpreadSelector、SpreadBuilder
│   │   └── ui/            # Button、Modal、Spinner
│   ├── data/
│   │   ├── major-arcana.ts   # 22 张大阿尔卡纳
│   │   ├── minor-arcana.ts   # 56 张小阿尔卡纳
│   │   ├── deck.ts           # 78 张牌 + Fisher-Yates 洗牌
│   │   └── spread-templates.ts  # 5 个预设牌阵
│   ├── hooks/
│   │   └── useDeepSeek.ts    # AI 解读 Hook
│   ├── pages/
│   │   ├── HomePage.tsx       # 首页
│   │   ├── SpreadSetupPage.tsx  # 选择/创建牌阵
│   │   ├── ShufflePage.tsx    # 洗牌 + 翻牌
│   │   ├── ReadingPage.tsx    # 解读结果
│   │   └── SettingsPage.tsx   # API Key 设置
│   ├── services/
│   │   ├── deepseek-api.ts    # DeepSeek 流式 fetch
│   │   └── prompt-builder.ts  # System/User prompt 构建
│   └── store/
│       ├── app-store.ts       # 占卜流程状态机
│       └── settings-store.ts  # API Key 持久化
├── dist/
│   └── index.html     # 构建产物 — 单文件应用
├── CLAUDE.md          # Claude Code 项目文档
├── .gitignore
└── README.md
```

## 牌阵

| 牌阵 | 张数 | 位置 |
|------|------|------|
| 单张指引 | 1 | 今日指引 |
| 三张牌 | 3 | 过去 · 现在 · 未来 |
| 五张牌十字阵 | 5 | 核心 · 阻碍 · 根源 · 建议 · 结果 |
| 凯尔特十字 | 10 | 现状 · 阻碍 · 根源 · 过去 · 目标 · 近未来 · 自我 · 环境 · 希望 · 结果 |
| 关系牌阵 | 5 | 你自己 · 对方 · 关系现状 · 挑战 · 未来 |
| 自定义 | 1~15 | 自由定义每个位置 |

## AI 解读

1. 在 **设置页面** 填入 [DeepSeek API Key](https://platform.deepseek.com/)
2. 完成抽牌后自动生成个性化解读
3. 解读包含：整体概述、逐牌解读、综合建议
4. API Key 仅存储在浏览器 localStorage 中，不上传任何服务器

> 无需 API Key 也可使用 — 每张牌的预设关键词和描述始终可见。

## 卡片图片

78 张塔罗牌为像素二次元风格（350×600 WebP），通过 AI 图像生成器制作精灵图后裁剪、缩放得到。

如需更换卡面：
1. 将新图片按命名规则放入 `public/cards/`
2. 运行 `node scripts/generate-card-images.mjs && npm run build`

| 范围 | 文件名 |
|------|--------|
| 大阿尔卡纳 | `m00.webp` ~ `m21.webp` |
| 权杖 | `w01.webp` ~ `w14.webp` |
| 圣杯 | `c01.webp` ~ `c14.webp` |
| 宝剑 | `s01.webp` ~ `s14.webp` |
| 星币 | `p01.webp` ~ `p14.webp` |

## 分享

将 `dist/index.html` 发送给对方，双击即可在浏览器中打开。无需安装任何软件，无需网络连接（AI 功能除外）。

## 免责声明

塔罗牌占卜仅供娱乐和反思参考，不构成任何形式的专业建议。

## 许可证

MIT
