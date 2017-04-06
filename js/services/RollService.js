angular.module('app').service('rollService', function(){

  this.roll20 = function()  {
    var rolled = Math.ceil(Math.random() * 20);
    return rolled;
  }



  this.roll6 = function() {
    var rolled = Math.ceil(Math.random() * 6);
    return rolled;
  }



  this.roll6More = function(num) {
    var total = 0;
    for (var i=0;i<num;i++) {
      total += this.roll6();
    }
    console.log(total)
    return total;

  }




});
