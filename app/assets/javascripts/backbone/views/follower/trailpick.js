var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailPick = Arbor.Views.BaseView.extend({
  
  initialize: function(){
    Arbor.Views.BaseView.prototype.initialize.apply(this);

    this.render();
    this.addListeners();
  },

  className: 'ui centered grid',

  template: $('[data-template="trail-pick"]').text(),

  render: function(){

    this.$el.html(this.template);

    this.setSubView({name: 'trailList', view: new Arbor.Views.TrailList() });
    this.setSubView({name: 'trailFilter', view: new Arbor.Views.TrailFilter() });

    this.$el.find('#trail-list-container')
      .append(this.getSubView('trailList').el);

    this.$el.find('#trail-filter-container')
      .append(this.getSubView('trailFilter').el);
  },

  addListeners: function() {
    this.listenTo(this.getSubView('trailFilter'), 'paramsChanged', this.handleParamsChanged);
  },

  handleParamsChanged: function(){

  }
});