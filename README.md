# 文档网站模板

基于 Docusaurus 3 构建的双主题文档网站模板，支持纸质奶油色浅色主题和星夜深色主题。

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装与运行

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm start
   ```
   网站将在 `http://localhost:3000` 运行

3. **构建生产版本**
   ```bash
   npm run build
   ```

## ✨ 核心功能

### 🔍 双重搜索系统
- **SimpleSearch**: 基于 Fuse.js 的快速本地文档搜索
- **PineconeSearch**: 基于 Pinecone 的 AI 语义搜索（可选）
- **统一界面**: 在首页展示两种搜索选项
- **搜索配置**: 通过 `project.config.ts` 管理 Pinecone 设置

#### 配置 Pinecone 搜索
编辑 `project.config.ts` 来启用 AI 语义搜索：

```typescript
export const projectConfig = {
  // ... 其他配置
  search: {
    enableVectorSearch: true, // 启用向量搜索
    pinecone: {
      apiKey: process.env.PINECONE_API_KEY || '',
      environment: process.env.PINECONE_ENVIRONMENT || '',
      indexName: process.env.PINECONE_INDEX || 'docs-search'
    }
  }
}
```

**环境变量设置**:
```bash
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment  
PINECONE_INDEX=docs-search
```

#### 搜索组件说明
- **SimpleSearch**: 🔍 本地搜索 - 快速搜索已知文档内容
- **PineconeSearch**: 🤖 智能搜索 - AI 语义理解，支持自然语言查询

### 🌟 流星雨动画
- 美观的背景动画效果
- 自适应性能优化
- 不影响页面交互

## 项目结构

```
docs-website-tmpl/
├── docs/                    # 文档页面
│   ├── intro.md            # 首页介绍
│   ├── getting-started/    # 入门指南
│   │   ├── installation.md
│   │   ├── quickstart.md
│   │   └── configuration.md
│   ├── api/                # API 文档
│   │   ├── overview.md
│   │   ├── authentication.md
│   │   └── endpoints.md
│   ├── examples/           # 使用示例
│   │   └── basic-usage.md
│   ├── contributing/       # 贡献指南
│   │   └── how-to-contribute.md
│   └── troubleshooting/    # 问题排查
│       └── common-issues.md
├── blog/                   # 博客文章
│   ├── authors.yml         # 作者信息
│   └── 2025-01-01-welcome.md
├── src/
│   ├── components/         # 自定义 React 组件
│   ├── css/               # 自定义样式
│   └── pages/             # 自定义页面
├── static/                # 静态资源
│   └── img/
│       ├── logo.svg       # 浅色主题 Logo
│       └── logo-dark.svg  # 深色主题 Logo
├── docusaurus.config.js   # 主配置文件
├── sidebars.js            # 侧边栏配置
└── package.json
```

## 添加新内容

### 添加新文档页面

1. **创建 Markdown 文件**
   ```bash
   # 在 docs/ 目录下创建新的 .md 文件
   touch docs/new-feature.md
   ```

2. **添加内容和元数据**
   ```markdown
   ---
   sidebar_position: 3
   ---

   # 新功能标题

   这里是内容...
   ```

3. **更新侧边栏配置** (如需要)
   编辑 `sidebars.js`：
   ```javascript
   module.exports = {
     tutorialSidebar: [
       'intro',
       'new-feature', // 添加新页面
       {
         type: 'category',
         label: '现有分类',
         items: ['existing-doc'],
       },
     ],
   };
   ```

### 添加新的文档分类

1. **创建目录和文件**
   ```bash
   mkdir docs/new-category
   touch docs/new-category/index.md
   ```

2. **更新侧边栏配置**
   ```javascript
   module.exports = {
     tutorialSidebar: [
       'intro',
       {
         type: 'category',
         label: '新分类',
         items: ['new-category/index'],
       },
     ],
   };
   ```

### 添加博客文章

1. **创建博客文件**
   ```bash
   # 文件名格式：YYYY-MM-DD-title.md
   touch blog/2025-01-15-new-post.md
   ```

2. **添加文章内容**
   ```markdown
   ---
   slug: new-post
   title: 文章标题
   authors: [author-name]
   tags: [tag1, tag2]
   ---

   文章摘要...

   <!--truncate-->

   详细内容...
   ```

### 自定义配置

**🎯 一键配置 - 只需修改一个文件！**

编辑根目录的 `project.config.ts` 来更新所有项目信息：

```typescript
const projectConfig: ProjectConfig = {
  // 基本信息
  title: '你的项目名称',
  tagline: '你的项目描述',
  description: '详细描述',
  
  // 作者信息
  author: {
    name: '你的姓名',
    email: 'your.email@example.com',
  },
  
  // GitHub 仓库
  github: {
    username: 'your-username',
    repoName: 'your-repo-name',
  },
  
  // 部署配置
  deployment: {
    url: 'https://your-username.github.io',
    baseUrl: '/', // GitHub Pages项目页面用 '/repo-name/'
  },
}
```

**自动同步的内容：**
- ✅ 网站标题、标语和所有 GitHub 链接
- ✅ 导航栏、页脚、首页按钮链接
- ✅ 文档编辑链接和部署配置

**配置完成后：** 运行 `npm run build` 即可生效。

## 常用命令

```bash
npm start              # 启动开发服务器
npm run build         # 构建生产版本
npm run serve         # 预览构建结果
npm run clear         # 清除构建缓存
```
