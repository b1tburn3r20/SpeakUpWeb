const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer();
const User = require('../../models/user');


router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.get('/voted-bills', ensureLoggedIn, usersCtrl.getVotedBills);

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.BUCKET_NAME,
});

router.post('/profilepic', upload.single('photo'), usersCtrl.uploadProfilePic);


router.put('/users/profile', ensureLoggedIn, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.body.userId,
            { profileImage: req.body.profileImage },
            { new: true }
        );
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/profile', ensureLoggedIn, usersCtrl.deleteUser);


module.exports = router;
