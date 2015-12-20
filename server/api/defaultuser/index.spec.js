'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var defaultuserCtrlStub = {
  index: 'defaultuserCtrl.index',
  show: 'defaultuserCtrl.show',
  create: 'defaultuserCtrl.create',
  update: 'defaultuserCtrl.update',
  destroy: 'defaultuserCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var defaultuserIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './defaultuser.controller': defaultuserCtrlStub
});

describe('Defaultuser API Router:', function() {

 //TODO
});
