using { cuid } from '@sap/cds/common';
using { Members } from '../index';

entity Messages : cuid {
  content : localized String(250);
  sendTime : DateTime;
  author : Association to one Members;
}