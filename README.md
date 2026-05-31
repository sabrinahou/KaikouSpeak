# KaikouSpeak Landing Page

[![KaikouSpeak APK Downloads](https://img.shields.io/github/downloads/sabrinahou/KaikouSpeak/v1.0.5/KaikouSpeak.apk.svg?label=APK%20downloads)](https://github.com/sabrinahou/KaikouSpeak/releases/download/v1.0.5/KaikouSpeak.apk)

这是「开口说英语 / KaikouSpeak」产品介绍官网的独立静态工程目标。

## 本地运行

```bash
cd landing-page
npm run serve
```

打开 `http://localhost:4173` 查看页面。

## 检查与构建

```bash
npm run check
npm run build
```

构建产物会输出到 `landing-page/dist/`，可作为 Cloudflare Pages 的构建输出目录。

## Cloudflare Pages 建议配置

- Path / Project root: `landing-page`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

`landing-page/wrangler.toml` 会把 Workers Assets 固定到 `./dist`。

如果 Cloudflare 项目必须从仓库根目录启动：

- Build command: `cd landing-page && npm run build`
- Deploy command: `npx wrangler deploy --config landing-page/wrangler.toml`

不要把仓库根目录 `/` 或 `/opt/buildhome/repo` 配成 assets 目录，否则 Cloudflare 构建时安装的 `node_modules/workerd/bin/workerd` 也会被当作网站资源上传，触发 25 MiB 单文件限制。

## 后续修改

下载地址、版本号、平台、文件大小、更新时间和联系邮箱集中放在 `config.js` 中。

```js
window.KAIKOU_CONFIG = {
  download: {
    apkUrl: "https://github.com/sabrinahou/KaikouSpeak/releases/download/v1.0.5/KaikouSpeak.apk",
    version: "v1.0.5",
    platform: "Android",
    fileSize: "683 MB",
    updated: "2026-05-31"
  },
  contact: {
    email: "kaikouspeak@outlook.com"
  }
};
```

网页展示用截图放在 `assets/screens-jpg/`，原始模拟器截图保留在 `assets/screens/`。如果后续重新截屏，建议用同名文件替换并重新生成 JPG；如果新增截图，请同步更新 `index.html` 的 `<img>` 引用。
