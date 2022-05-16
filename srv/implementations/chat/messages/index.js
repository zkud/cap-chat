const functions = require('./functions');
const handlers = require('./handlers');

module.exports = {
  ...functions,
  ...handlers,
};
