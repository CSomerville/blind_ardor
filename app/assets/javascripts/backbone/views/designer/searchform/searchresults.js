var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SearchResults = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
  },

  events: {
    'click [data-action="show-next-ten"]': 'increment',
    'click [data-action="show-previous-ten"]': 'decrement'
  },

  template: $('[data-template="search-results"]').text(),

  subViews: [],

  resultsIndex: 0,

  render: function(){

    if (this.collection.length === 0){

      this.$el.html('<p>Displaying No Search Results</p>');

    } else {

      var options = {
        length: this.collection.length,
        lowerBound: this.resultsIndex*10+1,
        upperBound: this.resultsIndex*10+10
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

  showTen: function(){

    if (this.subViews.length > 0){
      this.subViews.forEach(function(view){
        view.close();
      })
    }

    var sliced = this.collection.slice(this.resultsIndex*10, this.resultsIndex*10+10);
    sliced.forEach(function(model){
      var mappedTree = new Arbor.Views.MappedTree({model: model});
      this.subViews.push(mappedTree);
      mappedTree.growTree(); 
    }.bind(this))
  }
})