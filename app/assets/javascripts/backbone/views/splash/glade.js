var Arbor = Arbor || { Models: {}, Collections: {}, Views: {} };

Arbor.Views.Glade = Backbone.View.extend({

  tagName: 'canvas',

  id: 'glade',

  myGlade: null,

  render: function(){
    var canvas = document.getElementById('glade');
    canvas.setAttribute("height", window.innerHeight + "px");
    canvas.setAttribute("width", window.innerWidth + "px")
    var ctx = canvas.getContext('2d');

    var Branch = function(x, y, dir, thickness, len){
      this.currentX = x;
      this.currentY = y;
      this.len = len;
      this.dir = dir;
      this.thickness = (thickness > 1)? thickness : 1;


      this.endX = Math.floor(Math.cos(dir)*len) + x;
      this.endY = -Math.floor(Math.sin(dir)*len) + y;

    }

    Branch.prototype.grow = function(){
      if (this.currentY !== this.endY || this.currentX !== this.endX){

        var xDist = this.endX - this.currentX;
        var yDist = this.endY - this.currentY;
        if (yDist === 0 && xDist > 0){
          this.currentX++;
        } else if (yDist === 0 && xDist < 0){
          this.currentX--;
        } else if (xDist === 0 && yDist > 0){
          this.currentY++;
        } else if (xDist === 0 && yDist < 0){
          this.currentY--;
        } else {

          var ratio = Math.abs(xDist / yDist);
          if (xDist > 0 && yDist > 0) {
            if (ratio > 2){
              this.currentX++;
            } else if (ratio < .5){
              this.currentY++;
            } else {
              this.currentX++;
              this.currentY++;
            }
          } else if (xDist > 0 && yDist < 0) {
            if (ratio > 2){
              this.currentX++;
            } else if (ratio < .5){
              this.currentY--;
            } else {
              this.currentX++;
              this.currentY--;
            }
          } else if (xDist < 0 && yDist > 0) {
            if (ratio > 2){
              this.currentX--;
            } else if (ratio < .5){
              this.currentY++;
            } else {
              this.currentX--;
              this.currentY++;
            }
          } else {
            if (ratio > 2){
              this.currentX--;
            } else if (ratio < .5){
              this.currentY--;
            } else {
              this.currentX--;
              this.currentY--;
            }
          }
        }
        return true;
      } else {
        return false;
      }
    }

    Branch.prototype.draw = function(){
      ctx.fillStyle = (this.len < 3)? "green" : "black"
      ctx.fillRect(this.currentX, this.currentY, this.thickness, this.thickness)
    }

    var branches = [];
    function growGlade(){

      var rando = Math.floor(Math.random() * 20);

      if (rando === 1){
        var x = Math.floor(Math.random() * window.innerWidth);
        var y = Math.floor(Math.random() * 100) + window.innerHeight;
        var dir = 1.57
        branches.push(new Branch(x, y, dir, 10, window.innerHeight * 0.33333))
      }

      branches.forEach(function(branch){
        if (branch.grow()){
          branch.draw();
        } else {
          branches.splice(branches.indexOf(branch), 1);
          if (branch.len > 1){
            for (var i = 0; i < 2; i++) {
              var dir = Math.random() * 1.57 - 0.785;              
              branches.push(new Branch(branch.currentX, branch.currentY, branch.dir + dir, branch.thickness-1, branch.len*0.6666))
            }
            
          }
        }
      })
      this.myGlade = window.requestAnimationFrame(growGlade);
    }
    this.myGlade = window.requestAnimationFrame(growGlade);
  },

  close: function(){
    window.cancelAnimationFrame(this.myGlade);
    this.remove();
  }
})