const express = require('express');
const router = express();
const { Login, Register } = require('../../Controller/Auth/User/AuthUserController');



router.post('/login',Login)
router.post('/register',Register)


module.exports = router;