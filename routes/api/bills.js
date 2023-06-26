const express = require('express');
const router = express.Router();
const checkToken = require('../../config/checkToken');

// Include the bill model
const Bill = require('../../models/Summary');

router.get('/upcoming-bills', checkToken, async (req, res) => {
    try {
        const bills = await Bill.find({});
        // Get the user's id from the decoded token
        const userId = req.user._id;

        // Filter out the bills the user has already voted on
        const filteredBills = bills.filter(bill => {
            // Exclude the bill if the user's ID is in the bill's veto or passed arrays
            return !bill.veto.includes(userId.toString()) && !bill.passed.includes(userId.toString());
        });

        res.json(filteredBills);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
