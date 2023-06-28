const express = require('express');
const router = express.Router();
const Summary = require('../../models/Summary');

router.get('/', async function (req, res) {
    const summaries = await Summary.find({});
    res.json(summaries);
});

module.exports = router;