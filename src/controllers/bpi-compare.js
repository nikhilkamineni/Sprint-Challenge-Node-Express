const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const { getCurrentValue, getYestValue } = require('../models/bpi-compare.js')
const URL_CURRENT = 'https://api.coindesk.com/v1/bpi/currentprice.json';

router.get('/current', (req, res) => {
  fetch(URL_CURRENT)
    .then(res => res.json())
    .then(current => {
      res.status(200);
      res.send(current);
    })
    .catch(err => {
      res.status(422);
      res.send(`Error getting current price: ${err}`);
    });
});

router.get('/compare', (req, res) => {
  getCurrentValue()
    .then(value => {
      getYestValue(value).then(values => {
        res.status(200);
        res.send(values);
      });
    })
    .catch(err => {
      res.status(422);
      res.send({error: 'Error in /compare request'});
    });
});

module.exports = router;
