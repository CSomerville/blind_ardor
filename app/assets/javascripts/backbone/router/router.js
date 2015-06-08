var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'tree-search': 'treeSearch',
    'tree-sort': 'treeSort',
    'tree-save': 'treeSave',
    'trail-pick': 'trailPick',
    'trail-follow/:id': 'trailFollow'
  },

  index: function(){

  },

  treeSearch: function(){
    if(follower) {
      follower.close();
      follower = null;
    }

    if(!designer){
      designer = new Arbor.Views.Designer();
      $('body').append(designer.el);
    }
    designer.loadView(new Arbor.Views.TreeSearch());
  },

  treeSort: function(){
    if(follower) {
      follower.close();
      follower = null;
    }

    if(!designer){
      designer = new Arbor.Views.Designer();
      $('body').append(designer.el);
    }
    designer.loadView(new Arbor.Views.TreeSort());    
  },

  treeSave: function(){
    if(follower) {
      follower.close();
      follower = null;
    }

    if(!designer){
      designer = new Arbor.Views.Designer();
      $('body').append(designer.el);
    }
    designer.loadView(new Arbor.Views.TreeSave());    
  },

  trailPick: function(){
    if (designer) {
      designer.close();
      designer = null;
    }

    if (!follower){
      follower = new Arbor.Views.Follower();
      $('body').append(follower.el);
    }
    follower.loadView(new Arbor.Views.TrailPick());
  },

  trailFollow: function(route){
    if (designer) {
      designer.close();
      designer = null;
    }

    if (!follower){
      follower = new Arbor.Views.Follower();
      $('body').append(follower.el);
    }
    follower.loadView(new Arbor.Views.TrailFollow({id: route}));
  }

})