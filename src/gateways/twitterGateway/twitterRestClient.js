const axios = require('axios');
const config = require('../../config').config;

async function makeRequest(path, method) {
  const request = {
    url: `${config.twitterAPIConfig.basePath}${path}`,
    method,
    headers: {
      Authorization: `Bearer ${config.twitterAPIConfig.bearerToken}`,
    },
  };

  return axios.request(request);
}

module.exports = {
  makeRequest
};
