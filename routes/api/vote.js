const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user');
const Summary = require('../../models/Summary');

router.post('/vote', async (req, res) => {
    const { userId, billId, vote } = req.body;
    console.log(`UserId: ${userId}, BillId: ${billId}, Vote: ${vote}`);
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const user = await User.findById(userId).session(session);
        user.votes.push({ summary: billId, vote: vote });
        await user.save();
        const summary = await Summary.findById(billId).session(session);
        summary[vote].push(userId);
        await summary.save();
        await session.commitTransaction();
        res.json({ status: 'Vote recorded' });
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(500).send('Failed to record vote');
    } finally {
        session.endSession();
    }
});

module.exports = router;