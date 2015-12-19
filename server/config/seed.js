/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Skill from '../api/skill/skill.model';
import Badge from '../api/badge/badge.model';

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

Skill.find({}).removeAsync()
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
  });

  Badge.find({}).removeAsync()
  .then(function() {
    Badge.create({
      name: 'WOO you passed a thing',
      info: 'Congrats',
      badgeDefId: 0,
      image: 'add'
    });
  });