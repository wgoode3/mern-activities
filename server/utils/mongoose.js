const mongoose = require('mongoose'),
            fs = require('fs'),
          path = require('path'),
   models_path = path.join(__dirname, "../models"),
        models = fs.readdirSync(models_path); 

module.exports = function(DB_NAME) {
    mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
    for(let model of models) {
        if(model.endsWith('.js')){
            require(path.join(models_path, model));
        }
    }
}