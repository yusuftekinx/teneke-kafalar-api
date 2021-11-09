const multer = require('multer');
const path = require('path');
const CustomError = require('../../Helper/Error/CustomError');


//Storage, fileFilter


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, "public/CommunityProfile"))

    },
    filename: function (req, file, cb) {

        // Change File Name or set Mime Type
        const extension = file.mimetype.split('/')[1];
        req.savedProfileImage = `communityProfileImage${req.communityId}.${extension}`;
        cb(null, req.savedProfileImage);
    }
});

const fileFilter = (req, file, cb) => {
    let allowedMimeType = ["image/jpg", "image/gif", "image/jpeg", "image/png"];

    if (!allowedMimeType.includes(file.mimetype)) {
        return cb(new CustomError("Resim uzantısı geçersiz.", 400), false);
    }

    return cb(null, true)


}


const profileImageUpload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = {
    profileImageUpload
}