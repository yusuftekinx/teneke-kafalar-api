const express = require('express');
const { TokenController } = require('../../Controller/Auth/Token/TokenController');
const { tokenControl } = require('../../Helper/Token/TokenControl');
const router = express();


router.get('/tokenControl',tokenControl,TokenController)


module.exports = {
    Control:router
};