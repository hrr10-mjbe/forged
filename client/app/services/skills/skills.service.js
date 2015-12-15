'use strict';

angular.module('hrr10MjbeApp')
  .service('Skills', function($http, Auth, User) {
    /*var skills;
    //console.log(User.save);
    console.log(Auth.getCurrentUser());
    var user = Auth.getCurrentUser();
    user.type = 'wooo';
    User.save(user,
        function(data) {
          console.log(data);
          var currentUser = User.get();
          console.log(currentUser);
        });*/
Auth.getCurrentUser(null)
        .then(function(user) {
          console.log('this is the user ');
          console.log(user);
          console.log(user._id);
          console.log(user);
  console.log(user._id);

  User.changePassword({ id: user._id }, {
        oldPassword: 'nothing',
        newPassword: 'morenothing'
      }, function() {
        //return safeCb(callback)(null);
      }, function(err) {
        //return safeCb(callback)(err);
      }).$promise;

  User.changeType({ id: user._id }, {
        type: 'fooo'
      }, function() {
        console.log(User.get());
        return safeCb(callback)(null);
      }, function(err) {
        return safeCb(callback)(err);
      }).$promise;
        });

 /*Auth.getCurrentUser(null).then(function(user) {
  console.log(user);
  console.log(user._id);

  User.changePassword({ id: user._id }, {
        oldPassword: 'nothing',
        newPassword: 'morenothing'
      }, function() {
        //return safeCb(callback)(null);
      }, function(err) {
        //return safeCb(callback)(err);
      }).$promise;

  User.changeType({ id: user._id }, {
        type: 'fooo'
      }, function() {
        console.log(User.get());
        return safeCb(callback)(null);
      }, function(err) {
        return safeCb(callback)(err);
      }).$promise;
  )};*/
        
    //User.changePassword({ id: currentUser._id }
    this.getSkills = function(cb) {
      if (skills) {
        cb(skills);
      } else {
        $http({
          method: 'GET',
          url: '/api/skills'
        }).then(function(res) {
          console.log(res);
          skills = res.data;
          cb(skills);
        })
      }
    }
  });
