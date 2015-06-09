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

    northBound = bounds.za.A;
    southBound = bounds.za.j;
    eastBound = bounds.qa.A;
    westBound = bounds.qa.j;

    var url = 'api/trees/?species=' + species + '&n=' + northBound + '&s=' + southBound + '&e=' + eastBound + '&w=' + westBound;

    treeSearchResults = treeSearchResults || new Arbor.Collections.Trees();
    treeSearchResults.url = url;
    treeSearchResults.fetch();
  },

  close: function(){
    this.remove();
  }
})