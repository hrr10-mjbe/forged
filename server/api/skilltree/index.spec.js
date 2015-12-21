'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var skilltreeCtrlStub = {
  index: 'skilltreeCtrl.index',
  show: 'skilltreeCtrl.show',
  create: 'skilltreeCtrl.create',
  update: 'skilltreeCtrl.update',
  destroy: 'skilltreeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var skilltreeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './skilltree.controller': skilltreeCtrlStub
});

describe('Skilltree API Router:', function() {

  it('should return an express router instance', function() {
    expect(skilltreeIndex).to.equal(routerStub);
  });

  describe('GET /api/skilltree', function() {

    it('should route to skilltree.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'skilltreeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/skilltree/:id', function() {

    it('should route to skilltree.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'skilltreeCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/skilltree', function() {

    it('should route to skilltree.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'skilltreeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/skilltree/:id', function() {

    it('should route to skilltree.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'skilltreeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/skilltree/:id', function() {

    it('should route to skilltree.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'skilltreeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/skilltree/:id', function() {

    it('should route to skilltree.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'skilltreeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
