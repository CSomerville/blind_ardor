var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TreeSort = Backbone.View.extend({

  className: 'ui centered grid',

  template: $('[data-template="tree-sort"]').text(),

  subViews: [],
  
  render: function(){
    this.$el.html(this.template);

    mapView = mapView || new Arbor.Views.Map();
    mapView.$el.css('height', '100%');
    if (mapView.$el.css('display') === 'none') mapView.$el.css('display', 'block');
    this.$el.find("#sort-map-container").css('height', 0.66666 * $(window).innerHeight() + "px").append(mapView.el)

    var sortingTrees = new Arbor.Views.SortingTrees({collection: trailTrees});
    sortingTrees.render();
    this.$el.find("#sort-trees-container").append(sortingTrees.el);
  },

  close: function(){
    this.remove();
  }
})