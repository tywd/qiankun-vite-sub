const express = require('express');
const path = require('path');
const app = express();

// 静态资源服务
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  maxAge: '31536000',
  immutable: true
}));

// 处理 /sub-app/assets/* 路径
app.get('/sub-app/assets/*', (req, res) => {
  const assetPath = req.params[0];
  res.sendFile(path.join(__dirname, 'dist/assets', assetPath));
});

// 处理 /sub-app/* 路径
app.get('/sub-app/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// 处理 /* 路径
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});