const canvas = document.createElement("canvas");
canvas.width = 500; // 设置画布宽度
canvas.height = 200; // 设置画布高度
document.body.appendChild(canvas); // 将画布添加到页面中

const context = canvas.getContext("2d");
context.font = "30px sans-serif"; // 设置字体
// context.direction = "rtl"; // 设置从右向左的文本方向

// 调整填充文本的起始位置，避免 (0, 0) 使文字不可见
context.fillText("ימימה", 500 / 2, 200 / 2);
// context.fillText("｡ﾟ•┈୨♡୧┈•ﾟ｡", 500 / 2, 200 / 2);
// context.fillText("hello world", 500, 200);
