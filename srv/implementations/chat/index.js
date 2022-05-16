const cds = require('@sap/cds');
const { 
  getNewMessages,
  beforeCreateMessage,
} = require('./messages');

module.exports = cds.service.impl((srv) => {
  srv.on('getNewMessages', getNewMessages);
  srv.before('CREATE', 'Messages', beforeCreateMessage);
});