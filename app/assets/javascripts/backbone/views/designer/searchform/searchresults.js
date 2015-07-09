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
      // If the search results collection contains models, this logic uses the resultsIndex variable to track which results are being shown:
      // eg. showing 1 through 10 results. 
      var upperBound;
      if (this.resultsIndex*10+10 < this.collection.length){
        upperBound = this.resultsIndex*10+10
      } else {
        upperBound = this.resultsIndex*10+this.collection.length%10
      }
      // Prepares an object for consumption by mustache.
      var options = {
        length: this.collection.length,
        lowerBound: this.resultsIndex*10+1,
        upperBound: upperBound
      }

      this.$el.html(Mustache.render(this.template, options))
      // this function will interact the mappedTree view to display tree markers on the map.
      this.showTen();
    }
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    this.remove();
  },

// increment and decrement moves the resultsIndex up or down appropriately, then rerenders the view, so the user can cycle through search results 10 at a time.
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
  // After closing any currently showing markers, this function instantiates mappedTree views (which handles markers), passing in the appropriate model to each.

    this.closeMarkers();

    var sliced = this.collection.slice(this.resultsIndex*10, this.resultsIndex*10+10);
    sliced.forEach(function(model){
      var mappedTree = new Arbor.Views.MappedTree({model: model});
      this.subViews.push(mappedTree);
      mappedTree.growTree(); 
    }.bind(this))
  }
})