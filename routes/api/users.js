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
    region: process.env.AWS_REGION,
    bucket: process.env.BUCKET_NAME,
});

// router.post('/users/upload', upload.single('file'), (req, res) => {
//     console.log('blah')
//     const params = {
//         Bucket: 'speakupbucket',
//         Key: req.file.filename,
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype,
//         ACL: 'public-read'
//     };

//     s3.upload(params, (err, data) => {
//         if (err) {
//             console.log(err)
//             return res.status(500).send(err);
//         }
//         console.log(data, fileUrl)
//         res.json({ fileUrl: data.Location });
//     });
// });

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
