var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Title = Backbone.View.extend({

  initialize: function(){
    this.timer = null;
    this.onTitle = false;
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
    // checks to see whether cursor is on title, if not, fade title in
    if (!this.onTitle) {
      // if a timer has already been set, clear it
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      // set the opacity to 1, then set a timer which will return it to 0
      this.$el.find('.splash-title').css('opacity', '1');
      this.timer = setTimeout(function(){
        this.$el.find('.splash-title').css('opacity', '0');      
      }.bind(this), 100);
    }
  },

  // ensures title remains in view while mouse hovers over the region
  stayFadedIn: function(){
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    this.onTitle = true;
    this.$el.find('.splash-title').css('opacity', '1');
  },

  // after mouse leaves title element, fade title out
  fadeout: function(){
    this.onTitle = false;
    this.timer = setTimeout(function(){
      this.$el.find('.splash-title').css('opacity', '0');      
    }.bind(this), 750);    
  },

  render: function(){
    this.$el.html(this.template);
  },

  // replaces 'blind ardor' with 'trace' and 'trail' anchors
  traceTrail: function(){
    this.$el.find('.changeling').replaceWith($('[data-template="trace-trail"]').text())
    this.$el.find('.splash-title').css('opacity', '1');
  },

  close: function(){
    if (this.timer) clearTimeout(this.timer);
    this.remove();
  }
})