var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailInList = Backbone.View.extend({

  initialize: function() {

  },

  events: {
    'click': 'showTrail'
  },

  template: $('[data-template="trail-in-list"]').text(),

  className: 'four wide column trail',

  getBoroughs: function(){
    var boroughs = _.uniq(_.pluck(_.pluck(this.model.get("stops"), 'tree'), 'borough'));
    return boroughs.join(", ")
  },

  totalDiameter: function(){
    var diameters = _.pluck(_.pluck(this.model.get("stops"), 'tree'), 'diameter');
    return _.reduce(diameters, function(sum, d){
      return sum + d;
    });
  },

  showTrail: function(){
    window.location.href = "/#trail-follow/" + this.model.get("id");
  },

  render: function(){
    this.totalDiameter();
    var trail = {
      name: this.model.get("name"),
      boroughs: this.getBoroughs(),
      diameterage: this.totalDiameter()
    }
    this.$el.html(Mustache.render(this.template, trail));
  },

  close: function(){
    this.remove();
  }
})