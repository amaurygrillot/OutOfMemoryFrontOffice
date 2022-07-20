const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./dist/out-of-memory-front-office'));
app.get('/', function (req, res) {
  res.sendFile('index.html', {root : 'dist/out-of-memory-front-office'});
});
app.listen(process.env.PORT || 4200);
