using { Messages as MessagesEntity } from './../../db/index.cds';
using { Members as MembersEntity } from './../../db/index.cds';

@impl: '../srv/implementations/chat/index.js'
service ChatService {
  entity Messages as projection on MessagesEntity;
  entity Members as projection on MembersEntity;
  function getNewMessages(memberID: UUID) returns Array of Messages;
}