try{

Attachments = new Mongo.Collection("attachments");

Attachments.attachSchema(new SimpleSchema({
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
  teacher_id: {
    type: String,
    label: "Teacher ID"
  },
  filename: {
    type: String,
    label: "Filename"
  },
  description: {
    type: String,
    label: "Description"
  },
  url: {
    type: String,
    label: "File URL",
    autoform: {
      afFieldInput: {
        type: "hidden"
      }
    }
  }
}));

}catch(err) {
    console.log(err);
}