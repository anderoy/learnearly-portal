Template.teachers.helpers({

});

Template.addTeacher_button.events({
  'click .js-add-teacher':function(event){
    event.preventDefault();
    $('#addTeacher_form').modal('show');
  }
});

Template.teacherList.events({
  'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return; // Won't be data if a placeholder row is clicked
    Router.go('/teacher/'+rowData._id);
  }
});

Template.coachName.helpers({
  coachFullName: function(val) {
    var coachObj = Meteor.users.findOne({_id:val});
    var coachName = coachObj.profile.firstname + " " + coachObj.profile.lastname;
    return coachName;
  }
});

Template.s3_tester.events({
    "click button.upload": function(){
        var files = $("input.file_bag")[0].files

        S3.upload({
                files:files,
                path:"attachments"
            },function(e,r){
                console.log(r);
        });
    }
});

Template.s3_tester.helpers({
    "files": function(){
        return S3.collection.find();
    }
});