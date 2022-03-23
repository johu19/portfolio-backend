const { OK } = require('http-status-codes');

const health = async () => {
  return {
    status: OK,
    body: 'Pong'
  };
};

module.exports = {
  health
}
