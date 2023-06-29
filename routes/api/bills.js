const express = require('express');
const router = express.Router();
const checkToken = require('../../config/checkToken');

// Include the bill model
const Bill = require('../../models/Summary');

router.get('/upcoming-bills', checkToken, async (req, res) => {
    try {
        const bills = await Bill.find({});
        return res.json(bills)
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;