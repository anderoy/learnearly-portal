try{

Teachers = new Mongo.Collection("teachers");

Teachers.attachSchema(new SimpleSchema({
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
      autoform: {
      afFieldInput: {
        type: "hidden"
      }
    }
  },
  createdBy: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return {$setOnInsert: this.userId};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
    autoform: {
      afFieldInput: {
        type: "hidden"
      }
    }
  },
  firstname: {
    type: String,
    label: "First Name"
  },
  lastname: {
    type: String,
    label: "Last Name"
  },
  position: {
    type: String,
    label: "Position / Job Title"
  },
  cohort: {
    type: String,
    label: "Cohort",
    allowedValues: ['Cohort 1', 'Cohort 2', 'Cohort 3']
  },
  emails: {
    type: [String],
    label: "E-mail",
    regEx: SimpleSchema.RegEx.Email
  },
  coach: {
    type: Object, // reference to userId
    label: "Assigned Coach"
  },
  "coach._id": {
    type: String,
    label: "Coach ID"
  },
  "coach.firstname": {
    type: String,
    label: "Coach First Name",
    autoValue: function(){
      if (!this.siblingField('_id').value) {
        return;
      }
      return Meteor.users.findOne({_id:this.siblingField('_id').value}).profile.firstname;
    }
  },
  "coach.lastname": {
    type: String,
    label: "Coach Last Name",
    autoValue: function(){
      if (!this.siblingField('_id').value) {
        return;
      }
      return Meteor.users.findOne({_id:this.siblingField('_id').value}).profile.lastname;
    }
  },
  school: {
    type: Object,
    label: "School"
  },
  "school._id": {
    type: String,
    label: "School ID"
  },
  "school.name": {
    type: String,
    label: "School Name",
    autoValue: function(){
      if (!this.siblingField('_id').value) {
        return;
      }
      return Schools.findOne({_id:this.siblingField('_id').value}).name;
    }
  },
  status: {
    type: String,
    label: "E3 Participation Status",
    allowedValues: ['Active', 'Deprioritized', 'Dropped', 'Cut', 'Graduated', 'New']
  }
}));

}catch(err) {
    console.log(err);
}