'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
  index: 'userCtrl.index',
  destroy: 'userCtrl.destroy',
  me: 'userCtrl.me',
  changePassword: 'userCtrl.changePassword',
  show: 'userCtrl.show',
  create: 'userCtrl.create',
  accept: 'userCtrl.accept',
  invite: 'userCtrl.invite',
  leaderboard: 'userCtrl.leaderboard'
};

var authServiceStub = {
  isAuthenticated: function() {
    return 'authService.isAuthenticated';
  },
  hasRole: function(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userIndex = proxyquire('./index', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './user.controller': userCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('User API Router:', function() {

  it('should return an express router instance', function() {
    expect(userIndex).to.equal(routerStub);
  });

  describe('GET /api/users', function() {

    it('should verify admin role and route to user.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'userCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/users/:id', function() {

    it('should verify admin role and route to user.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/users/me', function() {

    it('should be authenticated and route to user.controller.me', function() {
      expect(routerStub.get
        .withArgs('/me', 'authService.isAuthenticated', 'userCtrl.me')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/users/:id/password', function() {

    it('should be authenticated and route to user.controller.changePassword', function() {
      expect(routerStub.put
        .withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/users', function() {

    it('should route to user.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'userCtrl.create')
      ).to.have.been.calledOnce;
    });

  });

   describe('POST /api/users/accept', function() {

    it('should be authenticated and route to user.controller.accept', function() {
      expect(routerStub.post
        .withArgs('/accept', 'authService.isAuthenticated', 'userCtrl.accept')
      ).to.have.been.calledOnce;
    });

  });

   describe('POST /api/users/invite', function() {

    it('should be authenticated and route to user.controller.invite', function() {
      expect(routerStub.post
        .withArgs('/invite', 'authService.isAuthenticated', 'userCtrl.invite')
      ).to.have.been.calledOnce;
    });

  });

   describe('GET /api/users/leaderboard', function() {

    it('should be authenticated and route to user.controller.leaderboard', function() {
      expect(routerStub.get
        .withArgs('/leaderboard', 'authService.isAuthenticated', 'userCtrl.leaderboard')
      ).to.have.been.calledOnce;
    });

  });
});
