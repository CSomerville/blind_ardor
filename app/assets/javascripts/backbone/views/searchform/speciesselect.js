var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SpeciesSelect = Backbone.View.extend({

  initialize: function(){
    this.model = new Arbor.Models.Species();
    this.listenTo(this.model, 'change', this.render)
    this.model.fetch();
  },

  template: $('[data-template="species-select"]').text(),

  tagName: 'select',

  id: 'species-select',

  render: function(){
    var allSpecies = [];
    Object.keys(this.model.attributes).forEach(function(k){
      allSpecies.push(this.model.attributes[k]);
    }.bind(this))
    this.$el.html(Mustache.render(this.template, {all: allSpecies}))
  }
})