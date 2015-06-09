var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SearchForm = Backbone.View.extend({

  template: $('[data-template="search-form"]').text(),

  tagName: 'form',

  id: 'search-form',

  subViews: [],

  render: function(){
    this.$el.html(this.template)
    var speciesSelect = new Arbor.Views.SpeciesSelect()
    this.subViews.push(speciesSelect);
    speciesSelect.render();
    this.$el.append(speciesSelect.el)
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.remove();
    });
    this.remove();
  }

})