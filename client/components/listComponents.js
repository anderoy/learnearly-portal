import Chart from 'chart.js';
import moment from 'moment';

Template.sessionlogList.helpers({
  session: function () {
    return Sessionlogs.find({
      'teacher._id': this._id
    }, {
      sort: { starttime: -1 }
    });
  },
  makehref: function (data) {
    return "#"+data;
  }
});

Template.sessionlogList.events({
  'click .js-add-session':function(event){
    Session.set("teachid", this._id);
  },
});

Template.classlogsSummary.helpers({
  classlog: function () {
    // works in context of the individual teacher page
    // this = the teacher record
    return Classlogs.find({
      'teacher._id': this._id
    }, {
      sort: { starttime: -1 }
    });
  },
  dimname: function (dimen) {
    // works within the context of the above "classlog" helper
    // this = the classlog
    var dim;
    for (var i=0; i < this.dimensions.length; i++) { // iterate through array to find object with a specific dimension.
      if(this.dimensions[i].name === dimen) {
        dim = this.dimensions[i]
      }
    }
    return dim.name;
  },
  dimscore: function (dimen) {
    // works within the context of the above "classlog" helper
    // this = the classlog
    var dim;
    for (var i=0; i < this.dimensions.length; i++) { // iterate through array to find object with a specific dimension.
      if(this.dimensions[i].name === dimen) {
        dim = this.dimensions[i]
      }
    }
    return dim.overall;
  },
  makehref: function (data) {
    return "#"+data;
  }
});

Template.classlogsSummary.events({
  'click tbody > tr': function (event) {
    // Router.go('/class/'+this._id);
    $('#myChart').removeClass('emptyChart'); // removes the added "emptyChart" class that hides the canvas at the start
    var ctx = document.getElementById('myChart').getContext('2d');
    var teachid = document.getElementById('chartId').getAttribute('ref');
    var classid = this._id;
    var classone = Classlogs.findOne({'_id': classid});
    var classlabels = [];
    var classscores = [];
    var classdate = moment(classone.starttime).format('MM/DD/YY');
    for (var i=0; i < classone.dimensions.length; i++) { // iterate through 
      classlabels.push(classone.dimensions[i].name);
      classscores.push(classone.dimensions[i].overall);
    }
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: classlabels,
            datasets: [{
                label: "CLASS Score from: "+ classdate,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: classscores,
              }
            ]
        },

        // Configuration options go here
        options: {}
    });
  }
});

