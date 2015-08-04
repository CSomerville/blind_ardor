var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SpeciesSelect = Backbone.View.extend({

  initialize: function(){
    this.model = new Arbor.Models.Species();
    this.listenTo(this.model, 'change', this.render)
    this.model.fetch();
  },

  template: $('[data-template="species-input"]').text(),

  render: function(){
    // loads the species names from the view's collection into an array of strings for use by typeahead
    var allSpecies = [];
    Object.keys(this.model.attributes).forEach(function(k){
      allSpecies.push(this.model.attributes[k].species);
    }.bind(this))
    this.$el.html(this.template);

    // initializes Bloodhound object for use by typeahead module
    var engine = new Bloodhound({
      local: allSpecies,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      datumTokenizer: function(d) {
        var aTree = Bloodhound.tokenizers.whitespace(d);
        for (var i = 1; i < aTree[0].length; i++) {
          aTree.push(aTree[0].substr(i))
        }
        return aTree;
      }
    });

    // links the species input DOM object to the typeahead module
    this.$el.find('#species-input').typeahead({},{source: engine, limit: 7})
    this.$el.find('#species-input').bind('typeahead:select', this.selected.bind(this))
    this.$el.find('#species-input').bind('typeahead:autocomplete', this.selected.bind(this))
    this.$el.find('#species-input').bind('typeahead:idle', function(){
    })

    this.$el.find('#species-input').focus();
  },

  // typeahead triggers this event, which in turn triggers a search event for which the searchform view is listening
  selected: function(){
    this.trigger('search');
  },

  close: function(){
    this.remove();
  }
})