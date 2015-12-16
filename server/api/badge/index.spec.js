'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var badgeCtrlStub = {
  index: 'badgeCtrl.index',
  show: 'badgeCtrl.show',
  create: 'badgeCtrl.create',
  update: 'badgeCtrl.update',
  destroy: 'badgeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var badgeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './badge.controller': badgeCtrlStub
});

describe('Badge API Router:', function() {

  it('should return an express router instance', function() {
    expect(badgeIndex).to.equal(routerStub);
  });

  describe('GET /api/badges', function() {

    it('should route to badge.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'badgeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/badges/:id', function() {

    it('should route to badge.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'badgeCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/badges', function() {

    it('should route to badge.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'badgeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/badges/:id', function() {

    it('should route to badge.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'badgeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/badges/:id', function() {

    it('should route to badge.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'badgeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/badges/:id', function() {

    it('should route to badge.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'badgeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
