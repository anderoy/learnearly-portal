try{

Schools = new Mongo.Collection("schools");

Schools.attachSchema(new SimpleSchema({
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
  name: {
    type: String,
    label: "School/Program Name"
  },
  esdId: {
    type: String,
    label: "ESD ID",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "hidden"
      }
    }
  },
  tid: {
    type: String,
    label: "ESD Portal TID",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "hidden"
      }
    }
  },
  stateLicenseId: {
    type: String,
    label: "State License ID",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "hidden"
      }
    }
  },
  ages: {
    type: [String],
    label: "Ages Served",
    allowedValues: ['Infant', 'Toddler', 'Pre-K', 'School Age']
  }
}));

}catch(err) {
    console.log(err);
}