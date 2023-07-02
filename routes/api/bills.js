const express = require('express');
const router = express.Router();
const checkToken = require('../../config/checkToken');

// Include the bill model
const Bill = require('../../models/Summary');
const Vote = require('../../models/Vote');
const User = require('../../models/user')

router.get('/upcoming-bills', checkToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const bills = await Bill.find({});

        for (let bill of bills) {
            const userVote = await getUserVoteForBill(userId, bill._id);

            bill._doc.userVote = userVote;
        }

        return res.json(bills)
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.get('/:billId/users/count', async (req, res) => {
    try {
        const { billId } = req.params;
        const bill = await Bill.findById(billId);

        if (!bill) {
            return res.status(404).json({ msg: 'Bill not found' });
        }

        const totalUsers = await User.countDocuments();
        const turnoutRate = (bill.pass.length + bill.veto.length) / totalUsers;

        res.json({ totalUsers, turnoutRate });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.get('/bill-statistics', async (req, res) => {
    try {
        const bills = await Bill.find({});
        console.log(bills);

        return res.json(bills);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


// A function to get user's vote for a bill
async function getUserVoteForBill(userId, billId) {
    const bill = await Bill.findById(billId);
    if (!bill) return null;

    if (bill.pass.includes(userId)) {
        return 'pass';
    } else if (bill.veto.includes(userId)) {
        return 'veto';
    }

    return null;
}



router.get('/my-votes', checkToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const userBills = await Bill.find({
            $or: [
                { 'pass': userId },
                { 'veto': userId }
            ]
        });

        for (let bill of userBills) {
            const userVote = await getUserVoteForBill(userId, bill._id);
            bill._doc.userVote = userVote;
        }

        return res.json(userBills);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});





module.exports = router;