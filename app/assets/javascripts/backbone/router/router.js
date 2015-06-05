var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'tree-search': 'treeSearch',
    'tree-sort': 'treeSort',
    'tree-save': 'treeSave'
  },

  treeSearch: function(){
    if(!designer){
      designer = new Arbor.Views.Designer();
      $('body').append(designer.el);
    }
    designer.loadView(new Arbor.Views.TreeSearch());
  },

  treeSort: function(){
    if(!designer){
      designer = new Arbor.Views.Designer();
      $('body').append(designer.el);
    }
    designer.loadView(new Arbor.Views.TreeSort());    
  },

  treeSave: function(){
    if(!designer){
      designer = new Arbor.Views.Designer();
      $('body').append(designer.el);
    }
    designer.loadView(new Arbor.Views.TreeSave());    
  }

})