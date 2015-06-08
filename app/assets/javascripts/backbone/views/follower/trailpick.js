var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailPick = Backbone.View.extend({

  className: 'ui centered grid',

  template: $('[data-template="trail-pick"]').text(),

  subViews: [],

  render: function(){

    this.$el.html(this.template);

    trails = trails || new Arbor.Collections.Trails()
    var trailsList = new Arbor.Views.TrailsList({collection: trails});
    this.subViews.push(trailsList);
    trailsList.render();
    this.$el.find('#trails-list-container').append(trailsList.el);

    trails.fetch();
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    this.remove();
  }
})