var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.TrailList = Arbor.Views.BaseView.extend({
  
  initialize: function(){

    Arbor.Views.BaseView.prototype.initialize.apply(this);

    this.listenTo(this.collection, 'sync', this.refreshList);
  },

  className: 'ui grid',

  refreshList: function(){

    if (this.subViews.length > 0) {

      var collectionIds = this.collection.pluck('id').map( function(id) { return id.toString() });
      var difference = _.difference(_.pluck(this.subViews, 'name'), collectionIds);
      var shared = _.intersection(_.pluck(this.subViews, 'name'), collectionIds);

      _.each(difference, function(id) { this.unsetSubView(id) }.bind(this));

      this.collection.each(function(model){

        if (! _.contains(shared, model.get('id').toString()) ) {

          this.addOne(model);
        }
      }.bind(this));

    } else {

      this.collection.each(this.addOne.bind(this));
    }

  },

  addOne: function(model) {

    var subView = new Arbor.Views.TrailInList({ model: model });
    this.setSubView({ name: model.get('id').toString(), view: subView });
    this.$el.append(this.getSubView(model.get('id').toString()).el);    
  }
});