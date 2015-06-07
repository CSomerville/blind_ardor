var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Models.Trail = Backbone.Model.extend({
  urlRoot: 'api/trails'
})