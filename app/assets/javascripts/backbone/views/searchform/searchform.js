var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SearchForm = Backbone.View.extend({

  template: $('[data-template="search-form"]').text(),

  tagName: 'form',

  render: function(){
    this.$el.html(this.template)
    var speciesSelect = new Arbor.Views.SpeciesSelect()
    speciesSelect.render();
    this.$el.prepend(speciesSelect.el)
  }

})