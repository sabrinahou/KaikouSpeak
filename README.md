# KaikouSpeak Landing Page

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

- Project root: `landing-page`
- Build command: `npm run build`
- Build output directory: `dist`

也可以不执行构建，直接把 `landing-page` 作为静态目录部署。

## 后续修改

下载地址、版本号、平台、文件大小、更新时间和联系邮箱集中放在 `config.js` 中。

```js
window.KAIKOU_CONFIG = {
  download: {
    apkUrl: "https://download.kaikouspeak.com/android/latest.apk",
    version: "v1.0.0",
    platform: "Android",
    fileSize: "待更新",
    updated: "2026-05-25"
  },
  contact: {
    email: "kaikouspeak@outlook.com"
  }
};
```

网页展示用截图放在 `assets/screens-jpg/`，原始模拟器截图保留在 `assets/screens/`。如果后续重新截屏，建议用同名文件替换并重新生成 JPG；如果新增截图，请同步更新 `index.html` 的 `<img>` 引用。
