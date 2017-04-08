angular.module('app').service('rollService', function(){

// d20
  this.roll20 = function()  {
    var rolled = Math.ceil(Math.random() * 20);
    return rolled;
  }

// d4
  this.roll4 = function() {
    var rolled = Math.ceil(Math.random() * 4);
    return rolled;
  }

  this.roll4three = function() {
    var total = 0;
    for (var i=0;i<3;i++) {
      total += this.roll4();
    }
    return total;
  }

// d6
  this.roll6 = function() {
    var rolled = Math.ceil(Math.random() * 6);
    return rolled;
  }

  this.roll6two = function() {
    var total = 0;
    for (var i=0;i<2;i++) {
      total += this.roll6();
    }
    return total;
  }

  this.roll6four = function() {
    var total = 0;
    for (var i=0;i<4;i++) {
      total += this.roll6();
    }
    return total;
  }

// d8
this.roll8 = function() {
  var rolled = Math.ceil(Math.random() * 8);
  return rolled;
}

this.roll8two = function() {
  var total = 0;
  for (var i = 0; i < 2; i++) {
    total += this.roll8();
  }
  return total;
}
this.roll8three = function() {
  var total = 0;
  for (var i = 0; i < 3; i++) {
    total += this.roll8();
  }
  return total;
}
this.roll8five = function() {
  var total = 0;
  for (var i = 0; i < 5; i++) {
    total += this.roll8();
  }
  return total;
}

this.roll8six = function() {
  var total = 0;
  for (var i = 0; i < 6; i++) {
    total += this.roll8();
  }
  return total;
}

// d10
this.roll10 = function() {
  var rolled = Math.ceil(Math.random() * 10);
  return rolled;
}

this.roll10two = function() {
  var total = 0;
  for (var i = 0; i < 2; i++) {
    total += this.roll10();
  }
  return total;
}

this.roll10four = function() {
  var total = 0;
  for (var i = 0; i < 4; i++) {
    total += this.roll10();
  }
  return total;
}

// d12
this.roll12 = function() {
  var rolled = Math.ceil(Math.random() * 12);
  return rolled;
}

this.roll12two = function() {
  var total = 0;
  for (var i = 0; i < 2; i++) {
    total += this.roll12();
  }
  return total;
}





});
