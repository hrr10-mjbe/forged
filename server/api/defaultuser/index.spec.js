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

  it('should return an express router instance', function() {
    expect(defaultuserIndex).to.equal(routerStub);
  });

  describe('GET /api/defaultuser', function() {

    it('should route to defaultuser.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'defaultuserCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/defaultuser/:id', function() {

    it('should route to defaultuser.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'defaultuserCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/defaultuser', function() {

    it('should route to defaultuser.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'defaultuserCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/defaultuser/:id', function() {

    it('should route to defaultuser.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'defaultuserCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/defaultuser/:id', function() {

    it('should route to defaultuser.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'defaultuserCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/defaultuser/:id', function() {

    it('should route to defaultuser.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'defaultuserCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
