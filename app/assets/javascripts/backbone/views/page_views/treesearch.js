var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TreeSearch = Backbone.View.extend({

  className: 'ui centered grid',

  template: $('[data-template="tree-search"]').text(),

  render: function(){
    this.$el.html(this.template);
    var searchForm = new Arbor.Views.SearchForm();
    searchForm.render();
    this.$el.find("#search-form-container").append(searchForm.el);
    mapView = new Arbor.Views.Map();
    mapView.$el.css('height', '100%');
    this.$el.find("#search-map-container").css('height', 0.5 * $('body').innerWidth() + "px").append(mapView.el)
  }
})