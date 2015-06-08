var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SearchResults = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.reset);
  },

  events: {
    'click [data-action="show-next-ten"]': 'increment',
    'click [data-action="show-previous-ten"]': 'decrement'
  },

  template: $('[data-template="search-results"]').text(),

  id: 'search-results',

  subViews: [],

  resultsIndex: 0,

  reset: function(){
    this.resultsIndex = 0;
    this.render();
  },

  render: function(){

    if (this.collection.length === 0){

      this.$el.html('<p>Displaying No Search Results</p>');
      this.closeMarkers();

    } else {

      var upperBound;
      if (this.resultsIndex*10+10 < this.collection.length){
        upperBound = this.resultsIndex*10+10
      } else {
        upperBound = this.resultsIndex*10+this.collection.length%10
      }

      var options = {
        length: this.collection.length,
        lowerBound: this.resultsIndex*10+1,
        upperBound: upperBound
      }

      this.$el.html(Mustache.render(this.template, options))
      this.showTen();
    }
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    this.remove();
  },

  increment: function(){
    if (this.collection.length/10 > this.resultsIndex) {
      this.resultsIndex++;
      this.render();
    }
  },

  decrement: function(){
    if (this.resultsIndex > 0) {
      this.resultsIndex--;
      this.render();
    }
  },

  closeMarkers: function(){
    if (this.subViews.length > 0){
      this.subViews.forEach(function(view){
        view.close();
      })
    }    
  },

  showTen: function(){

    this.closeMarkers();

    var sliced = this.collection.slice(this.resultsIndex*10, this.resultsIndex*10+10);
    sliced.forEach(function(model){
      var mappedTree = new Arbor.Views.MappedTree({model: model});
      this.subViews.push(mappedTree);
      mappedTree.growTree(); 
    }.bind(this))
  }
})