try{

import { Meteor } from 'meteor/meteor';

Meteor.methods({
  // tests for the existence of a specific username during the user creation process
  userExists: function(username){
    return !!Meteor.users.findOne({username: username});
  },
  addTeacher:function(data){
    console.log(data);
    if (!this.userId){// not logged in
      return;
    }
    else {
      return Teachers.insert(data);
    } 
  },
  editTeacher:function(mod, docid){
    console.log(docid);
    console.log(mod);
    if (!this.userId){// not logged in
      return;
    }
    else {
      console.log("Before Check");
      // Important server-side check for security and data integrity
      check(mod, Teachers.simpleSchema());
      // Update the Teacher
      console.log("After Check");
      console.log(mod);
      Teachers.update(docid, mod);
    }
  },
  delTeacher:function(doc){
    console.log("userid: " +this.userId);
    console.log(doc._id);
    console.log(doc.createdBy);
    if (!this.userId || this.userId != doc.createdBy){// not logged in or didn't create teacher
      return;
    }
    else {
      Teachers.remove(doc);
    }
  },
  addClasslog:function(doc){
    console.log("inserted" + doc.teacher.firstname + " " + doc.teacher.lastname);
    if (!this.userId){// not logged in
      return;
    }
    else {
      return Classlogs.insert(doc);
    }
  },
  editClasslog:function(mod, docid){
    if (!this.userId){// not logged in
      return;
    }
    else {
      console.log("updated: " + docid);
      // Important server-side check for security and data integrity
      check(mod, Classlogs.simpleSchema());
      // Update the CLASS log
      Classlogs.update(docid, mod);
    }
  },
  addSchool:function(data){
    console.log(data);
    if (!this.userId){// not logged in
      return;
    }
    else {
      Schools.insert(data);
    }
  },
  addSessionlog:function(doc){
    // eventually want to add a check for coach assignment here.
    console.log("inserted new session for " + doc.teacher.firstname + " " + doc.teacher.lastname);
    if (!this.userId){// not logged in
      return;
    }
    else {
      console.log(doc);
      return Sessionlogs.insert(doc);
    }
  },
  editSessionlog:function(mod, docid){
    if (!this.userId){// not logged in
      return;
    }
    else {
      console.log("updated: " + docid);
      // Important server-side check for security and data integrity
      check(mod, Sessionlogs.simpleSchema());
      console.log(mod);
      // Update the Session log
      Sessionlogs.update(docid, mod);
    }
  },
});

}catch(err) {
    console.log(err);
}