var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Collections.Trails = Backbone.Collection.extend({
  model: Arbor.Models.Trail,
  url: 'api/trails'
})