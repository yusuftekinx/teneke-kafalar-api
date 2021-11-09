

const express = require('express');
const { createCommunityController } = require('../../Controller/Community/CreateCommunityController');
const { updateProfileImage } = require('../../Controller/Community/updateProfileImage');
const { isAdmin } = require('../../Middleware/isAdmin/isAdmin');
const { profileImageUpload } = require('../../Middleware/libraries/UploadImage');
const { getAllCommunities } = require('../../Controller/Community/getAllCommunities');
const { deleteCommunityController } = require('../../Controller/Community/deleteCommunity');
const { isCommmunity } = require('../../Helper/Community/isCommunityControl');
const router = express();



router.post('/create',[isAdmin],createCommunityController);
router.put('/uploadProfileImage/:id',[isCommmunity,profileImageUpload.single('communityImage')],updateProfileImage);
router.get('/getAllCommunities',getAllCommunities)
router.post('/delete/:id',[isAdmin],deleteCommunityController);

module.exports = router