const express = require('express');
const router = express.Router();
const Summary = require('../../models/Summary');

router.get('/', async function (req, res) {
    const summaries = await Summary.find({});
    res.json(summaries);
});
router.get('/my-votes', async function (req, res) {
    const summaries = await Summary.find({});
    res.json(summaries);
});

router.put('/removeUserVotes/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Remove the user's ObjectId from all summaries they voted on
        await Summary.updateMany(
            {
                $or: [{ pass: userId }, { veto: userId }]
            },
            {
                $pull: { pass: userId, veto: userId }
            }
        );

        res.status(200).json({ message: 'User votes removed from summaries' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error removing user votes from summaries' });
    }
});
module.exports = router;