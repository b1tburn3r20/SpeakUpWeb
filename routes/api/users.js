const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Multer middleware to handle multipart form data
const User = require('../../models/user');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.get('/voted-bills', ensureLoggedIn, usersCtrl.getVotedBills);

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

router.post('/users/upload', upload.single('file'), (req, res) => {
    const params = {
        Bucket: 'speakupbucket', // your S3 bucket name
        Key: req.file.filename, // file name to use for S3 object
        Body: req.file.buffer, // file content
        ContentType: req.file.mimetype,
        ACL: 'public-read' // sets file to public read (be careful with this)
    };

    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ fileUrl: data.Location });
    });
});

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

module.exports = router;
