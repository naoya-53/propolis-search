const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

app.get('/api/search', (req, res) => {
  const query = req.query.q || '';
  fs.readFile('data.json', 'utf8', (err, jsonData) => {
    if (err) return res.status(500).json({ error: '読み込みエラー' });

    const data = JSON.parse(jsonData);
    const results = data.filter(item =>
      item.title.includes(query) || item.description.includes(query)
    );
    res.json({ results });
  });
});

app.listen(3000, () => {
  console.log('? http://localhost:3000 でサーバー起動中！');
});
