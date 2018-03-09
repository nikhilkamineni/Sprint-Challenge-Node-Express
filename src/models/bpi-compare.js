const fetch = require('node-fetch');

const URL_CURRENT = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const URL_YEST =
  'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';


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
      });
  });
}

function getYestValue(current) {
  return new Promise((resolve, reject) => {
    fetch(URL_YEST)
      .then(res => res.json())
      .then(res => res.bpi)
      .then(bpi => {
        const yestValue = Object.values(bpi)[0];
        const response = {
          change: getChangeStatus(current, yestValue),
          current: `$${current} USD`,
          yesterday: `$${yestValue} USD`
        };
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getChangeStatus(current, yest) {
  if (current > yest) return `Price has risen by $${current - yest} USD`;
  if (current < yest) return `Price has fallen by $${yest - current} USD`;
  if (current === yest) return `Wow, the price has not changed.`;
}

module.exports = { getCurrentValue, getYestValue };
