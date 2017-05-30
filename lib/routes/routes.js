try{

// iron:router code
Router.configure({
  layoutTemplate: 'ApplicationLayout',
  yieldTemplates: {
    sidenav: {to: 'nav'}
  }
});

AccountsTemplates.configure({
  defaultLayout: 'ApplicationLayout'
});

// Protect all Routes
Router.plugin('ensureSignedIn', {
  except: ['root', 'home', 'atSignIn', 'atSignUp', 'atForgotPwd', 'atResetPwd']
});

// If you are using other plugins, pay attention to their load order.
// Use *after* so you don't get 404's on your protected routes.
// Router.onBeforeAction('dataNotFound');

Router.route('/', {
  layoutTemplate: 'ApplicationLayout',
  template: 'welcome'
});

Router.route('/teachers', {
  layoutTemplate: 'ApplicationLayout',
  template: 'teacherList'
});

Router.route('/teacher/:_id', {
  layoutTemplate: 'ApplicationLayout',
  template: 'teacher',
  data:function(){
    return Teachers.findOne({_id:this.params._id});
  }
});

Router.route('/teacher/edit/:_id', {
  layoutTemplate: 'ApplicationLayout',
  template: 'editTeacher_form',
  data:function(){
    return Teachers.findOne({_id:this.params._id});
  }
});

Router.route('/class', {
  layoutTemplate: 'ApplicationLayout',
  template: 'classlogList' 
});

Router.route('/class/:_id', {
  layoutTemplate: 'ApplicationLayout',
  template: 'classlog',
  data:function(){
    return Classlogs.findOne({_id:this.params._id});
  }
});

Router.route('/class/edit/:_id', {
  layoutTemplate: 'ApplicationLayout',
  template: 'editClasslog_form',
  data:function(){
    return Classlogs.findOne({_id:this.params._id});
  }
});

Router.route('/sessionlog/add', {
  layoutTemplate: 'ApplicationLayout',
  template: 'addSessionlog_form'
});

Router.route('/sessionlog/edit/:_id', {
  layoutTemplate: 'ApplicationLayout',
  template: 'editSessionlog_form',
  data:function(){
    return Sessionlogs.findOne({_id:this.params._id});
  }
});

Router.route('/users', {
  layoutTemplate: 'ApplicationLayout',
  template: 'users'
});


// Accounts Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

}catch(err) {
    console.log(err);
}