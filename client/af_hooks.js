AutoForm.addHooks('insertClasslogForm', {
  // The same as the callbacks you would normally provide when calling
  // collection.insert, collection.update, or Meteor.call
  after: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    method: function(error, result) {
      Router.go('/class/edit/' + result);
      $('#addClasslog_form').modal('hide');
    }
  },
  // Called when any submit operation succeeds
  onSuccess: function() {
    Bert.alert('Successfully added new CLASS', 'success', 'growl-top-right');
  },
  // Called when any submit operation fails
  onError: function() {
    Bert.alert('Failed to add new CLASS, make sure all fields are completed. If the problem persists, please contact the administrator.', 'danger', 'growl-top-right');
  },
});

AutoForm.addHooks('insertSessionlogForm', {
  // Called when any submit operation succeeds
  onSuccess: function() {
    Bert.alert('Successfully added new Session Log for ' + this.insertDoc.teacher.firstname + ' ' + this.insertDoc.teacher.lastname , 'success', 'growl-top-right');
    Router.go('/teacher/' + this.insertDoc.teacher._id);
    delete Session.keys.teachid;
  },
  // Called when any submit operation fails
  onError: function() {
    Bert.alert('Failed to add Session Log, make sure all fields are completed. If the problem persists, please contact the administrator.', 'danger', 'growl-top-right');
  },
});

AutoForm.addHooks('editSessionlogForm', {
  // Called when any submit operation succeeds
  onSuccess: function() {
    Bert.alert('Successfully modified Session Log for ' + this.currentDoc.teacher.firstname + ' ' + this.currentDoc.teacher.lastname , 'success', 'growl-top-right');
    Router.go('/teacher/' + this.currentDoc.teacher._id);
  },
  // Called when any submit operation fails
  onError: function() {
    Bert.alert('Failed to edit Session Log, make sure all fields are completed. If the problem persists, please contact the administrator.', 'danger', 'growl-top-right');
  },
});

AutoForm.addHooks('insertTeacherForm', {
  // Called when any submit operation succeeds
  after: {
    method: function(error, result) {
      Router.go('/teacher/' + result);
      $('#addTeacher_form').modal('hide');
    }
  },
  onSuccess: function() {
    Bert.alert('Successfully added ' + this.insertDoc.firstname + ' ' + this.insertDoc.lastname, 'success', 'growl-top-right');
  },
  // Called when any submit operation fails
  onError: function() {
    Bert.alert('Failed to add new Teacher, make sure all fields are completed. If the problem persists, please contact the administrator.', 'danger', 'growl-top-right');
  },
});