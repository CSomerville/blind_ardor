var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'tree-search': 'treeSearch'
  },

  treeSearch: function(){
    var searchForm = new Arbor.Views.SearchForm();
    searchForm.render();
    $('body').append(searchForm.el);
    var map = new Arbor.Views.Map();
    map.$el.attr("height", "100%")
    $('html').attr("height", "100%")
    $('body').attr("height", "100%")
    $('body').append(map.el);
  }
})