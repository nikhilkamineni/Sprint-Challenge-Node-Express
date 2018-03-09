const express = require('express');

const server = express();
const router = require('./controllers/bpi-compare.js')

const PORT = 3030;

server.use(router)

server.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});
