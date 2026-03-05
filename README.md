# 简历×JD 匹配分析仪

## 部署到 Vercel（免费，5分钟搞定）

### 第一步：准备代码

把这个文件夹上传到 GitHub：
1. 去 https://github.com/new 新建一个仓库（名字随便，如 `resume-matcher`）
2. 把 `api/`、`public/`、`vercel.json` 三个文件/文件夹全部上传进去

### 第二步：部署到 Vercel

1. 去 https://vercel.com 注册/登录（用 GitHub 账号登录最方便）
2. 点击 **"Add New Project"**
3. 选择你刚创建的 GitHub 仓库，点 **Import**
4. 直接点 **Deploy**（不需要改任何设置）

### 第三步：添加 API Key（关键！）

部署完成后：
1. 进入项目页面 → 点 **Settings** → 点左侧 **Environment Variables**
2. 添加一个变量：
   - Name: `ANTHROPIC_API_KEY`
   - Value: 你的 Anthropic API Key（去 https://console.anthropic.com 获取）
3. 点 **Save**
4. 回到 **Deployments** 页面 → 点 **Redeploy**（让环境变量生效）

### 完成！

Vercel 会给你一个链接如 `https://resume-matcher-xxx.vercel.app`，分享给任何人都可以用。

---

## 注意事项

- **API 费用**：每次分析会消耗 Anthropic API tokens，费用极低（约 $0.01/次）
- **API Key 安全**：Key 存在 Vercel 环境变量里，不会暴露给用户
- **流量**：Vercel 免费版每月 100GB 流量，个人使用完全够用
