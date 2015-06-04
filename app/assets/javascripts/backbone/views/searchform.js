var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

  Arbor.Views.SearchForm = Backbone.View.extend({

    template: $('[data-template="search-form"]').text(),

    render: function(){
      this.$el.append(this.template)
    }

  })