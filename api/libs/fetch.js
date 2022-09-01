const request = require('request');

const fetch = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        reject(error);
      }
      resolve(response.body);
    });
  }).catch((error) => {
    throw error;
  });
};

module.exports = fetch;
