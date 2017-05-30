import { Session } from 'meteor/session';

Template.classlogList.helpers({
  // Bind the classlogs collection to the classlogList template
  classlogs:function(){
    return Classlogs.find({});
  },
  selectedClasslogDoc:function(){
    return Classlogs.findOne({_id:Session.get("selectedClasslogId")});
  },
  formType: function () {
    if (Session.get("selectedClasslogId")) {
      return "update";
    } else {
      return "disabled";
    }
  }
});

Template.classlogList.events({
  'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return; // Won't be data if a placeholder row is clicked
    Router.go('/class/'+rowData._id);
  }
});

Template.addClasslog_button.events({
  'click .js-add-classlog':function(event){
    $('#addClasslog_form').modal('show');
  }
});

Template.addSchool_button.events({
  'click .js-add-school':function(event){
    $('#addSchool_form').modal('show');
  }
});

Template.editClasslog_form.events({
  'click .js-close-edit': function (event) {
    // Redirect to Classlog detail page after clicking submit from edit mode
    Router.go('/class/'+this._id);
  }
});