const expres = require('express');
const router = expres();
const UserRouter = require('./User/user')
const AdminRouter = require('./Admin/admin');
const { HomeController } = require('../Controller/Home/HomeController');
const { tokenControl } = require('../Helper/Token/TokenControl');
const { Control } = require('./Control/control');
const Community = require('./Community/Community');
const { SocketRouter } = require('./Socket/socketRoute');



router.use('/user',UserRouter)
router.use('/admin',tokenControl,AdminRouter)
router.use('/control',Control)
router.use('/community',tokenControl,Community)

// router.use('/socket',SocketRouter)


router.get('/home',tokenControl,HomeController)

module.exports = router;