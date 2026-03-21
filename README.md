# NovaSyn

NovaSyn 是一个基于 Next.js 16 构建的双语企业 AI 官网，当前以单页营销站形式呈现，支持中英文切换与响应式展示。

## Tech Stack

- Next.js 16.2.1
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Vitest + Testing Library

## Local Development

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看本地页面。

## Available Scripts

```bash
npm run dev
npm run test
npm run lint
npm run build
```

## Cloudflare Pages Deployment

当前项目已配置为 **静态导出** 部署模式：

- `next.config.ts` 中启用了 `output: "export"`
- 执行 `npm run build` 后会生成可直接部署的 `out/` 目录

### Cloudflare Pages 后台填写清单

- **Production branch**: `main`
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: 仓库根目录
- **Node.js version**: `20`

### Deployment Verification

本地部署前建议先执行：

```bash
npm run test
npm run lint
npm run build
```

Cloudflare Pages 部署完成后，重点检查：

- 首页是否正常打开
- 静态资源是否正常加载
- 字体是否正常显示
- 中英文切换是否正常
- 刷新根路径 `/` 是否正常

## Notes

当前站点适合 Cloudflare Pages 静态托管。
如果后续增加以下能力，需要重新评估部署方案：

- `app/**/route.ts`
- middleware
- Server Actions
- `cookies()` / `headers()`
- 请求时动态渲染
- 依赖服务端优化的 `next/image`
