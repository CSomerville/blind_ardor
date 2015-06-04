var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} }

Arbor.Collections.Trees = Backbone.Collection.extend({
  model: Arbor.Models.Tree
})