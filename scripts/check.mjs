import { readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "styles.css",
  "config.js",
  "app.js",
  "privacy.html",
  "terms.html",
  "favicon.svg",
  "og-image.svg",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml"
];

const requiredIndexSnippets = [
  "开口说英语，不只是背单词",
  "为什么学了很多英语，还是开不了口？",
  "用 Mission 把英语放回真实场景",
  "Airport English",
  "Mission：预订或更改餐位",
  "下载 Android APK",
  "看得懂”练到“说得出口",
  "application/ld+json",
  "/privacy.html",
  "/terms.html"
];

const index = await readFile("index.html", "utf8");
const app = await readFile("app.js", "utf8");
const config = await readFile("config.js", "utf8");

for (const file of requiredFiles) {
  await readFile(file, "utf8");
}

for (const snippet of requiredIndexSnippets) {
  if (!index.includes(snippet)) {
    throw new Error(`Missing required content: ${snippet}`);
  }
}

if (!config.includes("window.KAIKOU_CONFIG")) {
  throw new Error("Site configuration must stay centralized in config.js");
}

if (app.includes("https://download.kaikouspeak.com/android/latest.apk") || app.includes("const KAIKOU_DOWNLOAD")) {
  throw new Error("Download values should be read from config.js, not hard-coded in app.js");
}

if (!config.includes("https://download.kaikouspeak.com/android/latest.apk")) {
  throw new Error("APK placeholder URL is missing from config.js");
}

if (!config.includes("kaikouspeak@outlook.com") || !index.includes("kaikouspeak@outlook.com")) {
  throw new Error("Contact email must be updated in config.js and the HTML fallback");
}

for (const screenshot of [
  "assets/screens-jpg/app-home-airport.jpg",
  "assets/screens-jpg/app-scene-library.jpg",
  "assets/screens-jpg/app-ordering-food-overview.jpg",
  "assets/screens-jpg/app-mission-practice.jpg",
  "assets/screens-jpg/app-roleplay.jpg"
]) {
  await readFile(screenshot);
}

for (const icon of [
  "assets/icons/scenes/airport.webp",
  "assets/icons/scenes/ordering-food.webp",
  "assets/icons/scenes/hotel.webp",
  "assets/icons/scenes/fast-food.webp",
  "assets/icons/scenes/shopping-mall.webp",
  "assets/icons/scenes/japanese-restaurant.webp",
  "assets/icons/features/mission-learning.webp",
  "assets/icons/features/vocabulary-card.webp",
  "assets/icons/features/sentence-practice.webp",
  "assets/icons/features/dialogue-roleplay.webp",
  "assets/icons/features/dialogue-practice.webp",
  "assets/icons/features/mission-goal.webp",
  "assets/icons/features/pack-download.jpg",
  "assets/icons/features/progress-record.jpg"
]) {
  await readFile(icon);
}

const downloadAnchorCount = (index.match(/data-apk-download/g) || []).length;

if (downloadAnchorCount < 3) {
  throw new Error("Expected at least three APK download CTAs");
}

console.log("Landing page checks passed.");
