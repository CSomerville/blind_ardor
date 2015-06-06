var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TreeSave = Backbone.View.extend({

  template: $('[data-template="tree-save"]').text(),

  className: 'ui centered grid',
  
  render: function(){

    this.$el.html(this.template);

    mapView = mapView || new Arbor.Views.Map();
    mapView.$el.css('height', '100%');
    if (mapView.$el.css('display') === 'none') mapView.$el.css('display', 'block');
    this.$el.find("#save-map-container").css('height', 0.66666 * $(window).innerHeight() + "px").append(mapView.el)

    trailShow = new Arbor.Views.TrailShow({collection: trailTrees});
    trailShow.render();
  },

  close: function(){
    this.remove();
  }
})