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
  }
})