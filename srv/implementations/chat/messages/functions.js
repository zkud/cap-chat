const cds = require('@sap/cds');
const { StatusCodes } = require('http-status-codes');

/**
 * @param {cds.Request} req Request object
 * @returns {Array<object>} New messages, which a chat member has not read yet
 */
async function getNewMessages(req) {
  try {
    const memberID = getMemberID(req);
    const lastSyncTime = await getMemberLastSyncTime(memberID);
    const newMessages = await getMessagesFromLastSyncTime(lastSyncTime);
    await updateLastSyncTime(memberID);
    return newMessages;
  } catch ({ statusCode, message }) {
    req.error(statusCode, message);
    return [];
  }
};

/**
 * @param {cds.Request} req Request object
 * @returns {string} Chat member's UUID
 */
function getMemberID(req) {
  const memberID = req?.data?.memberID;

  if (!memberID) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Member ID is missed',
    };
  }

  return memberID;
}

/**
 * @param {string} memberID Chat member's UUID
 * @returns {string} Chat member's last sync time
 */
async function getMemberLastSyncTime(memberID) {
  const member = await cds.run(
    SELECT
      .one
      .from('Members')
      .columns([ 'lastSyncTime' ])
      .where({ ID: memberID })
  );

  if (!member) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: `Member with given ID ${memberID} not found`,
    };
  }

  return member.lastSyncTime;
}

/**
 * @param {string} lastSyncTime Chat member's last sync time
 * @returns {Array<object>} Messages, which the member hasn't read
 */
async function getMessagesFromLastSyncTime(lastSyncTime) {
  return cds.run(
    SELECT
      .from('Messages')
      .where('sendTime', '>', lastSyncTime)
  );
}

/**
 * @param {string} memberID Chat member's UUID
 */
async function updateLastSyncTime(memberID) {
  const currentUTCTime = getCurrentUTCTime();

  await cds.run(
    UPDATE
      .entity('Members')
      .with({
        lastSyncTime: currentUTCTime,
      })
      .where({ ID: memberID })
  );
}

function getCurrentUTCTime() {
  return new Date().toISOString();
}

module.exports = {
  getNewMessages,
};