try{

Classlogs = new Mongo.Collection("classlogs");

Classlogs.attachSchema(new SimpleSchema({
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
    }
  },
  teacher: {
    type: Object,
    label: "Teacher"
  },
  "teacher._id": {
    type: String,
    label: "Teacher ID"
  },
  "teacher.firstname": {
    type: String,
    label: "Teacher First Name",
    autoValue: function(){
      if (!this.siblingField('_id').value) {
        return;
      }
      return Teachers.findOne({_id:this.siblingField('_id').value}).firstname;
    }
  },
  "teacher.lastname": {
    type: String,
    label: "Teacher Last Name",
    autoValue: function(){
      if (!this.siblingField('_id').value) {
        return;
      }
      return Teachers.findOne({_id:this.siblingField('_id').value}).lastname;
    }
  },
  observer: {
    type: Object, // reference to userId
    label: "Observer"
  },
  "observer._id": {
    type: String,
    label: "Observer ID"
  },
  "observer.firstname": {
    type: String,
    label: "Observer First Name",
    autoValue: function(){
      if (!this.siblingField('_id').value) {
        return;
      }
      return Meteor.users.findOne({_id:this.siblingField('_id').value}).profile.firstname;
    }
  },
  "observer.lastname": {
    type: String,
    label: "Observer Last Name",
    autoValue: function(){
      if (!this.siblingField('_id').value) {
        return;
      }
      return Meteor.users.findOne({_id:this.siblingField('_id').value}).profile.lastname;
    }
  },
  rubric: {
    type: String,
    label: "Rubric Level",
    allowedValues: ['Infant', 'Toddler', 'Pre-K-3']
  },
  starttime: {
    type: Date,
    label: "Observation start time"
  },
  endtime: {
    type: Date,
    label: "Observation end time"
  },
  adults: {
    type: Number,
    min: 1
  },
  children: {
    type: Number,
    min: 0
  },
  content: {
    type: [String],
    label: "Content of teaching",
    allowedValues: ["Lit/Lang Arts", "Social Studies", "Math", "Art", "Science", "other"],
    optional: true
  },
  contentoth: {
    type: String,
    label: "Other content",
    optional: true
  },
  format: {
    type: [String],
    label: "Format of teaching",
    allowedValues: ["Routine", "Meals/snacks", "Whole group", "Small group", "Individual time", "Free choice/centers", "other"],
    optional: true
  },
  formatoth: {
    type: String,
    label: "Other format",
    optional: true
  },
  dimensions: {
    type: [Object],
    label: "CLASS Dimensions",
    optional: true
  },
  "dimensions.$.name": {
    type: String,
    label: "CLASS Dimension Name"
  },
  "dimensions.$.score": {
    type: [Number],
    label: "Observation Cycle Scores",
    optional: true,
    min: 1,
    max: 7,
    maxCount: 6
  },
  "dimensions.$.evidence": {
    type: String,
    label: "Evidence",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  },
  "dimensions.$.overall": {
    type: Number,
    decimal: true,
    label: "Overall",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "hidden"
      }
    },
    autoValue: function(){
      var sum = 0; // set base to 0
      var scores = this.siblingField('score').value; // retrieve array of numbers from this domain
      if (!scores) { // check if the variable array has values
        return;
      }
      else {
        for( var i = 0; i < scores.length; i++ ){ // loop through the array
          sum += parseInt( scores[i], 10 ); // add value to base
        }
        var avg = sum/scores.length; // figure out the average
        return avg; // store the average in the field
      }
    }
  }
}));

}catch(err) {
    console.log(err);
}