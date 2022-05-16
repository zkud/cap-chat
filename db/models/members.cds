using { cuid } from '@sap/cds/common';

entity Members : cuid {
  lastSyncTime: DateTime;
  nickname: localized String(100);
}
