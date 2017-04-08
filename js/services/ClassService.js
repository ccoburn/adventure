angular.module('app').service('classService', function(rollService){

this.stats = [
  {
  character: 'Druid',
  armor_class: 21,
  hit_points: 40,
  dexterity: 11,
  spell1: "Poison Spray",
  spell1Damage: function () {
    return rollService.roll12two();
  },
  spell2: "Thorn Whip",
  spell2Damage: function(){
    return rollService.roll6two();
  },
  spell3: "Thunderwave",
  spell3Damage: function() {
    return rollService.roll8two();
  }
},
{
  character: 'Cleric',
  armor_class: 21,
  hit_points: 40,
  dexterity: 11,
  spell1: "Sacred Flame",
  spell1Damage: function() {
    return rollService.roll8two();
  },
  spell2: "Guiding Bolt",
  spell2Damage: function() {
    return rollService.roll6four();
  },
  spell3: "Spiritual Weapon",
  spell3Damage: function() {
    return rollService.roll8two();
  }
},
{
  character: 'Wizard',
  armor_class: 21,
  hit_points: 40,
  dexterity: 11,
  spell1: "Firebolt",
  spell1Damage: function() {
    return rollService.roll10two();
  },
  spell2: "Ray of Frost",
  spell2Damage: function() {
    return rollService.roll8two();
  },
  spell3: "Magic Missle",
  spell3Damage: function() {
    return rollService.roll4three();
  }
}]


});
