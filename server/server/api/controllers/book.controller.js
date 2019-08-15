var { create ,hotelcreate } = require('../models/book');

class bookController {

    book(req, res) {
        let body = req.body;
        create(body, (err, id) => {
            if (err) {
                res.json({ status: false, err: err })
            } else {
                res.json({ status: true })
            }
        })

    }

    hotel(req, res) {
        let body = req.body;
        hotelcreate(body, (err, id) => {
            if (err) {
                res.json({ status: false, err: err })
            } else {
                res.json({ status: true })
            }
        })

    }

}

module.exports = bookController;