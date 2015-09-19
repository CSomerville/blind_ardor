describe("Navbubbles view", function(){
  var navBubbles = new Arbor.Views.NavBubbles();

  describe("render function", function(){

    it("should be defined", function(){
      expect(navBubbles.__proto__).to.have.ownProperty('render');
      expect(navBubbles.render).to.be.a('function');
    });

    navBubbles.render();

    it("should load fill el with the view's template", function(){
      expect(navBubbles.$el.children().length).to.be.at.least(1); 
      expect(navBubbles.$el.find('a').length).to.be.at.least(1);
    });
  });

  describe("select function", function(){

    it("should be defined", function(){
      expect(navBubbles.__proto__).to.have.ownProperty('select');
      expect(navBubbles.select).to.be.a('function');      
    });

    it("should add .selected class to appropriate bubble", function(){
      Backbone.history.location.hash = "#tree-search";
      navBubbles.select();
      expect(navBubbles.$el.find('.selected').length).to.equal(1);
      expect(navBubbles.$el.find('.selected').attr('id')).to.equal('one');
    });

    it("should remove .selected class from unselected bubbles", function(){
      Backbone.history.location.hash = "tree-save";
      navBubbles.select();
      expect(navBubbles.$el.find('.selected').length).to.equal(1);
      expect($('#one').parent().attr('class')).to.not.contain('selected');
      expect(navBubbles.$el.find('.selected').attr('id')).to.equal('three');
    });
  });

  describe("close function", function(){
    it("should be defined", function(){    
      expect(navBubbles.close).to.be.a('function');
    });

    it("should remove navBubbles from the DOM", function(){
      Backbone.history.location.hash = "";
      $('body').append('<div class="test"></div>');
      $('.test').append(navBubbles.el);
      navBubbles.close();

      expect($('.test').find('.nav').length).to.equal(0);
    })
  });
});