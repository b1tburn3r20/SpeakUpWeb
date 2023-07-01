const Bill = require('../../models/Summary');

module.exports = {
    show,
    index,
}

async function show(req, res) {
    const bill = await Bill.findById(req.params.id);
    res.json(bill);
}



async function index(req, res) {
    const summaries = await Summary.find({});
    res.json(summaries);
};


