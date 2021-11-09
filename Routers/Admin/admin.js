

const express = require('express');
const { loginAdmin } = require('../../Controller/Auth/Admin/AuthAdminController');
const { deleteUserByAdmin } = require('../../Controller/Auth/Admin/DeleteUser');
const { isAdmin } = require('../../Middleware/isAdmin/isAdmin');
const router = express();


router.use(isAdmin)
router.post('/login',loginAdmin)
router.get('/delete-user/:id',deleteUserByAdmin)


module.exports = router;