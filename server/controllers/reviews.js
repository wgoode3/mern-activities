const mongoose = require('mongoose'),
      Activity = mongoose.model("Activity"),
        Review = mongoose.model("Review");

class Reviews {
    create(req, res) {
        let r = new Review(req.body);
        r.save(err => {
            if(err) {
                res.json({status: "not ok", errors: err});
            } else {
                Activity.findOneAndUpdate({_id: req.params._id}, {$push: {reviews: r}}, err => {
                    if(err) {
                        res.json({status: "not ok", errors: err});
                    } else {
                        res.json({status: "ok"});
                    }
                });
            }
        });
    }
}

module.exports = new Reviews();