angular.module('app').service('storyService', function() {

  this.chapters = [
    {
      id: 'w1_3o',
      character: 'Wizard',
      story1: "This is wizard story paragraph one.",
      story2: "This is wizard story paragraph two.",
      sideimg: '',
      topimg: '',
      button1txt: 'option 1',
      button2txt: 'option 2',
      button3txt: 'option 3',
      button1lnk: "three({id: 'w2a_3o'})",
      button2lnk: "two({id: 'w2b_2o'})",
      button3lnk: "none({id: 'w2c_0o'})"
    }, {
      id: 'c1_3o',
      character: 'Cleric',
      story1: "This is cleric story paragraph one.",
      story2: "This is cleric story paragraph two.",
      sideimg: '',
      topimg: '',
      button1txt: 'option 1',
      button2txt: 'option 2',
      button3txt: 'option 3',
      button1lnk: '',
      button2lnk: '',
      button3lnk: ''
    }, {
      id: 'd1_3o',
      character: 'Druid',
      story1: "This is druid story paragraph one.",
      story2: "This is druid story paragraph two.",
      sideimg: '',
      topimg: '',
      button1txt: 'option 1',
      button2txt: 'option 2',
      button3txt: 'option 3',
      button1lnk: '',
      button2lnk: '',
      button3lnk: ''
    }, {
    id: 'w2a_3o',
    character: 'Wizard',
    story1: "This is wizard story part 2 paragraph one.",
    story2: "This is wizard story part 2 paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 4',
    button2txt: 'option 5',
    button3txt: 'option 6',
    button1lnk: '',
    button2lnk: '',
    button3lnk: ''
  }, {
    id: 'w2b_2o',
    character: 'Wizard',
    story1: "This is wizard story part 2b paragraph one.",
    story2: "This is wizard story part2b paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 7',
    button2txt: 'option 8',
    button3txt: '',
    button1lnk: '',
    button2lnk: '',
    button3lnk: ''
  }, {
    id: 'w2c_0o',
    character: 'Wizard',
    story1: "This is wizard story part2c paragraph one.",
    story2: "This is wizard story part2c paragraph two.",
    sideimg: '',
    topimg: '',
    button1txt: 'option 1',
    button2txt: 'option 2',
    button3txt: 'option 3',
    button1lnk: '',
    button2lnk: '',
    button3lnk: ''
  }
  ]


})
