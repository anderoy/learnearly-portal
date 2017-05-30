import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './main.html';

// Set the basic subscribe to all data here for the purposes of inital prototyping
Template.body.onCreated(function(){
  this.autorun(() => {
    this.subscribe('allTeachers');
    this.subscribe('allClasslogs');
    this.subscribe('allSchools');
    this.subscribe('userData');
    this.subscribe('allAttachments');
    this.subscribe('allSessionlogs');
  });
});