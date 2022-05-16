function beforeCreateMessage(req, res, next) {
  console.log('beforeCreateMessage is called');
  return next();
}

module.exports = {
  beforeCreateMessage,
};
