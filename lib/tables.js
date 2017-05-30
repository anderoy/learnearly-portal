try{

import moment from 'moment';

TabularTables = {};

TabularTables.Classlogs = new Tabular.Table({
  name: "Classlogs",
  collection: Classlogs,
  responsive: true,
  autoWidth: false,
  columns: [
  {data: "teacher.firstname", title: "Teacher First"},
  {data: "teacher.lastname", title: "Teacher Last"},
  {
    data: "createdAt",
    title: "Added",
    render: function(val){
      return moment(val).format('MM/DD/YYYY');
    }
  },
  {data: "observer.firstname", title: "Observer"},
  {tmpl: Meteor.isClient && Template.editClasslogButton}
  ],
  extraFields: ['_id']
});

TabularTables.Users = new Tabular.Table({
  name: "Users",
  collection: Meteor.users,
  responsive: true,
  autoWidth: false,
  columns: [
    {data: "profile.firstname", title: "First Name"},
    {data: "profile.lastname", title: "Last Name"},
    {data: "username", title: "Username"},
    {data: "emails[0].address", title: "Email"},
    {data: "roles", title: "Roles"},
    {
      data: "createdAt",
      title: "Added",
      render: function(val){
        return moment(val).format('MM/DD/YYYY');
      }
    }
  ]
});


TabularTables.Teachers = new Tabular.Table({
  name: "Teachers",
  collection: Teachers,
  responsive: true,
  autoWidth: false,
  columns: [
    {data: "firstname", title: "First Name"},
    {data: "lastname", title: "Last Name"},
    {data: "cohort", title: "Cohort"},
    {data: "coach.firstname", title: "Coach First"},
    {data: "coach.lastname", title: "Coach Last"}
  ],
  extraFields: ['_id']
});

}catch(err) {
    console.log(err);
}