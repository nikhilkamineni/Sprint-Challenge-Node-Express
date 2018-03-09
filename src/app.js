const express = require('express');
const bodyParse = require('body-parser');
const fetch = require('node-fetch');

const server = express();

const PORT = 3030;

const URL_CURRENT = "https://api.coindesk.com/v1/bpi/currentprice.json"

server.get('/current', (req, res) => {
  fetch(URL_CURRENT)
    .then(res => res.json())
    .then(current => {
      res.status(200)
      res.send(current)
    })
    .catch(err => {
      res.status(422)
      res.send(`Error getting current price: ${err}`)
    })
})

server.listen(PORT, (err) => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
})

