var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'tree-search': 'treeSearch'
  },

  treeSearch: function(){
    var designer = new Arbor.Views.Designer();
    designer.loadView(new Arbor.Views.TreeSearch());
    $('body').append(designer.el);

    // var treeSearch = new Arbor.Views.TreeSearch();
    // treeSearch.render();
    // $('body').append(treeSearch.el)

    // var searchForm = new Arbor.Views.SearchForm();
    // searchForm.render();
    // $('body').append(searchForm.el);
    // var map = new Arbor.Views.Map();
    // map.$el.css('height', '100%')
    // $ghostDiv.append(map.el)
  }
})