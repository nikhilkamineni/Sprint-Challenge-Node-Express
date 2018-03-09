const express = require('express');
const bodyParse = require('body-parser');
const fetch = require('node-fetch');

const server = express();

const PORT = 3030;

const URL_CURRENT = "https://api.coindesk.com/v1/bpi/currentprice.json"
const URL_YEST = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday'

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

server.get('/compare', (req, res) => {
  getCurrentValue()
    .then(value => {
      res.status(200)
      res.send({ value: value })
    })
    .catch(err => {
      res.status(422)
      res.send({ error: 'Error in /compare request' })
    })
    
})

function getCurrentValue() {
  return new Promise((resolve, reject) => {
    fetch(URL_CURRENT)
      .then(res => res.json())
      .then(res => res.bpi.USD.rate_float)
      .then(rate => {
        resolve(rate);
      })
      .catch(err => {
        reject(err);
      })
  })
}

server.listen(PORT, (err) => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
})

