'use strict';

var express = require('express');
var controller = require('./defaultuser.controller');

var router = express.Router();

router.get('/', controller.defaultUser);

module.exports = router;
