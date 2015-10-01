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
    this.loadSplash();
  },

  treeSearch: function(){
    this.loadDesigner(new Arbor.Views.TreeSearch());
  },

  treeSort: function(){
    this.loadDesigner(new Arbor.Views.TreeSort());    
  },

  treeSave: function(){
    this.loadDesigner(new Arbor.Views.TreeSave());    
  },

  trailPick: function(){
    this.loadFollower(new Arbor.Views.TrailPick());
  },

  trailFollow: function(route){
    this.loadFollower(new Arbor.Views.TrailFollow({id: route}));
  },

  loadSplash: function(){
    if (designer) {
      designer.close();
      designer = null;
    }
    if(follower) {
      follower.close();
      follower = null;
    }
    splash = splash || new Arbor.Views.Splash();
    splash.render();
  },

  loadDesigner: function(view){
    if (splash) {
      splash.close();
      splash = null;
    }
    if (follower){
      follower.close();
      follower = null
    }
    if(!designer){
      designer = new Arbor.Views.Designer();
      $('body').append(designer.el);
    }
    designer.loadView(view);    
  },

  loadFollower: function(view){
    if (splash) {
      splash.close();
      splash = null;
    }
    if (designer) {
      designer.close();
      designer = null;
    }
    if (!follower){
      follower = new Arbor.Views.Follower(this);
      $('body').append(follower.el);
    }
    follower.loadView(view)   
  }

})