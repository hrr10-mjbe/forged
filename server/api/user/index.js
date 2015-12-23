'use strict';

import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/update', auth.isAuthenticated(), controller.update);
router.post('/', controller.create);
router.post('/invite', auth.isAuthenticated(), controller.invite);
router.post('/accept', auth.isAuthenticated(), controller.accept);
router.get('/leaderboard', auth.isAuthenticated(), controller.leaderboard);

module.exports = router;