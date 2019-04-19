const mongoose = require('mongoose'),
      Activity = mongoose.model("Activity");

class Activities {
    getAll(req, res){
        Activity.find({}, (err, activities) => {
            if(err) { console.log(err); }
            res.json({status: 'ok', activities: activities});
        });
    }
    getOne(req, res){
        Activity.findOne({_id: req.params._id}, (err, activity) => {
            if(err) { console.log(err); }
            res.json({status: 'ok', activity: activity});
        })
    }
    create(req, res){
        let a = new Activity(req.body);
        a.save(err => {
            if(err){
                res.json({status: "not ok", errors: err});
            } else {
                res.json({status: 'ok'});
            }
        });
    }
    update(req, res){
        Activity.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true}, err => {
            if(err) {
                res.json({status: "not ok", errors: err});
            } else {
                res.json({status: 'ok'});
            }
        });
    }
    delete(req, res){
        Activity.findOneAndDelete({_id: req.params._id}, err => {
            if(err) { console.log(err); }
            res.json({status: 'ok'});
        })
    }
}

module.exports = new Activities();