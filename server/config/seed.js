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

Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
        'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
        'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
        'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
        'tests alongside code. Automatic injection of scripts and ' +
        'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
        'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
        'payload, minifies your scripts/css/images, and rewrites asset ' +
        'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
        'and openshift subgenerators'
    });
  });

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
        provider: 'local',
        name: 'Test User',
        type: 'student',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }, {
        provider: 'local',
        name: 'A Teacher',
        type: 'teacher',
        email: 'teacher@example.com',
        password: 'test',
        teacherData: {
          classes: [{
            name: 'Math'
          }, {
            name: 'Algebra'
          }]
        }
      })
      .then(function() {
        console.log('finished populating users');
      });
  });

/*var simpleAddition = new Skill({
      name: 'Simple Addition',
      info: 'Practice addition with problems within 10',
      problemGenId: 0
    });*/

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
  name: 'Division by 0 or 1',
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

/*Skill.find({}).removeAsync()
  .then(function() {
    Skill.create({
      name: 'Simple Addition',
      info: 'Practice addition with problems within 10',
      problemGenId: 0
    }, {
      name: 'Hard Addition',
      info: 'Practice addition with problems within 1000',
      problemGenId: 1
    }, {
      name: 'Simple Subtraction',
      info: 'Practice subtraction with problems within 10',
      problemGenId: 2
    });
  });*/

Badge.find({}).removeAsync()
  .then(function() {
    Badge.create({
      name: 'WOO you passed a thing',
      info: 'Congrats',
      badgeDefId: 0,
      image: 'add'
    });
  });

Skilltree.find({}).removeAsync()
  .then(function() {
    Skilltree.createAsync({
      name: 'Beginning Math'
    }, {
      name: 'Addition',
      skills: [hardAddition._id]
    }, {
      name: 'Multiplication',
      skills: [multiplication1._id, multiplication2._id, multiplication3._id, multiplication4._id]
    }, {
      name: 'Division',
      skills: [division1._id, division2._id, division3._id, division4._id]
    }, {
      name: 'Rounding',
      skills: [rounding1._id, rounding2._id, rounding3._id]
    })
  })
