import { cp, mkdir, rm } from "node:fs/promises";

const files = [
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

const iconFiles = [
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
];

const screenFiles = [
  "assets/screens/app-mission-reservation.png",
  "assets/screens/app-mission-practice.png",
  "assets/screens/app-listening-home.png",
  "assets/screens/app-listening-episode.png",
  "assets/screens/app-listening-preview.png",
  "assets/screens/app-listening-player.png"
];

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });

for (const file of files) {
  await cp(file, `dist/${file}`, { recursive: true });
}

await mkdir("dist/assets/screens-jpg", { recursive: true });
await cp("assets/screens-jpg", "dist/assets/screens-jpg", { recursive: true });
await mkdir("dist/assets/screens", { recursive: true });

for (const screen of screenFiles) {
  await cp(screen, `dist/${screen}`);
}

await mkdir("dist/assets/icons/scenes", { recursive: true });
await mkdir("dist/assets/icons/features", { recursive: true });

for (const icon of iconFiles) {
  await cp(icon, `dist/${icon}`);
}

console.log("Built static site to dist/.");
