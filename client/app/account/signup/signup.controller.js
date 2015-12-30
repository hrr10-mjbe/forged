'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  signup = 'false';
  errormessage = '';
  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }

  polymerChange = function() {
    console.log('polymerchange')
    console.log('this.signup is ... ' + this.signup)
    if (this.signup === 'true') {
      this.signUpPolymer();
    }
  }

  signUpPolymer = function() {
    console.log('sigining up name');
    console.log(this.user.name);
    this.Auth.createUser({
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      type: this.user.type
    })
    .then(() => {
      // Logged in, redirect to home
      this.$state.go('main');
    })
    .catch(err => {
      // TO-DO: err.data may have more specific error messages.
      console.log(err.data);
      this.errormessage = 'Error creating your account.';
      this.signup = 'false';
    });
  };
}

angular.module('hrr10MjbeApp')
  .controller('SignupController', SignupController);
