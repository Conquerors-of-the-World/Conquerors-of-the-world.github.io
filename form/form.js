const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/api/submit', (req, res) => {
  const newData = req.body;
  let existingData = [];

  try {
    const fileData = fs.readFileSync('data.json', 'utf8');
    existingData = JSON.parse(fileData);
  } catch (err) {
    // File doesn't exist or is empty
  }

  existingData.push(newData);
  fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));
