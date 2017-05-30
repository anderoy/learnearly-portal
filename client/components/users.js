Template.users.onCreated( () => {
  Template.instance().subscribe( 'allUsers' );
});