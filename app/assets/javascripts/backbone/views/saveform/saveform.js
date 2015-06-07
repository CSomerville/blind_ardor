var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.SaveForm = Backbone.View.extend({

  events: {
    'click button': 'saveTrail'
  },

  template: $('[data-template="tree-save-form"]').text(),

  render: function(){
    this.$el.html(this.template)
  },

  close: function(){
    this.remove();
  },

  saveTrail: function(event){
    event.preventDefault();

    if (trailTrees.length === 0){
      console.log("no")
    } else{

      var trailName = $('[name="name"]').val();
      var stops = trailTrees.map(function(model){
        return {stop_num: model.get("stop_num"), tree_id: model.get("id")}
      });

      var trail = new Arbor.Models.Trail({
        name: trailName,
        stops: stops
      });
      trail.save(null, {success: function(){
        trailTrees.reset();
      }});

    }
  }
})