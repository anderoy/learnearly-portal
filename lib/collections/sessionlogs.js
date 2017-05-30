try{

Sessionlogs = new Mongo.Collection("sessionlogs");

Sessionlogs.attachSchema(new SimpleSchema({
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
  coach: {
    type: Object, // reference to userId
    label: "Coach",
    optional: true
  },
  "coach.firstname": {
    type: String,
    label: "Coach First Name",
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.users.findOne({_id:this.field('createdBy').value}).profile.firstname;
      } else if (this.isUpsert) {
        return {$setOnInsert: Meteor.users.findOne({_id:this.field('createdBy').value}).profile.firstname};
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
  "coach.lastname": {
    type: String,
    label: "Coach Last Name",
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.users.findOne({_id:this.field('createdBy').value}).profile.lastname;
      } else if (this.isUpsert) {
        return {$setOnInsert: Meteor.users.findOne({_id:this.field('createdBy').value}).profile.lastname};
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
  teacher: {
    type: Object,
    label: "Teacher",
    optional: true
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
  starttime: {
    type: Date,
    label: "Session start time"
  },
  endtime: {
    type: Date,
    label: "Session end time"
  },
  rubric: {
    type: String,
    label: "Rubric Level",
    allowedValues: ['Infant', 'Toddler', 'Pre-K-3']
  },
  dimension: {
    type: String,
    label: "Dimension covered during session",
    allowedValues: [
      "Positive Climate",
      "Negative Climate",
      "Teacher Sensitivity",
      "Regard for Student Perspectives",
      "Behavior Management",
      "Productivity",
      "Instructional Learning Formats",
      "Concept Development",
      "Quality of Feedback",
      "Language Modeling",
      "Relational Climate",
      "Facilitated Exploration",
      "Early Language Support",
      "Regard for Child Perspectives",
      "Behavior Guidance",
      "Facilitation of Learning and Development"
    ]
  },
  observation: {
    type: String,
    label: "What did I see?",
    autoform: {
      afFieldInput: {
        type: "textarea"
      },
      rows: 5
    }
  },
  indicators: {
    type: [Object],
    label: "CLASS Indicators",
    optional: true
  },
  "indicators.$.name": {
    type: String,
    label: "CLASS Indicator Name"
  },
  "indicators.$.score": {
    type: Number,
    label: "CLASS Indicator Score",
    optional: true,
    allowedValues: [1,2,3,4,5,6,7]
  },
  activities: {
    type: String,
    label: "What did I do?",
    autoform: {
      afFieldInput: {
        type: "textarea"
      },
      rows: 5
    }
  },
  strategy: {
    type: [String],
    label: "Coaching strategies used",
    allowedValues: [
      "On-stage modeling",
      "Cue-coaching",
      "Side-by-side teaching",
      "Other"
    ],
    autoform: {
      type: "select-checkbox",
    }
  },
  strategies: {
    type: [Object],
    label: "Coaching strategies",
    optional: true
  },
  "strategies.$.name": {
    type: String,
    label: "Coaching strategy name"
  },
  "strategies.$.time": {
    type: Number,
    label: "Time spent using strategy"
  },
  nextsteps: {
    type: String,
    label: "Agreed upon next steps before next session.",
    autoform: {
      afFieldInput: {
        type: "textarea"
      },
      rows: 5
    }
  }
}));

}catch(err) {
    console.log(err);
}