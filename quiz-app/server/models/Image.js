var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    image_id: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    name: String
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Image', imageSchema);