try{

var postSignUp = function(userId, info) {
  console.log(userId);
  console.log(info.profile.firstname);
  Roles.addUsersToRoles(userId, 'unauthenticated');
}

AccountsTemplates.configure({
  postSignUpHook: postSignUp
});

}catch(err) {
    console.log(err);
}