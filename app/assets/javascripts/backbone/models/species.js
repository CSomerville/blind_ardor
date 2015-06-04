var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} }

Arbor.Models.Species = Backbone.Model.extend({
  url: 'api/species'
})