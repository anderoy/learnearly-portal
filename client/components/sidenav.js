Template.sidenav.helpers({
  isCurrentPage: function(pageName){
    return Router.current().route.getName() == pageName
  },
});

Template.sidenav.events({
  'click .berttest':function(e){
    Bert.alert('The click worked', 'success', 'growl-top-right');
  },
  'click .navbar-toggle':function(event){
    $('.navbar-nav').toggleClass('slide-in');
    //$('.side-body').toggleClass('body-slide-in');
    $('#search').removeClass('in').addClass('collapse').slideUp(200);

    /// uncomment code for absolute positioning tweek see top comment in css
    //$('.absolute-wrapper').toggleClass('slide-in');
  },
  'click .side-menu-container li:not(".dropdown")':function(event){
    $('.navbar-nav').toggleClass('slide-in');
  },
  'click #search-trigger':function(event){
    $('.navbar-nav').removeClass('slide-in');
    $('.side-body').removeClass('body-slide-in');

    /// uncomment code for absolute positioning tweek see top comment in css
    //$('.absolute-wrapper').removeClass('slide-in');
  },
  'click .js-add-classlog':function(event){
    event.preventDefault();
    $('#addClasslog_form').modal('show');
  },
  'click .js-add-teacher':function(event){
    event.preventDefault();
    $('#addTeacher_form').modal('show');
  },
  'click .js-add-school':function(event){
    event.preventDefault();
    $('#addSchool_form').modal('show');
  },
});