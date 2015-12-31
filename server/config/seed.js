/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Skill from '../api/skill/skill.model';
import Badge from '../api/badge/badge.model';
import Skilltree from '../api/skilltree/skilltree.model';


User.find({}).removeAsync()
  .then(function() {
    var student1 = new User({
      provider: 'local',
      name: 'Test User',
      type: 'student',
      email: 'test@example.com',
      password: 'test',
      studentData: {
        points: 50,
        times: {
          1451347200000: 25,
          1451433600000: 75
        },
        modifications: {
          showTimer: true,
          showLeaderboard: true,
          showWhiteboard: true
        }
      }
    })

    var student2 = new User({
      provider: 'local',
      name: 'Test User 2',
      type: 'student',
      email: 'test2@example.com',
      password: 'test',
      studentData: {
        points: 200,
        times: {
          nothing: 'h'
        },
        modifications: {
          showTimer: false,
          showLeaderboard: true,
          showWhiteboard: true
        }
      }
    })

    var student3 = new User({
      provider: 'local',
      name: 'Test User 3',
      type: 'student',
      email: 'test3@example.com',
      password: 'test',
      studentData: {
        points: 200,
        times: {
          nothing: 'h'
        },
        modifications: {
          showTimer: false,
          showLeaderboard: true,
          showWhiteboard: true
        }
      }
    })

    var teacher = new User({
      provider: 'local',
      name: 'A Teacher',
      type: 'teacher',
      email: 'teacher@example.com',
      password: 'test',
      teacherData: {
        classes: [{
          name: 'Math',
          students: [student1._id, student2._id]
        }, {
          name: 'Algebra',
          students: [student3._id]
        }]
      },
      studentData: {
        points: 50,
        times: {
          nothing: 'h'
        },
        modifications: {
          showTimer: false,
          showLeaderboard: true,
          showWhiteboard: true
        }
      }
    })

    teacher.saveAsync().then(function() {
      student1.studentData.teacher = teacher;
      student2.studentData.teacher = teacher;
      student3.studentData.teacher = teacher;
      student1.studentData.myClass._id = teacher.teacherData.classes[0]._id;
      student2.studentData.myClass._id = teacher.teacherData.classes[0]._id;
      student3.studentData.myClass._id = teacher.teacherData.classes[1]._id;
      student1.saveAsync();
      student2.saveAsync();
      student3.saveAsync();
    })
  });

var multiplication1 = new Skill({
  name: 'Multiplication by 0 or 1',
  problemGenId: 0
});

var multiplication2 = new Skill({
  name: 'Multiplication by 2',
  problemGenId: 1
});

var multiplication3 = new Skill({
  name: 'Multiplication by 3',
  problemGenId: 2
});

var multiplication4 = new Skill({
  name: 'Multiplication by 4',
  problemGenId: 3
});

var division1 = new Skill({
  name: 'Division by 1',
  problemGenId: 4
});

var division2 = new Skill({
  name: 'Division by 2',
  problemGenId: 5
});

var division3 = new Skill({
  name: 'Division by 3',
  problemGenId: 6
});

var division4 = new Skill({
  name: 'Division by 4',
  problemGenId: 7
});

var hardAddition = new Skill({
  name: 'Hard Addition',
  info: 'Practice addition with problems within 1000',
  problemGenId: 8
})

var rounding1 = new Skill({
  name: 'Rounding to the nearest 10',
  problemGenId: 9
});

var rounding2 = new Skill({
  name: 'Rounding to the nearest 100',
  problemGenId: 10
});

var rounding3 = new Skill({
  name: 'Rounding to the nearest 10 or 100',
  problemGenId: 11
});

Skill.find({}).removeAsync()
  .then(function() {
    multiplication1.saveAsync();
    multiplication2.saveAsync();
    multiplication3.saveAsync();
    multiplication4.saveAsync();
    division1.saveAsync();
    division2.saveAsync();
    division3.saveAsync();
    division4.saveAsync();
    hardAddition.saveAsync();
    rounding1.saveAsync();
    rounding2.saveAsync();
    rounding3.saveAsync();
  })

Badge.find({}).removeAsync()
  .then(function() {
    Badge.create({
      name: 'First skill complete!',
      info: 'Congrats',
      badgeDefId: 0,
      image: 'add'
    }, {
      name: 'Two skills complete!',
      badgeDefId: 1,
      image: 'add'
    });
  });

var rootSkill = new Skilltree({
  name: 'Math',
  skills: []
})

var additionSkill = new Skilltree({
  name: 'Addition',
  skills: [hardAddition._id]
})
additionSkill.parent = rootSkill;

var multiplicationSkill = new Skilltree({
  name: 'Multiplication',
  skills: [multiplication1._id, multiplication2._id, multiplication3._id, multiplication4._id]
})
multiplicationSkill.parent = rootSkill;

var divisionSkill = new Skilltree({
  name: 'Division',
  skills: [division1._id, division2._id, division3._id, division4._id]
})
divisionSkill.parent = rootSkill;

var roundingSkill = new Skilltree({
  name: 'Rounding',
  skills: [rounding1._id, rounding2._id, rounding3._id]
})
roundingSkill.parent = rootSkill;

Skilltree.find({}).removeAsync()
  .then(function() {
    rootSkill.saveAsync().then(function() {
      additionSkill.saveAsync().then(function() {
        multiplicationSkill.saveAsync().then(function() {
          divisionSkill.saveAsync().then(function() {
            roundingSkill.saveAsync()
          })
        })
      })
    })

  })
