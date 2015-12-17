'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = 'false';
  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }

  polymerChange = function() {
    if (this.submitted === 'true') {
      this.loginPolymer();
    }
  }

  loginPolymer = function() {
    this.Auth.login({
      email: this.user.email,
      password: this.user.password
    })
    .then(() => {
      this.$state.go('main');
    })
    .catch(err => {
      this.user.email = '';
      this.user.password = '';
      this.submitted = 'false';
      console.log(err.message);
    });
  }
}

angular.module('hrr10MjbeApp')
  .controller('LoginController', LoginController);
