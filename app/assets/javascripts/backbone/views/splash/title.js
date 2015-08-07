var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Title = Backbone.View.extend({

  initialize: function(){
    this.timer = null;
    this.toggler = false;
  },

  events: {
    'click': 'traceTrail',
    'mousemove': 'fadein',
    'mouseenter .splash-title': 'stayFadedIn',
    'mouseleave .splash-title': 'fadeout'
  },

  id: 'blind-ardor',

  template: $('[data-template="blind-ardor"]').text(),

  fadein: function(){
    if (!this.toggler) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.$el.find('.splash-title').css('opacity', '1');
      this.timer = setTimeout(function(){
        this.$el.find('.splash-title').css('opacity', '0');      
      }.bind(this), 100);
    }
  },

  stayFadedIn: function(){
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    this.toggler = true;
    this.$el.find('.splash-title').css('opacity', '1');
  },

  fadeout: function(){
    this.toggler = false;
    this.timer = setTimeout(function(){
      this.$el.find('.splash-title').css('opacity', '0');      
    }.bind(this), 750);    
  },

  render: function(){
    this.$el.html(this.template);
  },

  traceTrail: function(){
    this.$el.find('.changeling').replaceWith($('[data-template="trace-trail"]').text())
    this.$el.find('.splash-title').css('opacity', '1');
  },

  close: function(){
    if (this.timer) clearTimeout(this.timer);
    this.remove();
  }
})