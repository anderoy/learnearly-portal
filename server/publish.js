try{

Meteor.publish('allTeachers', function(){
  if(!this.userId){
    // return nothing when no user is logged in
    return this.ready();
  }
  return Teachers.find({});
});

Meteor.publish('allClasslogs', function(){
  if(!this.userId){
    // return nothing when no user is logged in
    return this.ready();
  }
  return Classlogs.find({});
});

Meteor.publish('allSessionlogs', function(){
  if(!this.userId){
    // return nothing when no user is logged in
    return this.ready();
  }
  return Sessionlogs.find({});
});

Meteor.publish('allSchools', function(){
  if(!this.userId){
    // return nothing when no user is logged in
    return this.ready();
  }
  return Schools.find({});
});

Meteor.publish('allUsers', function(){
  if(Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({}); 
  }
});

Meteor.publish('userData', function () {
  return Meteor.users.find({},
    {fields: {'_id': 1, 'profile.firstname': 1, 'profile.lastname': 1}});
});

Meteor.publish('allAttachments', function(){
  if(!this.userId){
    // return nothing when no user is logged in
    return this.ready();
  }
  return Attachments.find({});
});

}catch(err) {
    console.log(err);
}