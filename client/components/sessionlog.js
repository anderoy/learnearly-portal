import { Session } from 'meteor/session';

Template.addSessionlog_form.onCreated(function(){
  // I will reset these counters to 0 at the template level to use for indexing the coaching strategy fields
  nameindex = 0;
  timeindex = 0;
});

Template.addSessionlog_form.helpers({
  strategySelected: function (fieldName) {
    return AutoForm.getFieldValue(fieldName) || false;
  },
  getStrategies: function (fieldName) {
    return AutoForm.getFieldValue(fieldName) || "none selected";
  },
  indexName: function () {
    // give the array field name the proper index number
    var nameValue = "strategies."+nameindex+".name";
    nameindex ++;
    return nameValue;
  },
  indexTime: function () {
    // give the array field time the proper index number
    var nameValue = "strategies."+timeindex+".time";
    timeindex ++;
    return nameValue;
  },
  defaultTeach: function () {
    if(Session.get("teachid")) {
      return Session.get("teachid");
    } else {
      return;
    }
  },
});

Template.editSessionlog_form.onCreated(function(){
  // I will reset these counters to 0 at the template level to use for indexing the coaching strategy fields
  nameindex = 0;
  timeindex = 0;
});

Template.editSessionlog_form.helpers({
  strategySelected: function (fieldName) {
    return AutoForm.getFieldValue(fieldName) || false;
  },
  getStrategies: function (fieldName) {
    return AutoForm.getFieldValue(fieldName) || "none selected";
  },
  indexName: function () {
    // give the array field name the proper index number
    var nameValue = "strategies."+nameindex+".name";
    nameindex ++;
    return nameValue;
  },
  indexTime: function () {
    // give the array field time the proper index number
    var nameValue = "strategies."+timeindex+".time";
    timeindex ++;
    return nameValue;
  },
});

Template.sessionlogList.helpers({
  session: function () {
    return Sessionlogs.find({
      'teacher._id': this._id
    }, {
      sort: { starttime: -1 }
    });
  },
  makehref: function (data) {
    return "#"+data;
  }
});

Template.sessionlogList.events({
  'click .js-add-session':function(event){
    Session.set("teachid", this._id);
  },
});