// server/index.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// 静态资源中间件
app.use(express.static(path.resolve(__dirname, '../dist')));

// SSR 路由
app.get('*', (req, res) => {
  const indexPath = path.resolve(__dirname, '../dist/index.html');
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('读取 index.html 失败:', err);
      return res.status(500).send('Internal Server Error');
    }
    // 直接返回 HTML 内容
    res.send(htmlData);
  });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
