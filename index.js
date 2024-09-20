import puppeteer from "puppeteer";
import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";

const browser = await puppeteer.launch({
  headless: true, // 禁用无头模式
  devtools: true,
  defaultViewport: { width: 1000, height: 500 },
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    // "--font-render-hinting=none",
    // "--font-family=Microsoft YaHei",
  ],
});

const page = await browser.newPage();

const result = await page.evaluate(async () => {
  const toBlob = (canvas) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, "image/png");
    });
  };

  const canvas = document.createElement("canvas");
  canvas.width = 500; // 设置画布宽度
  canvas.height = 200; // 设置画布高度

  const context = canvas.getContext("2d");

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "black";

  context.font = "30px Microsoft YaHei"; // 设置字体
  context.direction = "rtl"; // 设置从右向左的文本方向

  // 调整填充文本的起始位置，避免 (0, 0) 使文字不可见
  context.fillText("ימימה", 500 / 2, 200 / 2);
  // context.fillText("｡ﾟ•┈୨♡୧┈•ﾟ｡", 500 / 2, 200 / 2);
  // context.fillText("hello world", 500, 200);
  const blob = await toBlob(canvas);

  const result = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsBinaryString(blob);
  });

  return result;
});

const fileBlob = Buffer.from(result, "binary");

await writeFile(resolve(process.cwd(), "test.png"), fileBlob, "utf-8");
// await page.addScriptTag({
//   path: resolve(process.cwd(), "index.js"),
// });

await page.close();
