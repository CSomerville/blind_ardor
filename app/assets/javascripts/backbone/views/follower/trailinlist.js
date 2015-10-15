var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailInList = Arbor.Views.BaseView.extend({

  initialize: function() {
    Arbor.Views.BaseView.prototype.initialize.apply(this);

    this.render();
  },

  template: $('[data-template="trail-in-list"]').text(),

  className: 'five wide column trail',

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

  render: function(){
    var trail = {
      id: this.model.get('id'),
      name: this.model.get('name'),
      boroughs: this.getBoroughs(),
      diameterage: this.totalDiameter()
    }
    this.$el.html(Mustache.render(this.template, trail));
  }
});