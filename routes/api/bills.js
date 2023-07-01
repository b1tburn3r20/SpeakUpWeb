const express = require('express');
const router = express.Router();
const checkToken = require('../../config/checkToken');

// Include the bill model
const Bill = require('../../models/Summary');
const Vote = require('../../models/Vote');

router.get('/upcoming-bills', checkToken, async (req, res) => {
    try {
        const bills = await Bill.find({});
        return res.json(bills)
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


router.get('/my-votes', checkToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const userBills = await Bill.find({
            $or: [
                { 'pass': userId },
                { 'veto': userId }
            ]
        });
        return res.json(userBills);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});




module.exports = router;