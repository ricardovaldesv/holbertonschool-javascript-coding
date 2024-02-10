const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

const server = app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

module.exports = server;
