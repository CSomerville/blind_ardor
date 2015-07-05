var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SpeciesSelect = Backbone.View.extend({

  initialize: function(){
    this.model = new Arbor.Models.Species();
    this.listenTo(this.model, 'change', this.render)
    this.model.fetch();
  },

  template: $('[data-template="species-input"]').text(),

  render: function(){
    var allSpecies = [];
    Object.keys(this.model.attributes).forEach(function(k){
      allSpecies.push(this.model.attributes[k].species);
    }.bind(this))
    this.$el.html(this.template);
    var engine = new Bloodhound({
      local: allSpecies,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      datumTokenizer: Bloodhound.tokenizers.whitespace
    });
    this.$el.find('#species-input').typeahead({},{source: engine})
    this.$el.find('#species-input').bind('typeahead:select', this.search)
    this.$el.find('#species-input').bind('typeahead:autocomplete', this.search)
    this.$el.find('#species-input').bind('typeahead:idle', function(){
    })

  },

  search: function(obj, species){
    var bounds = mapView.getBounds();

    var url = 'api/trees/?species=' + species + '&n=' + bounds.n + '&s=' + bounds.s + '&e=' + bounds.e + '&w=' + bounds.w;

    treeSearchResults = treeSearchResults || new Arbor.Collections.Trees();
    treeSearchResults.url = url;
    treeSearchResults.fetch();
  },

  close: function(){
    this.remove();
  }
})