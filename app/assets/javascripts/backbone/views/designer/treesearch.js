var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TreeSearch = Backbone.View.extend({

  className: 'ui centered grid',

  template: $('[data-template="tree-search"]').text(),

  subViews: [],

  render: function(){

    this.$el.html(this.template);

    var searchForm = new Arbor.Views.SearchForm();
    this.subViews.push(searchForm);
    searchForm.render();
    this.$el.find("#search-form-container").css('height', 0.66666 * $(window).innerHeight() + "px").append(searchForm.el);

    treeSearchResults = treeSearchResults || new Arbor.Collections.Trees();
    var searchResults = new Arbor.Views.SearchResults({collection: treeSearchResults});
    this.subViews.push(searchResults);
    searchResults.render();
    this.$el.find("#search-form-container").append(searchResults.el).append('<div class="buffer"></div>');

    mapView = mapView || new Arbor.Views.Map()
    mapView.$el.css('height', '100%');
    if (mapView.$el.css('display') === 'none') mapView.$el.css('display', 'block');
    this.$el.find("#search-map-container").css('height', 0.66666 * $(window).innerHeight() + "px").append(mapView.el)

  },

  close: function(){
    mapView.$el.css('display', 'none');
    this.subViews.forEach(function(view){
      view.close();
    });
    this.remove();
  }
})










