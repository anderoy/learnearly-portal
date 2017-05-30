import moment from 'moment';

Template.registerHelper('formatDateTime', ( val ) => {
  return moment(val).format('MMMM Do YYYY, h:mm a');
});

Template.registerHelper('formatShortDateTime', ( val ) => {
  return moment(val).format('MM/DD/YY, h:mm a');
});

Template.registerHelper('formatEndTime', ( val ) => {
  return moment(val).format('h:mm a');
});

Template.registerHelper( 'isCurrentUser', ( currentUser ) => {
  return currentUser === Meteor.userId() ? true : false;
});

// This will create an options list of coaches for autoForm
Template.registerHelper('coachList', function() {
  var coachList = [];
  // uncomment for filtered teachers var allTeachers = Teachers.find({createdBy:Meteor.user()._id}).fetch({});
  var allCoaches = Meteor.users.find({}, {
    sort: { 'profile.firstname': 1 }
  }).fetch({});
  for (var j = 0; j < allCoaches.length; j++){
    coachList[j] = {
      label:allCoaches[j].profile.firstname +" " + allCoaches[j].profile.lastname,
      value:allCoaches[j]._id
    }
  };
  return coachList;
});

// This will create an options list of teachers for autoForm
Template.registerHelper('myTeachers', function() {
  var myTeachers = [];
  // uncomment for filtered teachers var allTeachers = Teachers.find({createdBy:Meteor.user()._id}).fetch({});
  var allTeachers = Teachers.find({}, {
    sort: { firstname: 1 }
  }).fetch({});
  for (var j = 0; j < allTeachers.length; j++){
    myTeachers[j] = {label:allTeachers[j].firstname +" " + allTeachers[j].lastname, value:allTeachers[j]._id};
  };
  return myTeachers;
});

// This will create an options list of schools for autoForm
Template.registerHelper('schoolList', function() {
  var schoolList = [];
  var allSchools = Schools.find({}, {
    sort: { name: 1 }
  }).fetch({});
  for (var j = 0; j < allSchools.length; j++){
    schoolList[j] = {label:allSchools[j].name, value:allSchools[j]._id};
  };
  return schoolList;
});